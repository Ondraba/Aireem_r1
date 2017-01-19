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
      var arr = [];
      arr.push(item);
      var diffArray = helpers.arrayCompare(arr, t.provisoryClassHolder);
        for (let filteredItem of diffArray){
          t.provisoryClassHolder.push(filteredItem);
        }
    }


    provisoryToCoreSwap(coreStructureArray, provisoryArray){
          var t = this;
          if(stateManager.getCurrentEditModeState() == true){
          var diffArray = helpers.arrayCompare(provisoryArray, coreStructureArray);
            for (let filteredItem of diffArray){
              coreStructureArray.push(filteredItem);
            }
          }
          else{
            for (let item of provisoryArray){
              coreStructureArray.push(item);
            }
          }
      }

  clearProvisoryClassArray(){
          var t = this;
          var arrayToClear = t.provisoryClassHolder;
          arrayToClear.splice(0);
          }

    //provisory class aray area




    rerenderPreview(){
      var t = this;
      controlPanelUI.clearPreviewArea();
      var colSizeCheck = 'col-sm-12';
      for(let item of t.coreStructureHolder){
        var newPreviewElement = $(document.createElement('div'));
        newPreviewElement.attr('coreid', item.getCoreID());
        newPreviewElement.attr('id',item.getUniqeName());
        newPreviewElement.attr('versionID',item.getVersionID());
        newPreviewElement.addClass(colSizeCheck);
        for(let itemClass of item.classArray){
          if(item.classArray.length != 0){
          newPreviewElement.addClass(itemClass);
            if(itemClass != colSizeCheck){
            newPreviewElement.removeClass(colSizeCheck);
            }
          }
          else{
            console.log('LOG: No class item in core structure element class array');
          }
        }
        if (item.getMotherStructure() == layoutBuilderOptions.options.coreStructureElements.defaultMotherElement){
          newPreviewElement.addClass('standardDiv');
          $(item.getMotherSelector()).append(newPreviewElement);
        }
        else{
          newPreviewElement.addClass('innerDiv');
          $("div[coreid='" + item.getMotherStructure() + "']").append(newPreviewElement);
        }
      }
    }
}
