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
    t.clearTagArea();
    var coreStructureHolder = t.getCoreStructureHolder();
    var actualDictionaryContext = t.getActualDictionaryContext();
    var classesToTranslate = null;
    var initTagToTranslate = null;
    var closingTagToTranslate = null;
    var motherId = null;
    var coreid = null;
    for (var i = 0; i < coreStructureHolder.length; i++){
      for (var x = 0; x < actualDictionaryContext.length; x++){
          if (coreStructureHolder[i].getType() == actualDictionaryContext[x][0]){
            if (coreStructureHolder[i].classArray.length > 0){
              classesToTranslate = coreStructureHolder[i].classArray.reduce(function(a, b) {
                return a + " " + b;
              });
              console.log(classesToTranslate);
            }
            else{
              classesToTranslate = "";
            }
            initTagToTranslate = actualDictionaryContext[x][1];
            closingTagToTranslate = actualDictionaryContext[x][2];
            coreid = coreStructureHolder[i].getCoreID();
            motherId = coreStructureHolder[i].getMotherStructure();
            t.showTranslated(initTagToTranslate, closingTagToTranslate, classesToTranslate, coreid);
          }
      }
    }
    t.appendControl();
  }

//gui
  showTranslated(initTag, closingTag, classContent, coreid){
    var t = this;
    var t = this;
    var tagPacket = $(document.createElement('div')).addClass('js_tagPacket').attr('spanCoreId',coreid);
    var initTagSpan = $(document.createElement('span')).text(initTag).attr('spanCoreId',coreid).addClass('js_initTag');
    var classesSpan = $(document.createElement('span')).text(classContent).attr('spanCoreId',coreid).addClass('js_classesSpan');
    var innerClosingTag =  $(document.createElement('span')).text('">').attr('spanCoreId',coreid).addClass('js_innerTag');
    var closingTagSpan = $(document.createElement('span')).text(closingTag).attr('spanCoreId',coreid).addClass('js_closingSpan');
    tagPacket.append(initTagSpan);
    tagPacket.append(classesSpan);
    tagPacket.append(innerClosingTag);
    tagPacket.append(closingTagSpan);
    $('.result-showroom').append(tagPacket);
  }

  appendControl(){
    var t = this;
    var motherId = null;
    var coreId = null;
    var coreItemSpan = null;
    var motherItemSpan = null;
    for(let item of dataTranslator.coreStructureHolder){
      coreId = item.getCoreID();
      motherId = item.getMotherStructure();
      var coreItemSpan = $(".js_tagPacket[spanCoreId='" +  coreId + "']").addClass('tagPacketInside');
      var motherItemSpan = $(".js_innerTag[spanCoreId='" + motherId + "']");
      motherItemSpan.append(coreItemSpan);
    }
  }

  clearTagArea(){
    var t = this;
    $('.result-showroom').empty();
  };


}
