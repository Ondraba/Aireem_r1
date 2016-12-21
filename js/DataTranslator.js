class DataTranslator {
    constructor() {
     this.coreStructureHolder = [];
    }

    getCoreStructureHolder() {
     var t = this;
     return t.coreStructureHolder;
    }

    getSingleCoreStructureHolderItem(index){
      var t = this;
      return t.coreStructureHolder[index];
    }

    setItemToCoreStructureHolder(item){
      var t = this;
      t.coreStructureHolder.push(item);
    }

    startTheReconstruction(){
      var t = this;
      for(let value of t.coreStructureHolder){
        
    }
}
