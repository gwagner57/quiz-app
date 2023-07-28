import eNUMERATION from "../../lib/eNUMERATION.mjs";
const LanguageEL = new eNUMERATION("LanguageEL", {"en":"English","de":"German","fr":"French","es":"Spanish",
  "it":"Italian","pt":"Portugese","gr":"Greek","pl":"Polish"});

class TextItem {
  constructor({id, textItemNumber, language, text}) {
    this.id = id;  // positive Integer
    this.textItemNumber = textItemNumber;  // positive Integer
    this.language = language;  // positive Integer corresponding to LanguageEL
    this.text = text;
  }
  static instances = {};  // a map from language codes to maps from text item numbers to texts
  //Todo
  async loadTextItemsByLanguage( language){
    try {
      const langCode = LanguageEL.enumLitNames[language-1],
            textItemRecords = (await fetch(`../../data/textItems_${langCode}.json`)).json()
      for (const txtItemRec of textItemRecords) {
        TextItem.instances[langCode][txtItemRec.textItemNumber] = txtItemRec.text;
      }
    } catch (error) {
      console.error( error.name +": "+ error.message);
    }
  }
}

export default TextItem;