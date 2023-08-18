import eNUMERATION from "./eNUMERATION.mjs";
const QuestionTypeEL = new eNUMERATION("QuestionTypeEL", ["multichoice","shortanswer","numerical"]);

class Question {
    constructor({id, name, topic, type, questionText, questionTextItem, hasManyCorrectAnswers, answerOptions}) {
      this.id = id;
      this.name = name;
      this.topic = topic;
      this.type = type;
      this.questionText = questionText;
      if (questionTextItem) this.questionTextItem = questionTextItem;
      this.hasManyCorrectAnswers = hasManyCorrectAnswers;
      this.answerOptions = answerOptions;
    }
}

export default Question;