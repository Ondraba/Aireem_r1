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
   }

  propsPanelAreas(){
    var t = this;
    //areas
    t.propsPanelMain = $('.favourites-area');
    //controlls
    t.propsManipulator = ".standard-props-box";
  }

  fillPropsPanel(){
      var t = this;
      var activeProps = t.localPropsPanelOptions.getActiveProps();
      if (activeProps.length != 0){
      for(let value of activeProps){
          if (t.favourites[value].length != 0){
            for(let i = 0; i < t.favourites[value].length; i++){
              var newProp =  $(document.createElement('div'));
              var newPropText =  $(document.createElement('span'));
                newProp.addClass('standard-props-box');
                newPropText.text(t.favourites[value][i]);
                newProp.append(newPropText);
                t.propsPanelMain.append(newProp);
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
          var editModeState = t.stateManager.getCurrentEditModeState();
          console.log('klik');
            if(editModeState == null){
              throw new Error('There is some error in State Manager processing.');
            }
            else if (editModeState == false) {
              t.dataTranslator.setItemToProvisoryClassHolder($(this).children('span').text());
            }

            else{
            }
        });
  }

}
