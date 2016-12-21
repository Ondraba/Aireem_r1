class EventDirector {
    constructor() {
     this.interfaceManipulator = interfaceManipulator;
     this.dataTranslator = dataTranslator;
     this.activeVersionUserData = null;
    }

    userInteraction() {
      var t = this;
      stateManager.nextVersion();
      t.getNewStructureEntity();
      t.saveNewStructureEntity();
    }

    getNewStructureEntity(){
      var t = this;
      t.activeVersionUserData = t.interfaceManipulator.getUserData();
    }

    saveNewStructureEntity(){
      var t = this;
      t.dataTranslator.setItemToCoreStructureHolder(t.activeVersionUserData);
    }
