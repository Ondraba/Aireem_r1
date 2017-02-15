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
    }

    controlDefinition(){
      var t = this;
      t.nextVersionSubmit = $('.js_next-version-button');
      t.prevVersionSubmit = $('.js_prev-version-button');
    }


    prevVersion() {
      var t = this;
      t.prevVersionSubmit.on('click', function () {
        console.log('ehm');
        var appCoreState = dataTranslator.getCoreStructureHolder();
        appCoreState.pop();
        dataTranslator.rerenderPreview();
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

   immutablePush(arr, newEntry){
      return [ ...arr, newEntry ]
      }
  }
