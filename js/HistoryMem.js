class HistoryMem {
    constructor() {
      this.coreHistory = [];
      this.stepQueue = 1;
      this.queue = false;
      this.historyChanged = false;

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

    getStepQueque(){
      var t = this;
      return t.stepQueue;
    }

    getQueque(){
      var t = this;
      return t.queue;
    }

    setQueque(){
      var t = this;
      t.queue = true;
    }

    incStepQueque(){
      var t = this;
      t.stepQueue++;
    }


    prevVersion() {
      var t = this;
      t.prevVersionSubmit.on('click', function () {
        if((dataTranslator.getCoreStructureHolder().length) > 0){
          t.historyChanged = true;
          var appCoreState = dataTranslator.getCoreStructureHolder();
          var currentHistoryIndex = appCoreState.length - 1;
          var historyStamp = t.getCoreHistory()[currentHistoryIndex - 1];
          var immunate = t.immunate(historyStamp);
          dataTranslator.coreStructureHolder = immunate;
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
          var immunate = t.immunate(futureStamp);
          dataTranslator.coreStructureHolder = immunate;
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

    immutableArrayRetention(array){
        var t = this;
        t.coreHistory.push([...array]);
    }

    immunate(array){
        var t = this;
        return ([...array]);
    }

   immutablePush(arr, newEntry){
      return [ ...arr, newEntry ]
      }
  }
