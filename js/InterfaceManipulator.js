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
        t.motherControl = $('js_input-mother-select-list');
        t.userInteractionTrigger  = $('.js_sumbit_new_element');
    }


    userInputObtained() {
        var t = this;
        var result = null;
        t.userInteractionTrigger.on('click', function () {
          eventDirector.userInteraction();
        });
        return result;
      }


    fillProvisoryClassArray(){
        var t = this;
        t.classSubmit.on('click',function () {
            var newProvisoryClass = t.classControl.val();
            t.provisoryClassArray.push(newProvisoryClass);
        });
      }

    provisoryClassArrayIteration(targetedArray){
        var t = this;
        for(let value of t.provisoryClassArray){
            targetedArray.push(value);
        }
    }

    getStructureEntityName() {
        var t = this;
        var structureEntityName = t.nameControl.val();
        return structureEntityName;
    }


    getUserData(){
      var newStructureEntity = new StructureEntity();
      newStructureEntity.setUniqueName(t.getStructureEntityName());
      newStructureEntity.setcoreID(1);
      newStructureEntity.setVersionID(t.getVersionRelease());
      t.provisoryClassArrayIteration(newStructureEntity.classArray);
      newStructureEntity.pushToAttrMap(1,'aireemDA');
      newStructureEntity.setMotherStructure('mama');
      result = newStructureEntity;
      return result;
      console.log(newStructureEntity);
      console.log(newStructureEntity.getSingleMapAttr(1))
      console.log(newStructureEntity.getAllSingleMapAttrPairs());
    }




}
