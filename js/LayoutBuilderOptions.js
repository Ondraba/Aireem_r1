class LayoutBuilderOptions{
    constructor() {
    this.options = this.getOptions();
    }

getOptions(){
    var options = {
      coreStructureElements :
        {
          defaultMotherElement: 'structure-content'
        }
      }
  return options;
}

}
