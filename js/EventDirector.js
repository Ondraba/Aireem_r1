class EventDirector {
    constructor() {
      this.appInitSequence();
    }


    appInitSequence(){
      var t = this;
    }

    //cross class listeners

    standardModeSequence(){
      var t = this;
      stateManager.nextVersion();
      stateManager.uniqueIdentifierInc();
      controlPanelUI.getUserData();
      controlPanelUI.fillMothersList();
      dataTranslator.rerenderPreview();
      t.clearProvisoryData();
    }

    editModeSequence(){
      var t = this;
      stateManager.setEditMode();
      controlPanelUI.getEditUserData();
      dataTranslator.rerenderPreview();
      t.clearProvisoryData();
      stateManager.disableEditMode();
    }


    userInteraction() {
      var t = this;
      if (stateManager.getCurrentEditModeState() == false){
        t.standardModeSequence();
      }
      else if (stateManager.getCurrentEditModeState() == true){
        t.editModeSequence();
      }
      else{
         throw new Error('No application mode state.');
      }

    }

    removeInteraction(){
      var t = this;
      editPanelUI.removeCoreItem();
      t.clearProvisoryData();
    }

    saveNewStructureEntity(newStructureEntity){
      var t = this;
      dataTranslator.setItemToCoreStructureHolder(newStructureEntity);
    }

    clearProvisoryData(){
      var t = this;
      controlPanelUI.clearProvisoryClassArray();
      propsPanelUI.customPropertyAreaClear();
      editPanelUI.editPanelClear();
    }


  }
