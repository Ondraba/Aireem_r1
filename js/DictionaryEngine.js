class DictionaryEngine {
  constructor() {
    this.coreStructureHolder = null;
    this.actualDictionaryContext = null;
    this.actualDeclaration =  null;
    this.contextMask = dictionaryOptions.getContextMask();
    this.init();
  }

  init(){
    var t = this;
    t.loadCoreStructureHolder();
    t.loadDictionaryContext();
    t.loadDictionaryDeclarations();
  }

  loadCoreStructureHolder(){
    var t = this;
    t.coreStructureHolder = dataTranslator.getCoreStructureHolder();
  }

  getCoreStructureHolder(){
    var t = this;
    t.loadCoreStructureHolder();
    return t.coreStructureHolder;
  }

  getContextMask(){
    var t = this;
    return t.contextMask;
  }

  getActualDictionaryContext(){
    var t = this;
    return t.actualDictionaryContext;
  }

  getActualDeclaration(){
    var t = this;
    return t.actualDeclaration;
  }

  loadDictionaryContext(){
    var t = this;
    t.actualDictionaryContext = dictionaryOptions.getActiveDictionaryContext(t.getContextMask()[0]);
  }

  loadDictionaryDeclarations(){
    var t = this;
    t.actualDeclaration = dictionaryOptions.getActiveDictionaryHead(t.getContextMask()[0]);
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

  getDeclarations(index){
    var t = this;
    var declarationHead = t.getActualDeclaration();
    var headOpen = "";
    var headClose = "";
    var declarationHolder = $(document.createElement('div')).addClass('js_declaration-holder');

    for(var x = 0; x < declarationHead[index].length; x++){
        var declarationSpan = $(document.createElement('span')).addClass('declartion-span js_declaration-span');
        declarationSpan.text(declarationHead[index][x]);
        declarationHolder.append(declarationSpan);
    }

    return declarationHolder;
  }

  appendDeclarationInit(){
    var t = this;
    var declarationInit= t.getDeclarations(0);
    $('.result-showroom').append(declarationInit);
  }

  appendDeclarationEnd(){
    var t = this;
    var declarationEnd= t.getDeclarations(1);
    $('.result-showroom').append(declarationEnd);
  }

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

    t.appendDeclarationInit();
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
            console.log(coreStructureHolder);
          }
      }
    }
    t.appendDeclarationEnd();
    t.appendControl();
  }

//gui
  showTranslated(initTag, closingTag, classContent, coreid){
    var t = this;
    var tagPacket = $(document.createElement('div')).addClass('js_tagPacket tagPacket').attr('spanCoreId',coreid);
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
      // coreItemSpan.insertAfter(motherItemSpan);
    }
  }

  clearTagArea(){
    var t = this;
    $('.result-showroom').empty();
  };


}
