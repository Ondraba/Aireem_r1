class HistoryMem {
    constructor() {
      this.coreHistory = [];
    }

    localInitSettings() {
        var t = this;
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
