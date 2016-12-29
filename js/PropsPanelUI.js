class PropsPanelUI{
    constructor() {
        this.localPropsPanelOptions = propsPanelOptions;
        this.propsPanelMain = null;
          this.propsPanelAreas();
        this.favourites = propsPanelOptions.getPropsPanelOptions().creativeArea.favourites;
        this.fillPropsPanel();
    }


  propsPanelAreas(){
    var t = this;
    t.propsPanelMain = $('.favourites-area');

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
      $(document).on('click','.standard-props-box',function () {
        console.log('render provisory buttons');
      });
  }

}
