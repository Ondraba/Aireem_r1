class ElementOptions{
    constructor() {

    this.options = this.getElementOptions();

    }

getElementOptions(){
    var elementOptions = {
      basics :
        {
          height: 40,
        },

      structureMapOptions :
        {
          height: 30
        },

      elementInheritence :
        {
         defaultMaskRoot : $('.element-review'),
         defaultStructureRoot : 'structure-content'
        }

    }

    return elementOptions;
}


}
