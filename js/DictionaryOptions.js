  class DictionaryOptions {
  constructor() {
    this.options = this.getDictionaryOptions();
  }

  getActiveDictionaryContext() {
    var t = this;
    var activeOptions = t.getDictionaryOptions();
    var activeDictionary = ['HTML5'];
    var dictionaryContext = activeOptions[activeDictionary]['tags'];
    return dictionaryContext;
  }

//vymyslet nejakej hustje dictionary system a pak to brutalne ostylovzt a oscsskovat

  getDictionaryOptions() {
    var dictionaryOptions = {
      HTML5: {
        tags:
        [
          [
            'div','<div class="','</div>'
          ],
          [
            'img','<img>','</img>'
          ]
        ]
      }
    }
    return dictionaryOptions;
  }

}
