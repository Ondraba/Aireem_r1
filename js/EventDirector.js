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
      dataTranslator.rerenderPreview();
      t.fullReset();
    }

    editModeSubmitSequence(){
      var t = this;
      stateManager.setEditMode();
      controlPanelUI.getEditUserData();
      dataTranslator.rerenderPreview();
      // t.clearProvisoryEditData();
      // // stateManager.disableEditMode();
      // controlPanelUI.clearMotherElement();
    }

    fullReset(){
      editPanelUI.editPanelClear();
      editPanelUI.clearCurrentActiveItems();
      propsPanelUI.customPropertyAreaClear();
      dataTranslator.clearProvisoryClassArray();
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
      var immutate = historyMem.immutateSingleOne(newStructureEntity);
      dataTranslator.setItemToCoreStructureHolder(immutate);
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
