class EventDirector {
    constructor() {
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

    standardModeSequence(){
      stateManager.nextVersion();
      stateManager.uniqueIdentifierInc();
      interfaceManipulator.newVsEdit();
      t.setNewMotherElement();
      dataTranslator.rerenderPreview();
      t.clearProvisoryData();
    }

    getNewStructureEntity(){
      var t = this;
      t.activeVersionUserData = interfaceManipulator.getUserData();
    }

    saveNewStructureEntity(newStructureEntity){
      var t = this;
      dataTranslator.setItemToCoreStructureHolder(newStructureEntity);
    }

    clearProvisoryData(){
      var t = this;
      interfaceManipulator.clearProvisoryClassArray();
      propsPanelUI.customPropertyAreaClear();
    }

    setNewMotherElement(){
      var t = this;
      interfaceManipulator.fillMothersList('test');
    }
  }
