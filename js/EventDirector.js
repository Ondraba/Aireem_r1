class EventDirector {
    constructor() {
      this.appInitSequence();
    }


    appInitSequence(){
      var t = this;
    }

    //cross class listeners

    standardModeSubmitSequence(){
      var t = this;
      stateManager.nextVersion();
      stateManager.uniqueIdentifierInc();
      controlPanelUI.getUserData();
      controlPanelUI.fillMothersList();
      dataTranslator.rerenderPreview();
      t.clearProvisoryData();
      controlPanelUI.clearMotherElement();
    }

    editModeSubmitSequence(){
      var t = this;
      stateManager.setEditMode();
      controlPanelUI.getEditUserData();
      dataTranslator.rerenderPreview();
      // t.clearProvisoryEditData();
      // // stateManager.disableEditMode();
      controlPanelUI.clearMotherElement();
    }

    standardModeTargetSequence(activatedBy){
    
    }

    editModeTargetSequence(activatedBy){

    }




    userInteraction() {
      var t = this;
      if (stateManager.getCurrentEditModeState() == false){
        t.standardModeSubmitSequence();
      }
      else if (stateManager.getCurrentEditModeState() == true){
        t.editModeSubmitSequence();
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

    clearProvisoryEditData(){
      var t = this;
      controlPanelUI.clearProvisoryClassArray();
      propsPanelUI.customPropertyAreaClear();
      editPanelUI.editPanelClear();
    }


  }
