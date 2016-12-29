class EditPanelUI{
  constructor() {
        this.localEditsPanelOptions = null;
        this.editPanelMain = null;
    }

  editPanelAreas(){
    var t = this;
    t.editPanelMain = $('.edit-panel-main');
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
