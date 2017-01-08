class StateManager {
    constructor() {
        this.currentVersion = 0;
        this.uniqueIdentifier = 0;
        this.editMode = false;
        this.globalVersionRelease = null;
    }

    getGlobalVersionRelease(){
      var t = this;
      return t.globalVersionRelease;
    }

    setGlobalVersionRelease(value){
      var t = this;
      t.globalVersionRelease = value;
    }

    getCurrentEditModeState(){
      var t = this;
      return t.editMode;
    }

    setEditMode(){
       var t = this;
       t.editMode = true;
    }

    disableEditMode(){
      var t = this;
      t.editMode = false;
      controlPanelUI.switchToStandardMode();
    }

    getCurrentVersion(){
        var t = this;
        var currentVersion = t.currentVersion;
        return currentVersion;
    }

    nextVersion() {
        var t = this;
        t.currentVersion++;
    }

    resetVersion(){
        var t = this;
        t.currentVersion = 0;
    }

    getUniqueIntentifier(){
      var t = this;
      return t.uniqueIdentifier;
    }


    uniqueIdentifierInc(){
      var t = this;
      t.uniqueIdentifier++;
    }

    uniqueIdentifierDec(){
      var t = this;
      t.uniqueIdentifier--;
    }


}
