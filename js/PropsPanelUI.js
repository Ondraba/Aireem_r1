class PropsPanelUI{
    constructor() {
        //options
        this.localPropsPanelOptions = propsPanelOptions;

        //cross class instances
        this.dataTranslator = dataTranslator;
        this.stateManager = stateManager;
        this.favourites = propsPanelOptions.getPropsPanelOptions().creativeArea.favourites;

        //constructed areas
        this.propsPanelMain = null;
        this.customPropsPanel = null;

        //constructed controlls
        this.propsManipulator = null;

        //init methods and listeners
        this.propsInit();
    }

   propsInit(){
     var t = this;
     t.propsPanelAreas();
     t.fillPropsPanel();
     t.propsPanelReaction();
     t.customPropsPanelReaction();
   }

  propsPanelAreas(){
    var t = this;
    //areas
    t.propsPanelMain = $('.favourites-area');
    t.customPropsPanel = $('.custom-props-area');
    //controlls
    t.propsManipulator = ".standard-props-box";
    t.customPropsManipulator =  ".custom-props-box";
  }


  newPropertyHTML(appendArea, secondLevelObj, item, source, baseClass, version){
    var t = this;
    var newProp =  $(document.createElement('div'));
    var newPropText =  $(document.createElement('span'));
      newProp.addClass(baseClass.replace('.',''));
      newProp.attr('versionID', version);
    if(secondLevelObj != 'none'){
      newPropText.text(source[secondLevelObj][item]);
      }
    else{
      newPropText.text(item);
    }
      newProp.append(newPropText);
      appendArea.append(newProp);
  }

  fillPropsPanel(){
      var t = this;
      var activeProps = t.localPropsPanelOptions.getActiveProps();
      if (activeProps.length != 0){
      for(let secondLevelObj of activeProps){
          if (t.favourites[secondLevelObj].length != 0){
            for(let i = 0; i < t.favourites[secondLevelObj].length; i++){
              t.newPropertyHTML(t.propsPanelMain, secondLevelObj, i, t.favourites, t.propsManipulator, 'beforeVersionConfirm');
              }
        }
          else throw new Error('There is some inconsistency in PropsPanelOptions setting');
      }
    }
    else  throw new Error('There are no favourites selected in PropsPanelOptions');
  }


  propsPanelReaction(){
        var t = this;
        $(document).on('click',t.propsManipulator,function (){
          var propertyValue = $(this).children('span').text();
          var editModeState = t.stateManager.getCurrentEditModeState();
          console.log('klik');
            if(editModeState == null){
              throw new Error('There is some error in State Manager processing.');
            }
            else if (editModeState == false) {
              t.propertySelected(propertyValue, 'Before confirm version release.');
            }
            else{
              t.propertySelected(propertyValue,t.stateManager.getGlobalVersionRelease());
            }
        });
  }

  customPropsPanelReaction(){
    var t = this;
    $(document).on('click',t.customPropsManipulator,function (){
      var customPropsElement =  $(this);
      var propertyValue = $(this).children('span').text();
      var editModeState = t.stateManager.getCurrentEditModeState();
      for(var i = 0; i < t.dataTranslator.provisoryClassHolder.length; i++){
        if (t.dataTranslator.provisoryClassHolder[i] == propertyValue){
          t.dataTranslator.provisoryClassHolder.splice(i,1);
        }
        else{
          throw new Error('There is something wrong between provisoryClassHolder and UI.');
          }
      }
    });
  }


  propertySelected(propertyValue, version){
    var t = this;
    t.dataTranslator.setItemToProvisoryClassHolder(propertyValue);
    t.rerenderByNewProperty(version);
  }

  customPropertyAreaClear(){
    var t = this;
    t.customPropsPanel.empty();
  }

  rerenderByNewProperty(version){
    var t = this;
    t.customPropertyAreaClear();
    for(let item of t.dataTranslator.provisoryClassHolder){
      t.newPropertyHTML(t.customPropsPanel, 'none', item, t.dataTranslator.provisoryClassHolder, t.customPropsManipulator, version);
    }
  }

}
