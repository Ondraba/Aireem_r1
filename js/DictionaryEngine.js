class DictionaryEngine {
  constructor() {
    this.coreStructureHolder = null;
    this.actualDictionaryContext = null;
    this.init();
  }

  init(){
    var t = this;
    t.loadCoreStructureHolder();
    t.loadDictionaryContext();
    console.log(t.getAllDictionaryContextListing());
    console.log(t.getReadableContextListing());
  }

  loadCoreStructureHolder(){
    var t = this;
    t.coreStructureHolder = dataTranslator.getCoreStructureHolder();
  }

  getCoreStructureHolder(){
    var t = this;
    return t.coreStructureHolder;
  }

  getActualDictionaryContext(){
    var t = this;
    return this.actualDictionaryContext;
  }

  loadDictionaryContext(){
    var t = this;
    t.actualDictionaryContext = dictionaryOptions.getActiveDictionaryContext();
  }

  getCoreData(){
    var t = this;
    var coreData = dataTranslator.getCoreStructureHolder();
    return coreData;
  }

  getAllDictionaryContextListing(){
    var t = this;
    var allContext = [];
    var context = t.getActualDictionaryContext();
    for (let i = 0; i < context.length; i++){
      for (let x = 0; x < context[i].length; x++)
       allContext.push(context[i][x]);
    }
    return allContext;
  }

  getReadableContextListing(){
    var t = this;
    var readableContext = [];
    var context = t.getActualDictionaryContext();
    for (let i = 0; i < context.length; i++){
       readableContext.push(context[i][1]);
       readableContext.push(context[i][2]);
    }
    return readableContext;
  }

  //use ES6 map for listing

  coreTranslation(){
    var t = this;
    var coreStructureHolder = t.getCoreStructureHolder();
    var actualDictionaryContext = t.getActualDictionaryContext();
    var classesToTranslate = null;
    var initTagToTranslate = null;
    var closingTagToTranslate = null;
    for (var i = 0; i < coreStructureHolder.length; i++){
      for (var x = 0; x < actualDictionaryContext.length; x++){
          if (coreStructureHolder[i].getType() == actualDictionaryContext[x][0]){
            if (coreStructureHolder[i].classArray.length > 0){
              classesToTranslate= coreStructureHolder[i].classArray.reduce(function(a, b) {
                return a + " " + b;
              });
            }
            initTagToTranslate = actualDictionaryContext[x][1];
            closingTagToTranslate = actualDictionaryContext[x][2];
            t.showTranslated(initTagToTranslate, closingTagToTranslate, classesToTranslate);
          }
      }
    }
  }



  showTranslated(initTag, closingTag, classContent){
    var initTagSpan = $(document.createElement('span'));
    var classesSpan = $(document.createElement('span'));
    var closingTagSpan = $(document.createElement('span'));
    initTagSpan.text(initTag);
    classesSpan.text(classContent);
    closingTagSpan.text(closingTag);
    $('.result-showroom').append(initTagSpan);
    $('.result-showroom').append(classesSpan);
      $('.result-showroom').append('">');
    $('.result-showroom').append(closingTagSpan);
  }


}
