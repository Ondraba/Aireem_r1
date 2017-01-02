class EventDirector {
    constructor() {
     this.activeVersionUserData = null;
    }


    userInteraction() {
      var t = this;
      stateManager.nextVersion();
      stateManager.uniqueIdentifierInc();
      t.getNewStructureEntity();
      t.saveNewStructureEntity();
      t.setNewMotherElement();
      dataTranslator.rerenderPreview();
      t.clearProvisoryData();
    }

    getNewStructureEntity(){
      var t = this;
      t.activeVersionUserData = interfaceManipulator.getUserData();
    }

    saveNewStructureEntity(){
      var t = this;
      dataTranslator.setItemToCoreStructureHolder(t.activeVersionUserData);
    }

    clearProvisoryData(){
      var t = this;
      interfaceManipulator.clearProvisoryClassArray();
      propsPanelUI.customPropertyAreaClear();
    }

    setNewMotherElement(){
      var t = this;
      interfaceManipulator.fillMothersList(t.activeVersionUserData.getUniqeName());
    }
  }
