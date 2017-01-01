class DataTranslator {
    constructor() {
     this.coreStructureHolder = []; //holds core structure of CONFIRMED data structures from user
     this.provisoryClassHolder = []; //holds provisory UNCONFIRMED class properties from user
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

    getProvisoryClassHolder() {
     var t = this;
     return t.provisoryClassHolder;
    }

    getProvisoryClassHolderItem(index){
      var t = this;
      return t.provisoryClassHolder[index];
    }

    setItemToProvisoryClassHolder(item){
      var t = this;
      t.provisoryClassHolder.push(item);
    }


    provisoryToCoreSwap(coreStructureArray){
          var t = this;
          for(let value of t.provisoryClassHolder){
              coreStructureArray.push(value);
          }
    }




    rerenderPreview(){
      var t = this;
      interfaceManipulator.clearPreviewArea();
      for(let item of t.coreStructureHolder){
        console.log('item', item);
        var newPreviewElement = $(document.createElement('div'));
        newPreviewElement.attr('coreid', item.getCoreID());
        newPreviewElement.attr('id',item.getUniqeName());
        newPreviewElement.attr('versionID',item.getVersionID());
        for(let itemClass of item.classArray){
          if(item.classArray.length != 0){
          newPreviewElement.addClass(itemClass);
          }
          else{
            console.log('LOG: No class item in core structure element class array');
          }
        }
        if (item.getMotherStructure() == layoutBuilderOptions.options.coreStructureElements.defaultMotherElement){
        newPreviewElement.addClass('standardDiv');
        }
        else{
        newPreviewElement.addClass('innerDiv');
        }

        $(item.getMotherSelector()).append(newPreviewElement);
        console.log(item.getMotherSelector());
      }
    }
}
