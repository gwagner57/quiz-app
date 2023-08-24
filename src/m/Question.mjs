import eNUMERATION from "../../lib/eNUMERATION.mjs";
const QuestionTypeEL = new eNUMERATION("QuestionTypeEL", ["multichoice","shortanswer","numerical"]);

class Question {
    constructor({id, name, topic, type, questionText, questionTextItem,
                  generalFeedback, generalFeedbackTextItem, hasManyCorrectAnswers,
                  answerOptions, caseMustMatch,
                  correctAnswers, partiallyCorrectAnswers, correctNumericalAnswer}) {
      this.id = id;
      this.name = name;
      this.topic = topic;
      this.type = type;
      this.questionText = questionText;
      if (questionTextItem) this.questionTextItem = questionTextItem;
      this.generalFeedback = generalFeedback;
      if (generalFeedbackTextItem) this.generalFeedbackTextItem = generalFeedbackTextItem;
      this.hasManyCorrectAnswers = hasManyCorrectAnswers;
      this.answerOptions = answerOptions;  // for multi-choice questions
      if (caseMustMatch) this.caseMustMatch = caseMustMatch  // for short answer questions
      if (correctAnswers) this.correctAnswers = correctAnswers;  // for short answer questions
      if (partiallyCorrectAnswers) this.partiallyCorrectAnswers = partiallyCorrectAnswers;  // for short answer questions
      if (correctNumericalAnswer) this.correctNumericalAnswer = correctNumericalAnswer;  // for numerical questions
    }
}

export default Question;