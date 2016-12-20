 class StructureVendor {
    constructor() {
      this.elementsArray = [];
    }


    createElement(elementName, classArray, attrArray, elementMother) {
        var t = this;
       helpersInstnace.counterInc();

        var newElementInstance = new Element();
        newElementInstance.setName(elementName);
        newElementInstance.setAireemID(helpersInstnace.counter);
        newElementInstance.setAireemDA('aireemDA');
        for (var i = 0; i < classArray.length; i++) {
            newElementInstance.setClass(classArray[i]);
        }
        for (var x = 0; x < attrArray.length; x++) {
            newElementInstance.setDataAttr(attrArray[x]);
        }
        newElementInstance.setMother(elementMother);
        t.elementsArray.push(newElementInstance);

        t.generatePreview(newElementInstance);
        console.log('created')
    }

    generatePreview(newElementInstance){
      var newElement = $(document.createElement('div'));
      var elementMotherVar = $('#' + newElementInstance.getMother());
      newElement.attr('id',newElementInstance.getName());
      newElement.attr('aireemId', newElementInstance.getAireemID());
      newElement.attr('data-aireemDA', newElementInstance.getAireemDA());
      if (newElementInstance.getMother() != elementOptionsInstance.options.elementInheritence.defaultStructureRoot){
         newElement.addClass('innerDiv');}
      else {
          newElement.addClass('standardDiv');}

        for (var i = 0; i < newElementInstance.getClassArray().length; i++){
            newElement.addClass(newElementInstance.getClassArray()[i]);
        }
        for (var x = 0; x < newElementInstance.getDataAttrArray().length; x++){
            newElement.attr(newElementInstance.getDataAttrArray()[x]);
        }
      newElement.addClass('aireemContainer');  
    	this.appendElement(newElement, elementMotherVar);
    }


    appendElement(element, elementMother){
    	elementMother.append(element);
    }


}
