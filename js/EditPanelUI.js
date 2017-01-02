class EditPanelUI{
  constructor() {
        //options
        this.localEditsPanelOptions = null;

        //cross class instances
        this.stateManager = stateManager;
        this.dataTranslator = dataTranslator;

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

targetCoreItem(activatedBy){
  var t = this;
  var targetItem = null;
  for(var i = 0; i < t.dataTranslator.coreStructureHolder.length; i++){
      if (t.dataTranslator.coreStructureHolder[i].getVersionID() == $(activatedBy).attr('versionID')){
        t.stateManager.setEditMode();
        targetItem = t.dataTranslator.coreStructureHolder[i];
        t.stateManager.setGlobalVersion(targetItem.getVersionID());
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
        console.log('this' + this);
        t.editPanelRerender(targetCoreItem);
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
                t.dataTranslator.rerenderPreview();
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
