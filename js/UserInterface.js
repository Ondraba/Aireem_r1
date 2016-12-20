class UserInterface {
    constructor() {
      this.guiInit();
      this.getElement();
      this.summonStructureVendor();
      this.newElementNamesArray= [];
      this.newElementClassArray = [];
      this.localAppOptionsInstance = appOptionsInstance;
      this.newDataAttrArray = [];
      this.fillCreativeArea();
      this.getFavourites();
      this.removeFromElementMask();
      this.returnProps();
      this.GUIcounter = 0;
    }


     guiInit(){
       var defaultMother =  elementOptionsInstance.options.elementInheritence.defaultStructureRoot;
       $('.js_input-mother-select-list').append(("<option value='" + defaultMother + "'>" + defaultMother + "</option>"));
     }

     GUIcounterInc(){
         var t = this;
         t.GUIcounter++;
         return t.GUIcounter;
     }

     fillCreativeArea(){
       var t = this;
       var favouritesArea = $('.favourites-area');
       var favourites = t.localAppOptionsInstance.options.creativeArea.favourites;
       t.fillXs(favouritesArea, favourites);
       t.fillSm(favouritesArea, favourites);
     }

     fillXs(favouritesArea, favourites){
       for(var i = 0; i < favourites.xsGrid.length; i++){
       var newFavouriteBox = $(document.createElement('div'));
       newFavouriteBox.addClass('standard-favourite-box');
       newFavouriteBox.addClass('xs');
       var newFavouriteBoxText = $(document.createElement('span'));
       newFavouriteBoxText.text(favourites.xsGrid[i]);
       newFavouriteBox.append(newFavouriteBoxText);
       favouritesArea.append(newFavouriteBox);}
     }

     fillSm(favouritesArea, favourites){
       for(var i = 0; i < favourites.smGrid.length; i++){
       var newFavouriteBox = $(document.createElement('div'));
       newFavouriteBox.addClass('standard-favourite-box');
       newFavouriteBox.addClass('sm');
       newFavouriteBox.addClass('sm');
       var newFavouriteBoxText = $(document.createElement('span'));
       newFavouriteBoxText.text(favourites.smGrid[i]);
       newFavouriteBox.append(newFavouriteBoxText);
       favouritesArea.append(newFavouriteBox);}
     }


     getElement(){
       var t = this;
       $('.js_class-button').on('click', function()
       {
         if ($('.js_class-input').val() != '') {
          var elementClass= $('.js_class-input').val();
          t.createElementMask(elementClass);
          $('.js_class-input').val('');
            }
         });
       }

       getFavourites(){
           var t = this;
           $(document).on("click",".standard-favourite-box", function ()
           {
           t.createElementMask($(this).children('span').text());
           });
       }

       elementEfects(){
           $('#structure-content').each(function () {
              $(this).children('div').css('border','1px solid black');
           });
       }




     createElementMask(elementClass){
       var t = this;
       t.pushToArray(elementClass, t.newElementClassArray)
       t.pushItemToSelectList(elementClass, $('.js_input-class-select-list'));
       var newReviewBox = $(document.createElement('div'));
       newReviewBox.addClass('reviewBox');
       newReviewBox.css('background-color', helpersInstnace.getRandomColor());
       newReviewBox.css('height', elementOptionsInstance.options.structureMapOptions.height);
       var newReviewBoxText = $(document.createElement('span'));
       newReviewBoxText.text('.'+ elementClass);
       t.pushToArray('dataElemMask', t.newDataAttrArray);
       newReviewBox.attr('dataElemMask', t.GUIcounter);
       newReviewBox.append(newReviewBoxText);
       elementOptionsInstance.options.elementInheritence.defaultMaskRoot.append(newReviewBox);
     }

     removeFromElementMask(){
       var t = this;
         var childrenClass = '';
         var maskHolder = '';
       $(document).on('click','.reviewBox',function () {
       maskHolder =  $(this).attr('dataelemmask');
           console.log(maskHolder);
       childrenClass =  $(this).children('span').text();
        for(var i = 0; i < t.newElementClassArray.length; i++){
        if($(this).children('span').text() == '.' + t.newElementClassArray[i]){
          $(this).remove();
         t.newElementClassArray.splice(i, 1);
        }
             $('.aireemContainer').each(function () {
                 for (var i = 0; i < structureVendorInstance.elementsArray.length; i++){
                     for (var x = 0; x < structureVendorInstance.elementsArray[i].classArray.length; x++){
                     if($(this).attr('aireemid') == maskHolder){
                         console.log(structureVendorInstance.elementsArray[i].classArray[x]);
                         if(childrenClass == '.' + structureVendorInstance.elementsArray[i].classArray[x]){
                            structureVendorInstance.elementsArray[i].classArray.splice(x,1);
                             var childrenClassClear = childrenClass.replace(/\./g, '' );
                             $(this).removeClass(childrenClassClear);
                         }
                     }
                         }
                     }
             });
       }
     });
   }




   returnProps(){
     var t = this;
     $(document).on('click','.aireemContainer',function () {
       $('.element-review').html('');
       for(var i = 0; i < structureVendorInstance.elementsArray.length; i++){
       var classItem =  structureVendorInstance.elementsArray[i];
       if($(this).attr('aireemid') == classItem.getAireemID()){
          $('.js_name-input').val(classItem.getName());
         for(var x = 0; x < classItem.getClassArray().length; x++){
          t.createElementMask(classItem.getClassArray()[x]);
         }
        }
       }
     });
   }

     pushToArray(value, array){
       var t = this;
       array.push(value);
     }

     pushItemToSelectList(value, selectList){
          selectList.append("<option value='" + value+ "'>" + value + "</option>")
     }

     emptyMask(){
          var t = this;
          t.newElementNamesArray.splice(0);
          t.newElementClassArray.splice(0);
          $('.element-review').empty();
          $('.js_name-input').val('');
     }


     summonStructureVendor(){
       var t = this;
       $('.js_sumbit_new_element').on('click', function()
       {
         var elementName = $('.js_name-input').val();
         if(elementName != '') {
         if (structureVendorInstance.elementsArray.length > 0){
            t.newVerifiedStructure(elementName);
          }
          else {
            t.newStructure(elementName);
          }
          t.elementEfects();
          t.emptyMask();
          }
        });
      }

      newStructure(elementName){
            var t = this;
            t.GUIcounterInc();
              t.pushItemToSelectList(elementName, $('.js_input-mother-select-list'));
              var elementClassArray= t.newElementClassArray;
              var elementAttrArray = t.newDataAttrArray;
              var elementMother=$('.js_input-mother-select-list').val();
              structureVendorInstance.createElement(
                   elementName,
                   elementClassArray,
                   elementAttrArray,
                   elementMother
                 );
            }

      newVerifiedStructure(elementName){
        var t = this;
        var alreadyCreated = false;
        for(var i = 0; i < structureVendorInstance.elementsArray.length; i++){
             var elementItem = structureVendorInstance.elementsArray[i];
              if (elementName == elementItem.getName()){
                alreadyCreated = true;
                t.editExistingStructure(elementItem);
              }
            }
            if (!alreadyCreated){
              t.newStructure(elementName);
            }
          }

        editExistingStructure(elementItem){
          var t = this;
          $('#structure-content').each(function (){
              var diffChildren = $(this).children('div');
              if (elementItem.getAireemID() == diffChildren.attr('aireemid')){
                  console.log(elementItem.getAireemID());
                  console.log($(this).children('div').attr('aireemid'));
                  var difference = t.newElementClassArray.filter(x => elementItem.getClassArray().indexOf(x) == -1);
                      for (var i = 0; i < difference.length; i++){
                          diffChildren.addClass(difference[i]);
                          elementItem.setClass(difference[i]);
                          console.log(difference);
                      }
            }
        });
        }


     editCreatedByVendor(){
     }


     rerenderByExists(){
     }



   }
