class EditPanelUI{
  constructor() {
        this.localEditsPanelOptions = null;
        this.editPanelMain = null;
        this.stateManager = stateManager;
    }

  editPanelAreas(){
    var t = this;
    t.editPanelMain = $('.edit-panel-main');
  }


  editActivation(){
    var t = this;
    $(document).on('click','.standardDiv',function (){
        for(var i = 0; i < t.coreStructureHolder.length; i++){
            if (t.coreStructureHolder[i].getVersionID() == $(this).attr('versionID')){
              t.stateManager.setStateToEditMode();
              t.rerenderEditMain(t.coreStructureHolder[i]);
              console.log('yes' + t.coreStructureHolder[i].getVersionID());
            }
          }
    });
  }


  rerenderEditMain(coreElementToEdit){

    var t = this;
    interfaceManipulator.clearEditArea();
    for(let item of coreElementToEdit.classArray){
      console.log('edituji');
      var newEditPropsPanel = $(document.createElement('div'));
      var newEditPropsPanelText = $(document.createElement('span'));
      newEditPropsPanel.attr('versionID',coreElementToEdit.getVersionID());
      newEditPropsPanel.addClass('standard-favourite-box');
      newEditPropsPanelText.text(item);
      newEditPropsPanel.append(newEditPropsPanelText);
      $('.edit-panel-main').append(newEditPropsPanel);
    }
  }

}
