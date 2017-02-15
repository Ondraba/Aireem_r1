class ControlPanelUI {
  constructor() {
    this.nameControl = null;
    this.classControl = null;
    this.appendControl = null;
    this.classSubmit = null;
    this.motherControl = null;
    this.removeControl = null;
    this.userInteractionTrigger = null;

    this.defaultMotherElement = layoutBuilderOptions.options.coreStructureElements.defaultMotherElement;
    layoutBuilderOptions.options.coreStructureElements.defaultMotherElement;
    this.motherElement = this.defaultMotherElement;

    this.provisoryClassArray = [];

    this.initSequence();
  }

  initSequence() {
    var t = this;
    //init methods
    t.controlDefinition();

    //listeners
    t.userInputListener();
    t.removeInputListener();
    t.fillProvisoryClassArray();
  }

  getVersionRelease() {
    var t = this;
    var currentVersion = stateManager.getCurrentVersion();
    return currentVersion;
  }

  getMotherElement() {
    var t = this;
    return t.motherElement;
  }

  setNewMotherElement(newMotherElement) {
    var t = this;
    t.motherElement = newMotherElement;
  }

  clearMotherElement() {
    var t = this;
    t.motherElement = t.defaultMotherElement;
  }

  controlDefinition() {
    var t = this;
    t.nameControl = $('.js_name-input');
    t.classControl = $('.js_class-input');
    t.classSubmit = $('.js_class-button');
    t.appendControl = $('.js_append_element');
    t.motherControl = $('.js_input-mother-select-list');
    t.userInteractionTrigger = $('.js_sumbit_new_element');
    t.removeControl = $('.js_remove_core_element');
  }

  controlStartupInit() {
    var t = this;
    t.fillMothersList(layoutBuilderOptions.options.coreStructureElements.defaultMotherElement);
  }

  clearPreviewArea() {
    $('#structure-content').empty();
  }

  userInputListener() {
    var t = this;
    t.userInteractionTrigger.on('click', function () {
      eventDirector.userInteraction();
    });
  }

  removeInputListener() {
    var t = this;
    t.removeControl.on('click', function () {
      eventDirector.removeInteraction();
    });
  }

  //provisory class aray area
  fillProvisoryClassArray() {
    var t = this;
    t.classSubmit.on('click', function () {
      var newProvisoryClass = t.classControl.val();
      console.log('val' + newProvisoryClass);
      dataTranslator.setItemToProvisoryClassHolder(newProvisoryClass);
      console.log('provisory' + dataTranslator.provisoryClassHolder);
      propsPanelUI.rerenderCustomProps();

    });
  }

  clearProvisoryClassArray() {
    var t = this;
    var arrayToClear = dataTranslator.provisoryClassHolder;
    arrayToClear.splice(0);
    propsPanelUI.rerenderCustomProps();
  }

  //provisory class aray area

  getStructureEntityName() {
    var t = this;
    var structureEntityName = t.nameControl.val();
    return structureEntityName;
  }

  getMotherName() {
    var t = this;
    var mothersName = t.motherControl.val();
    return mothersName;
  }

  switchToStandardMode() {
    var t = this;
    t.userInteractionTrigger.text('ADD');
  }

  switchToEditMode() {
    var t = this;
    t.userInteractionTrigger.text('SET');
  }

  getEditUserData() {
    var t = this;
    var existingStructureEntity = editPanelUI.getCurrentActiveItem();
    // existingStructureEntity.setMotherStructure(t.getMotherElement());
    dataTranslator.provisoryToCoreSwap(existingStructureEntity.classArray, dataTranslator.provisoryClassHolder);
  }

  getUserData() {
    var t = this;
    var newStructureEntity = new StructureEntity();
    newStructureEntity.setcoreID(stateManager.getUniqueIntentifier());
    newStructureEntity.setVersionID(stateManager.getCurrentVersion());
    newStructureEntity.setType('div');
    dataTranslator.provisoryToCoreSwap(newStructureEntity.classArray, dataTranslator.provisoryClassHolder);
    newStructureEntity.pushToAttrMap(stateManager.getUniqueIntentifier(), 'aireemDA');
    newStructureEntity.setMotherStructure(t.getMotherElement());
    historyMem.immutableArrayStamp(dataTranslator.coreStructureHolder,newStructureEntity);
    eventDirector.saveNewStructureEntity(newStructureEntity);
  }

}
