class EditPanelUI{
  constructor() {
        //options
        this.localEditsPanelOptions = null;

        this.currentActiveItem = null;

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
  initSequence(){
    var t = this;
    //init methods
    t.editPanelAreas();

    //listeners
    t.editElementSelected();
    t.editRemoveConfirm();
  }

  editPanelAreas(){
    var t = this;
    //areas
    t.editPanel = $('.edit-panel-main');
    //controlls
    t.editActivator = ".standardDiv";
    t.editManipulator = ".standard-favourite-box";
    t.editControl = ".js_switch_to_edit";
  }
//Edit init settings and controlls

activateEditMode(){
  t.editControl.on('click',function () {
    stateManager.setEditMode();
  });
}

switchToStandardMode(){
 console.log('editace vypnuta');
}


getCurrentActiveItem(){
  var t = this;
  return t.currentActiveItem;
}

setCurrentActiveItem(item){
  var t = this;
  t.currentActiveItem = item;
}

targetCoreItem(activatedBy){
  var t = this;
  var targetItem = null;
  for(var i = 0; i < dataTranslator.coreStructureHolder.length; i++){
      if (dataTranslator.coreStructureHolder[i].getVersionID() == $(activatedBy).attr('versionID')){
        targetItem = dataTranslator.coreStructureHolder[i];
        t.setCurrentActiveItem(targetItem);
      }
    }
    if (targetItem != null){
      return targetItem;
    }
    else throw new Error('There is some inconsistency between core items and core items props.');
}

removeCoreItem(){
  var t = this;
  var itemToRemove = t.getCurrentActiveItem();
  var index = dataTranslator.coreStructureHolder.indexOf(itemToRemove);
  dataTranslator.coreStructureHolder.splice(index,1);
  dataTranslator.rerenderPreview();
}

//core edit methods
  editElementSelected(){
    var t = this;
    $(document).on('click', t.editActivator,function (){

        let targetCoreItem = t.targetCoreItem(this);
        stateManager.setGlobalVersionRelease($(this).attr('versionID'));
        t.editPanelRerender(targetCoreItem);
        controlPanelUI.switchToEditMode();
        stateManager.setEditMode();
      
      });
  }


  editRemoveConfirm(){
    var t = this;
      $(document).on('click',t.editManipulator,function (){
          let targetCoreItem = t.targetCoreItem(this);
          for(var x = 0; x < targetCoreItem.classArray.length; x++){
            if(targetCoreItem.classArray[x] == $(this).children('span').text()){
                targetCoreItem.classArray.splice(x,1);
                t.editPanelRerender(targetCoreItem);
                dataTranslator.rerenderPreview();
              }
            }
      });
  }

  editPanelRerender(coreElementToEdit){
    var t = this;
    controlPanelUI.clearEditArea();
    for(let item of coreElementToEdit.classArray){
      var newEditPropsPanel = $(document.createElement('div'));
      var newEditPropsPanelText = $(document.createElement('span'));
      newEditPropsPanel.attr('versionID',coreElementToEdit.getVersionID());
      newEditPropsPanel.addClass('standard-favourite-box');
      newEditPropsPanelText.text(item);
      newEditPropsPanel.append(newEditPropsPanelText);
      t.editPanel.append(newEditPropsPanel);
    }
  }

  editPanelClear(){
    var t = this;
    t.editPanel.empty();
  }
//core edit methods


}
