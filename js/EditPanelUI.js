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

        //init methods and listerners
        this.editInit();
    }


//Edit init settings and areas/controlls
  editInit(){
    var t = this;
    t.editPanelAreas();
    t.editActivation();
    t.editRemoveConfirm();
  }

  editPanelAreas(){
    var t = this;
    //areas
    t.editPanel = $('.edit-panel-main');
    //controlls
    t.editActivator = ".standardDiv";
    t.editManipulator = ".standard-favourite-box";
  }
//Edit init settings and controlls


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

//core edit methods
  editActivation(){
    var t = this;
    $(document).on('click', t.editActivator,function (){
        let targetCoreItem = t.targetCoreItem(this);
        stateManager.setEditMode();
        stateManager.setGlobalVersionRelease($(this).attr('versionID'));
        t.editPanelRerender(targetCoreItem);
        controlPanelUI.switchToEditMode();
      });
  }


  editRemoveConfirm(){
    var t = this;
      $(document).on('click',t.editManipulator,function (){
          let targetCoreItem = t.targetCoreItem(this);
          for(var x = 0; x < t.targetCoreItem(this).classArray.length; x++){
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
    interfaceManipulator.clearEditArea();
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
//core edit methods


}
