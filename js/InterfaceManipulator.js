class InterfaceManipulator {
    constructor() {
        this.nameControl = null;
        this.classControl = null;
        this.classSubmit = null;
        this.motherControl = null;
        this.userInteractionTrigger = null;

        this.provisoryClassArray = [];

        this.localInitSettings();
    }

    localInitSettings() {
        var t = this;
        t.controlDefinition();
        t.controlStartupInit();
        t.userInputObtained();
        t.fillProvisoryClassArray();
    }

    getVersionRelease(){
        var t = this;
        var currentVersion = stateManager.getCurrentVersion();
        return currentVersion;
    }

    controlDefinition() {
        var t = this;
        t.nameControl = $('.js_name-input');
        t.classControl = $('.js_class-input');
        t.classSubmit = $('.js_class-button');
        t.motherControl = $('.js_input-mother-select-list');
        t.userInteractionTrigger  = $('.js_sumbit_new_element');
    }

    controlStartupInit(){
      var t = this;
      t.fillMothersList(layoutBuilderOptions.options.coreStructureElements.defaultMotherElement);
    }

    clearPreviewArea(){
      $('#structure-content').empty();
    }


    clearEditArea(){
      $('.edit-panel-main').empty();
    }

    fillTheLists(selectList, newOption){
       var t = this;
       selectList.append(("<option value='" + newOption + "'>" + newOption + "</option>"));
    }

    fillMothersList(newOption){
      var t = this;
      t.fillTheLists(t.motherControl, newOption);
    }


    userInputObtained() {
        var t = this;
        var result = null;
        t.userInteractionTrigger.on('click', function () {
          eventDirector.userInteraction();
        });
        return result;
      }

//provisory class aray area
    fillProvisoryClassArray(){
        var t = this;
        t.classSubmit.on('click',function () {
            var newProvisoryClass = t.classControl.val();
            t.provisoryClassArray.push(newProvisoryClass);
        });
      }

      clearProvisoryClassArray(){
          var t = this;
          var arrayToClear = t.provisoryClassArray;
          t.provisoryClassArray.splice(0);
      }

    provisoryClassArrayIteration(targetedArray){
        var t = this;
        for(let value of t.provisoryClassArray){
            targetedArray.push(value);
        }
    }
//provisory class aray area

    getStructureEntityName() {
        var t = this;
        var structureEntityName = t.nameControl.val();
        return structureEntityName;
    }

    getMotherName(){
      var t = this;
      var mothersName = t.motherControl.val();
      return mothersName;
    }



    getUserData(){
      var t = this;
      var newStructureEntity = new StructureEntity();
      newStructureEntity.setUniqueName(t.getStructureEntityName());
      newStructureEntity.setcoreID(stateManager.getUniqueIntentifier());
      newStructureEntity.setVersionID(stateManager.getCurrentVersion());
      t.provisoryClassArrayIteration(newStructureEntity.classArray);
      newStructureEntity.pushToAttrMap(stateManager.getUniqueIntentifier(),'aireemDA');
      newStructureEntity.setMotherStructure(t.getMotherName());
      return newStructureEntity;
    }

}
