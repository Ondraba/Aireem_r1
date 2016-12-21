class StateManager {
    constructor() {
        this.currentVersion = 0;
        this.uniqueIdentifier = 0;
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
        var t = thisl
        t.currentVersion = 0;
    }

    uniqueIdentifierInc(){
      var t = this;
      var result = t.uniqueIdentifier++;
      return result;
    }

    uniqueIdentifierInc(){
      var t = this;
      t.uniqueIdentifier++;
      return t.uniqueIdentifier;
    }

    uniqueIdentifierDec(){
      var t = this;
      t.uniqueIdentifier--;
      return t.uniqueIdentifier;
    }
}
