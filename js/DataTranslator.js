class DataTranslator {
    constructor() {
     this.coreStructureHolder = [];
     this.editActivation();
     this.editConfirm();
    }

    getCoreStructureHolder() {
     var t = this;
     return t.coreStructureHolder;
    }

    getSingleCoreStructureHolderItem(index){
      var t = this;
      return t.coreStructureHolder[index];
    }

    setItemToCoreStructureHolder(item){
      var t = this;
      t.coreStructureHolder.push(item);
    }



    rerenderPreview(){
      var t = this;
      interfaceManipulator.clearPreviewArea();
      for(let item of t.coreStructureHolder){
        var newPreviewElement = $(document.createElement('div'));
        newPreviewElement.attr('coreid', item.getCoreID());
        newPreviewElement.attr('id',item.getUniqeName());
        newPreviewElement.attr('versionID',item.getVersionID());
        if (item.getMotherStructure() == layoutBuilderOptions.options.coreStructureElements.defaultMotherElement){
        newPreviewElement.addClass('standardDiv');
        }
        else{
        newPreviewElement.addClass('innerDiv');
        }

        $(item.getMotherSelector()).append(newPreviewElement);
        console.log(item.getMotherSelector());
      }
    }

    editActivation(){
      var t = this;
      $(document).on('click','.standardDiv',function (){
          for(var i = 0; i < t.coreStructureHolder.length; i++){
              if (t.coreStructureHolder[i].getVersionID() == $(this).attr('versionID')){
                t.rerenderEditPanel(t.coreStructureHolder[i]);
                console.log('yes' + t.coreStructureHolder[i].getVersionID());
              }
            }
      });
    }

    rerenderEditPanel(coreElementToEdit){

      var t = this;
      interfaceManipulator.clearEditArea();
      for(let item of coreElementToEdit.classArray){
        console.log('edituji');
        var newEditPropsPanel = $(document.createElement('div'));
        var newEditPropsPanelText = $(document.createElement('span'));
        newEditPropsPanel.attr('versionID',coreElementToEdit.getVersionID());
        newEditPropsPanel.addClass('standard-favourite-box');
        newEditPropsPanelText.text(item);
        newEditPropsPanel.append(newEditPropsPanelText);
        $('.element-review').append(newEditPropsPanel);
      }
    }

    editConfirm(){
      var t = this;
        $(document).on('click','.standard-favourite-box',function (){
          for(var i = 0; i < t.coreStructureHolder.length; i++){
              if (t.coreStructureHolder[i].getVersionID() == $(this).attr('versionID')){
                for(var x = 0; x < t.coreStructureHolder[i].classArray.length; x++){
                  if( t.coreStructureHolder[i].classArray[x] == $(this).children('span').text()){
                  t.coreStructureHolder[i].classArray.splice(x,1);
                  t.rerenderEditPanel(t.coreStructureHolder[i]);
                  }
                }
                // t.rerenderEditPanel(t.coreStructureHolder[i]);
                // console.log('yes' + t.coreStructureHolder[i].getVersionID());
              }
            }
      });
    }

}
