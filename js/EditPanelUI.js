class EditPanelUI {
  constructor() {
    //options

    this.localEditsPanelOptions = null;

    this.currentActiveItems = [];
    this.stayOnItem = null;

    //cross class instances

    //constructed areas
    this.editPanel = null;

    ///constructed controlls
    this.editActivator = null;
    this.editManipulator = null;
    this.editControl = null;

    //init methods and listerners
    this.initSequence();
  }


  //Edit init settings and areas/controlls
  initSequence() {
    var t = this;
    //init methods
    t.editPanelAreas();

    //listeners
    t.editElementSelected();
    t.editRemoveConfirm();
    t.activateEditMode();
    t.setInitState();
    t.dragAndDropListener();
    t.dragPreviewElement();
  }

  globalT(){
    return this;
  }

  editPanelAreas() {
    var t = this;
    //areas
    t.editPanel = $('.edit-panel-main');
    //controlls
    t.editActivator = ".js_selectableDiv";
    t.editManipulator = ".js_edit_prop_box";
    t.editControl = ".js_switch_to_edit";
  }
  //Edit init settings and controlls

  setInitState() {
    var t = this;
    $(t.editControl).text('EDIT');
  }

  activateEditMode() {
    var t = this;
    $(t.editControl).on('click', function () {
      if (stateManager.getCurrentEditModeState() == false) {
        stateManager.setEditMode();
        $(this).text('VIEW');
      } else {
        stateManager.disableEditMode();
        t.unsetStayOnItem();
        t.setInitState();
        eventDirector.fullReset();
      }
    });
  }

  setStayOnItem(item) {
    var t = this;
    t.stayOnItem = item;
  }

  unsetStayOnItem() {
    var t = this;
    t.stayOnItem = null;
  }

  getStayOnItem() {
    var t = this;
    return t.stayOnItem;
  }

  switchToStandardMode() {
    console.log('editace vypnuta');
  }


  getCurrentActiveItems() {
    var t = this;
    return t.currentActiveItems;
  }

  getCurrentActiveItem(index) {
    var t = this;
    return t.currentActiveItems[index];
  }

  setCurrentActiveItem(item) {
    var t = this;
    t.currentActiveItems.push(item);
  }

  clearCurrentActiveItems(){
    var t = this;
    t.currentActiveItems.splice(0);
  }

  targetCoreItem(activatedBy) {
    var t = this;
    var targetItem = null;
    for (var i = 0; i < dataTranslator.coreStructureHolder.length; i++) {
      if (dataTranslator.coreStructureHolder[i].getVersionID() == $(activatedBy).attr('versionID')) {
        targetItem = dataTranslator.coreStructureHolder[i];
        if (t.getStayOnItem() == null) {
          t.setCurrentActiveItem(targetItem);
        }
      }
    }
    if (targetItem != null) {
      return targetItem;
    } else throw new Error('There is some inconsistency between core items and core items props.');
  }



  removeCoreItem() {
    var t = this;
    for(let item of t.currentActiveItems){
      for(let item2 of dataTranslator.coreStructureHolder){
        if(item == item2){
          var index = dataTranslator.coreStructureHolder.indexOf(item2);
          dataTranslator.coreStructureHolder.splice(index, 1);
        }
      }
  }
    dataTranslator.rerenderPreview();
    eventDirector.fullReset();
}

  //core edit methods
  editElementSelected() {
    var t = this;
    $(document).on('click', t.editActivator, function (e) {
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();

      controlPanelUI.clearProvisoryClassArray();
      t.editPanelClear();

      propsPanelUI.customPropertyAreaClear();
      let targetCoreItem = t.targetCoreItem(this);
      controlPanelUI.setNewMotherElement(targetCoreItem.getMotherStructure());
      //event propagation settings - document.captureEvents(Event.CLICK); vs on('click') bubbling
      if (stateManager.getCurrentEditModeState() == true) {
        if (t.getStayOnItem() == null) {
          stateManager.setGlobalVersionRelease($(this).attr('versionID'));
          t.editPanelRerender(targetCoreItem);
          t.setStayOnItem($(this).attr('coreid'));
        } else {
          t.motherElementSelected($(this).attr('coreid'));
          var existingStructureEntity = editPanelUI.getCurrentActiveItem(editPanelUI.getCurrentActiveItems().length - 1);
          existingStructureEntity.setMotherStructure(controlPanelUI.getMotherElement());
          dataTranslator.rerenderPreview();
        }
      } else {
        t.motherElementSelected($(this).attr('coreid'));
      }
    });
  }

  motherElementSelected(newMotherElement) {
    var newMotherElementCheck = parseInt(newMotherElement);
    if (typeof newMotherElementCheck === "number" && newMotherElement > 0) {
      $("div[coreid='" + newMotherElementCheck + "']").addClass('selectedMotherElement');
      controlPanelUI.setNewMotherElement(newMotherElementCheck);
    } else {
      throw new Error('There is some error in coreid system');
    }
  }

  editRemoveConfirm() {
    var t = this;
    $(document).on('click', t.editManipulator, function () {
      let targetCoreItem = t.targetCoreItem(this);
      for (var x = 0; x < targetCoreItem.classArray.length; x++) {
        if (targetCoreItem.classArray[x] == $(this).children('span').text()) {
          targetCoreItem.classArray.splice(x, 1);
          t.editPanelRerender(targetCoreItem);
          dataTranslator.rerenderPreview();
        }
      }
    });
  }

  editPanelRerender(coreElementToEdit) {
    var t = this;
    t.editPanelClear();
    for (let item of coreElementToEdit.classArray) {
      var newEditPropsPanel = $(document.createElement('div'));
      var newEditPropsPanelText = $(document.createElement('span'));
      newEditPropsPanel.attr('versionID', coreElementToEdit.getVersionID());
      newEditPropsPanel.addClass('js_edit_prop_box');
      newEditPropsPanel.addClass('edit_prop_box');
      newEditPropsPanelText.text(item);
      newEditPropsPanel.append(newEditPropsPanelText);
      t.editPanel.append(newEditPropsPanel);
    }
  }

  dragPreviewElement(){
    $('.dragable').attr('coreID','Before confirm.');
    $('.dragable').draggable();
  }

dragAndDropListener() {
    var t = this;
    $("body").on("DOMNodeInserted", ".standardDiv", t.makeDraggable);
    $("body").on("DOMNodeInserted", ".standardDiv", t.makeDroppable);
}

makeDroppable() {
    var self = editPanelUI;
    var t = this; //now this in not global, belongs to listener
    console.log('t je' +t);
  	$(t).droppable();
    $(".dropableDiv").droppable({
      drop: function(e, ui){
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        console.log($(this));
        if (stateManager.getCurrentEditModeState() == false){
          editPanelUI.motherElementSelected($(this).attr('coreID'));
          eventDirector.standardModeSubmitSequence();
          $('#drag-targeter').css({ left: 0, top: 0 });
          console.log(t);
        }
        else{
          editPanelUI.motherElementSelected($(this).attr('coreid'));
          var existingStructureEntity = editPanelUI.getCurrentActiveItem(editPanelUI.getCurrentActiveItems().length - 1);
          existingStructureEntity.setMotherStructure(controlPanelUI.getMotherElement());
          dataTranslator.rerenderPreview();
          // $('#drag-targeter').css({ left: 0, top: 0 });
        }
        $('#drag-targeter').css({ left: 0, top: 0 });
   }
 });
}
  makeDraggable() {
	   $(this).draggable();
    //  let targetCoreItem = editPanelUI.targetCoreItem($(this));
   }


  //   var t = this;
  //   $('.droppable').droppable({
  //     greedy:true,
  //     drop: function(event, ui){
  //       // if (!event) var event = window.event;
  //       // event.cancelBubble = true;
  //       var elementAtPoint = document.elementFromPoint(event.pageX-1, event.pageY-1);
   //
  //  if (!$.contains($('.droppable')[0], elementAtPoint)) {
  //    // not really meant for this element
  //    console.log('zase');
  //    return;
  //  }
   //
  //  // handle drop for this element
  //  console.log('prase');



          // if (stateManager.getCurrentEditModeState() == false){
          //   if($(this).attr('id') == 'structure-content'){
          //       eventDirector.standardModeSubmitSequence();
          //         console.log(this);
          //   }
          //   else{
          //     console.log('kurva');
          //   }
        //   // }
        //   $('#drag-targeter').css({ left: 0, top: 0 });
        // console.log('pes');
  //       // }
  //   });
  // }



  // $(document).on('click', t.editActivator, function (e) {

 //  $( function() {
 //   $( "#draggable" ).draggable();
 //   $( "#droppable" ).droppable({
 //     drop: function( event, ui ) {
 //       $( this )
 //         .addClass( "ui-state-highlight" )
 //         .find( "p" )
 //           .html( "Dropped!" );
 //     }
 //   });
 // } );

  editPanelClear() {
    var t = this;
    t.editPanel.empty();
  }
  //core edit methods

}
