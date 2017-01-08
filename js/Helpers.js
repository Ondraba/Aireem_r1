class Helpers {
    constructor() {
      console.log(this.getArrayDiff)
    }

  randomizeNumber(min, max){
    var randomResult = Math.floor((Math.random() * max) + min);
    return randomResult;
  }


arrayCompare(arr1,arr2){
 var diffArray = arr1.filter(x => arr2.indexOf(x) < 0 );
 return diffArray;
}

  getRandomColor(){
    var randomInput = this.randomizeNumber(1,6);
    var colorResult = '';

    switch (randomInput) {

      case 1:
        colorResult = 'orange';
        break;

      case 2:
        colorResult = 'blue';
        break;

      case 3:
        colorResult = 'yellow';
        break;

      case 4:
        colorResult = 'grey';
        break;

      case 5:
        colorResult = 'green';
        break;

      case 6:
        colorResult = 'white';
        break;

      default: colorResult = 'white';

    }

    return colorResult;
  }

  }
