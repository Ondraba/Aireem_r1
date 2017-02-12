  class DictionaryOptions {
  constructor() {
    this.options = this.getDictionaryOptions();
    this.contextMask = ['HTML5'];
  }

  getContextMask(){
    var t = this;
    return t.contextMask;
  }

  getActiveDictionaryContext(context) {
    var t = this;
    var activeOptions = t.getDictionaryOptions();
    var activeDictionary = context;
    var dictionaryContext = activeOptions[activeDictionary]['tags'];
    return dictionaryContext;
  }

  getActiveDictionaryHead(context){
    var t = this;
    var activeOptions = t.getDictionaryOptions();
    var activeDictionary = context;
    var dictionaryContext = activeOptions[activeDictionary]['declaration'];
    return dictionaryContext;
  }

//vymyslet nejakej hustje dictionary system a pak to brutalne ostylovzt a oscsskovat

  getDictionaryOptions() {
    var dictionaryOptions = {
      HTML5: {
        declaration:
        [
          [
            '<!DOCTYPE html>',
            '<html>',
            '<head>',
            '<title></title>',
            '</head>',
            '<body>'
          ],
          [
            '</body>',
            '</html>',
          ],

        ],
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
