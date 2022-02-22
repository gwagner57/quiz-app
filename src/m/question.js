
export default class Question {
    constructor(id, type, category, text, hasManyCorrectAnswers, answerOptions) {
      this.id = id;
      this.type = type;
      this.category = category;
      this.text = text;
      this.hasManyCorrectAnswers = hasManyCorrectAnswers;
      this.answerOptions = answerOptions;
    }
}