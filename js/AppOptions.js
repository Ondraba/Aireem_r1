class AppOptions{
    constructor() {

    this.options = this.getAppOptions();
    }

getAppOptions(){
    var appOptions = {
      creativeArea :
      {
        favourites:{
        xsGrid:  [
            'col-xs1',
            'col-xs-2',
            'col-xs-3',
            'col-xs-4',
            'col-xs-5',
            'col-xs-6',
            'col-xs-7',
            'col-xs-8',
            'col-xs-9',
            'col-xs-10',
            'col-xs-11',
            'col-xs-12'
          ],
        smGrid:  [
            'col-sm-1',
            'col-sm-2',
            'col-sm-3',
            'col-sm-4',
            'col-sm-5',
            'col-sm-6',
            'col-sm-7',
            'col-sm-8',
            'col-sm-9',
            'col-sm-10',
            'col-sm-11',
            'col-sm-12'
          ]
        }
      }
  }
  return appOptions;
}

}
