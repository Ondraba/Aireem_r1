class StateManager {
    constructor() {
        this.currentVersion = 0;
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
}
