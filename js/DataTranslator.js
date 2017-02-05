class DataTranslator {
  constructor() {
    this.coreStructureHolder = []; //holds core structure of CONFIRMED data structures from user
    this.provisoryClassHolder = []; //holds provisory UNCONFIRMED class properties from user
  }

  getCoreStructureHolder() {
    var t = this;
    return t.coreStructureHolder;
  }

  getSingleCoreStructureHolderItem(index) {
    var t = this;
    return t.coreStructureHolder[index];
  }

  setItemToCoreStructureHolder(item) {
    var t = this;
    t.coreStructureHolder.push(item);
  }

  getProvisoryClassHolder() {
    var t = this;
    return t.provisoryClassHolder;
  }

  getProvisoryClassHolderItem(index) {
    var t = this;
    return t.provisoryClassHolder[index];
  }

  setItemToProvisoryClassHolder(item) {
    var t = this;
    var arr = [];
    arr.push(item);
    var diffArray = helpers.arrayCompare(arr, t.provisoryClassHolder);
    for (let filteredItem of diffArray) {
      t.provisoryClassHolder.push(filteredItem);
    }
  }


  provisoryToCoreSwap(coreStructureArray, provisoryArray) {
    var t = this;
    if (stateManager.getCurrentEditModeState() == true) {
      var diffArray = helpers.arrayCompare(provisoryArray, coreStructureArray);
      for (let filteredItem of diffArray) {
        coreStructureArray.push(filteredItem);
      }
    } else {
      for (let item of provisoryArray) {
        coreStructureArray.push(item);
      }
    }
  }

  clearProvisoryClassArray() {
    var t = this;
    var arrayToClear = t.provisoryClassHolder;
    arrayToClear.splice(0);
  }

  //provisory class aray area


  presetCoreIds() {
    for (let item of t.coreStructureHolder) {
      var newPreviewElement = $(document.createElement('div'));
      newPreviewElement.attr('coreid', item.getCoreID());
    }
  }


  rerenderMothersAndChilds() {
    var t = this;
    for (let item of t.coreStructureHolder) {
      var coreIdVal = item.getCoreID();
      var motherIdVal = item.getMotherStructure();
      var coreItem = $("div[coreid='" + coreIdVal + "']");
      console.log('core' + coreItem);
      var motherItem = $("div[coreid='" + motherIdVal + "']");
      if (motherIdVal == layoutBuilderOptions.options.coreStructureElements.defaultMotherElement) {
        coreItem.addClass('standardDiv');
        $(item.getMotherSelector()).append(coreItem);
      } else {
        coreItem.addClass('innerDiv');
        motherItem.append(coreItem);
      }
    }
  }

  rerenderPreview() {
    var t = this;
    controlPanelUI.clearPreviewArea();
    var colSizeCheck = 'col-sm-12';
    for (let item of t.coreStructureHolder) {
      var newPreviewElement = $(document.createElement('div'));
      newPreviewElement.attr('coreid', item.getCoreID());
      newPreviewElement.attr('versionID', item.getVersionID());
      newPreviewElement.addClass(colSizeCheck);
      newPreviewElement.addClass('js_selectableDiv');
      for (let itemClass of item.classArray) {
        if (item.classArray.length != 0) {
          newPreviewElement.addClass(itemClass);
          if (itemClass != colSizeCheck) {
            newPreviewElement.removeClass(colSizeCheck);
          }
        } else {
          console.log('LOG: No class item in core structure element class array');
        }
      }
      // newPreviewElement.addClass('preexist');
      $('#' + layoutBuilderOptions.options.coreStructureElements.defaultMotherElement).append(newPreviewElement);

      t.rerenderMothersAndChilds();
    }
  }

}
