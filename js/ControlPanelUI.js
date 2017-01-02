class ControlPanelUI {
    constructor() {
      this.nameControl = null;
      this.classControl = null;
      this.classSubmit = null;
      this.motherControl = null;
      this.userInteractionTrigger = null;
      this.localInitSettings();
    }

    localInitSettings() {
        var t = this;
        this.controlDefinition();
    }

    controlDefinition() {
        var t = this;
        t.nameControl = $('.js_name-input');
        t.classControl = $('.js_class-input');
        t.classSubmit = $('.js_class-button');
        t.motherControl = $('.js_input-mother-select-list');
        t.userInteractionTrigger  = $('.js_sumbit_new_element');
    }

    switchToEditMode(){
      var t = this;
      t.userInteractionTrigger.text('Editovat');
    }

  }
