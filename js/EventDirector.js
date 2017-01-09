class EventDirector {
    constructor() {
      this.appInitSequence();
    }


    appInitSequence(){
      var t = this;
      controlPanelUI.controlDefinition();
      controlPanelUI.controlStartupInit();
      propsPanelUI.fillPropsPanel();
      propsPanelUI.propsPanelAreas();
      editPanelUI.editPanelAreas();
      t.initListeners();
    }

    initListeners(){
        var t = this;
        t.controlPanelUIListeners();
        t.editPanelUIListeners();
        t.propsPanelUIListeners();
        t.eventDirectorListeners();
    }

    eventDirectorListeners(){
      var t = this;
    }

    //cross class listeners
    controlPanelUIListeners(){
      controlPanelUI.userInputObtained();
      controlPanelUI.fillProvisoryClassArray();
    }

    editPanelUIListeners(){
      editPanelUI.editActivation();
      editPanelUI.editRemoveConfirm();
    }

    propsPanelUIListeners(){
      propsPanelUI.propsPanelReaction();
      propsPanelUI.customPropsPanelReaction();
    }
    //cross class listeners

    standardModeSequence(){
      var t = this;
      stateManager.nextVersion();
      stateManager.uniqueIdentifierInc();
      controlPanelUI.getUserData();
      t.setNewMotherElement();
      dataTranslator.rerenderPreview();
      t.clearProvisoryData();
    }

    editModeSequence(){
      var t = this;
      stateManager.setEditMode();
      controlPanelUI.getEditUserData();
      dataTranslator.rerenderPreview();
      t.clearProvisoryData();
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

    saveNewStructureEntity(newStructureEntity){
      var t = this;
      dataTranslator.setItemToCoreStructureHolder(newStructureEntity);
    }

    clearProvisoryData(){
      var t = this;
      controlPanelUI.clearProvisoryClassArray();
      propsPanelUI.customPropertyAreaClear();
    }

    setNewMotherElement(){
      var t = this;
      controlPanelUI.fillMothersList('test');
    }
  }
