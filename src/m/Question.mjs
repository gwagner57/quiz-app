import eNUMERATION from "../../lib/eNUMERATION.mjs";
const QuestionTypeEL = new eNUMERATION("QuestionTypeEL", ["multichoice","shortanswer","numerical"]);

class Question {
    constructor({id, type, topic, questionText, hasManyCorrectAnswers, answerOptions}) {
      this.id = id;
      this.type = type;
      this.topic = topic;
      this.questionText = questionText;
      this.hasManyCorrectAnswers = hasManyCorrectAnswers;
      this.answerOptions = answerOptions;
    }
}

export default Question;