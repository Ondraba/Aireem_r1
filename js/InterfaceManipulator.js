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
        t.userInteractionTrigger.on('click', function () {
          eventDirector.userInteraction();
        });
      }

//provisory class aray area
    fillProvisoryClassArray(){
        var t = this;
        t.classSubmit.on('click',function () {
            var newProvisoryClass = t.classControl.val();
            dataTranslator.setItemToProvisoryClassHolder(newProvisoryClass);
            propsPanelUI.rerenderCustomProps();
        });
      }

      clearProvisoryClassArray(){
          var t = this;
          var arrayToClear = dataTranslator.provisoryClassHolder;
          arrayToClear.splice(0);
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

    newVsEdit(){
      var t = this;
      if(stateManager.getCurrentEditModeState() == false){
        t.getUserData();
      }
      else{
        t.getEditUserData();
      }
    }

    getEditUserData(){
      var t = this;
      var existingStructureEntity = editPanelUI.getCurrentActiveItem();
      existingStructureEntity.setUniqueName(t.getStructureEntityName());
      dataTranslator.provisoryToCoreSwap(existingStructureEntity.classArray);
      existingStructureEntity.setMotherStructure(t.getMotherName());
    }

    getUserData(){
      var t = this;
      var newStructureEntity = new StructureEntity();
      newStructureEntity.setUniqueName(t.getStructureEntityName());
      newStructureEntity.setcoreID(stateManager.getUniqueIntentifier());
      newStructureEntity.setVersionID(stateManager.getCurrentVersion());
      dataTranslator.provisoryToCoreSwap(newStructureEntity.classArray);
      newStructureEntity.pushToAttrMap(stateManager.getUniqueIntentifier(),'aireemDA');
      newStructureEntity.setMotherStructure(t.getMotherName());
      eventDirector.saveNewStructureEntity(newStructureEntity);
    }

}
