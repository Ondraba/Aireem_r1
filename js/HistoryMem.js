class HistoryMem {
    constructor() {
      this.coreHistory = [];
      this.stepQueue = 1;
      this.queue = false;
      this.historyChanged = false;
      this.historyPosition = null;
      this.historyExcludePoint = false;

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

    catchCurrentHistoryPosition(position){
      var t = this;
      t.historyPosition = position;
    }

    getCurrentHistoryPosition(){
      var t = this;
      return t.historyPosition;
    }

    initHistoryPosition(coreHistory){
      var t = this;
      t.historyPosition = coreHistory.length - 1;
    }

    degHistoryPosition(){
      var t = this;
      t.historyPosition--;
    }

    degHistoryWithoutLast(){
      var t = this;
      t.historyPosition = t.historyPosition - 2;
    }

    incHistoryPosition(){
      var t = this;
      t.historyPosition++;
    }

    incHistoryWithoutLast(){
      var t = this;
      t.historyPosition = t.historyPosition + 2;
    }

    historyExclude(){
      var t = this;
      t.historyExcludePoint = true;
    }

    historyInclude(){
      var t = this;
      t.historyExcludePoint = false;
    }


    prevVersion() {
      var t = this;
      t.prevVersionSubmit.on('click', function () {
        if((dataTranslator.getCoreStructureHolder().length) > 1){
          // var appCoreState = dataTranslator.getCoreStructureHolder();
          var currentHistoryIndex = t.getCurrentHistoryPosition() - 1;
          var historyStamp = t.getCoreHistory()[currentHistoryIndex - 1];
          var immunate = t.immunate(historyStamp);
          dataTranslator.coreStructureHolder = immunate;
          t.degHistoryPosition();
          t.historyExclude();
          dataTranslator.rerenderPreview();
        }
        else{
          t.historyPosition = 0;
          dataTranslator.clearCoreStructureHolder();
          t.historyExclude();
          dataTranslator.rerenderPreview();
          console.log('History core limit cant be set below 0');
        }
      });
    }

    nextVersion(){
      var t = this;
      t.nextVersionSubmit.on('click', function () {
        if(t.getCoreHistory().length > t.getCurrentHistoryPosition()){
          // var appCoreState = dataTranslator.getCoreStructureHolder();
          var currentHistoryIndex = t.getCurrentHistoryPosition() - 1;
          var historyStamp = t.getCoreHistory()[currentHistoryIndex + 1];
          var immunate = t.immunate(historyStamp);
          dataTranslator.coreStructureHolder = immunate;
          t.incHistoryPosition();
          t.historyExclude();
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

    immutateSingleOne(item){
      var t = this;
      const iItem = item;
      return iItem;
    }

    immutateWholeState(){
      var t = this;
      var iCoreStructureHolder = [];
      for(let item of dataTranslator.coreStructureHolder){
        const iItem = t.immutateSingleOne(item);
        iCoreStructureHolder.push(iItem);
      }
      var immutate = t.immunate(iCoreStructureHolder);
      dataTranslator.coreStructureHolder = immutate;
      return immutate;
    }

   immutablePush(arr, newEntry){
      return [ ...arr, newEntry ]
      }


  coreStructureHolderImmunate(){
    var t = this;
    var coreStructureHolder = dataTranslator.getCoreStructureHolder();
    var immunatedCoreStructureHolder = t.immunate(coreStructureHolder);
    t.coreHistory.push(immunatedCoreStructureHolder);
  }

}
