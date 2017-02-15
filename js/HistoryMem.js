class HistoryMem {
    constructor() {
      this.coreHistory = [];

      //controlls
      this.nextVersionSubmit = null;
      this.prevVersionSubmit = null;

      this.localInitSettings();
    }

    localInitSettings() {
        var t = this;
        t.controlDefinition();
        t.prevVersion();
        t.nextVersion();
    }

    controlDefinition(){
      var t = this;
      t.nextVersionSubmit = $('.js_next-version-button');
      t.prevVersionSubmit = $('.js_prev-version-button');
    }

    getCoreHistory(){
      var t = this;
      return t.coreHistory;
    }


    prevVersion() {
      var t = this;
      t.prevVersionSubmit.on('click', function () {
        if(dataTranslator.getCoreStructureHolder().length > 0){
        var appCoreState = dataTranslator.getCoreStructureHolder();
        appCoreState.pop();
        dataTranslator.rerenderPreview();
        }
        else{
          console.log('History core limit cant be set below 0');
        }
      });
    }

    nextVersion(){
      var t = this;
      t.nextVersionSubmit.on('click', function () {
        if(t.getCoreHistory().length > dataTranslator.getCoreStructureHolder().length){
        var appCoreState = dataTranslator.getCoreStructureHolder();
        var currentHistoryIndex = appCoreState.length - 1;
        var futureStamp = t.getCoreHistory()[currentHistoryIndex + 1];
        dataTranslator.coreStructureHolder = futureStamp;
        dataTranslator.rerenderPreview();
        }
        else{
          console.log('History core limit cant see the future!')
        }
      });
    }

    addHistory(historyArray){
      var t = this;
      if(Array.isArray(historyArray)){
          t.coreHistory.push(historyArray);
      }
      else{
        throw new Error('History can accept only objects typeof array');
      }
    }

    immutableArrayStamp(arr, newEntry){
      var t = this;
      if(Array.isArray(arr)){
          t.coreHistory.push([ ...arr, newEntry ]);
      }
      else{
        throw new Error('History can accept only objects typeof array');
      }
    }

   immutablePush(arr, newEntry){
      return [ ...arr, newEntry ]
      }
  }
