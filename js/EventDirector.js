class EventDirector {
    constructor() {
     this.activeVersionUserData = null;
     this.dataTranslator = dataTranslator;
     this.stateManager = stateManager;
    }

    userInteraction() {
      var t = this;
      t.stateManager.nextVersion();
      t.stateManager.uniqueIdentifierInc();
      t.getNewStructureEntity();
      t.saveNewStructureEntity();
      t.setNewMotherElement();
      t.dataTranslator.rerenderPreview();
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
      t.dataTranslator.clearProvisoryClassArray();
    }

    setNewMotherElement(){
      var t = this;
      interfaceManipulator.fillMothersList(t.activeVersionUserData.getUniqeName());
    }
  }
