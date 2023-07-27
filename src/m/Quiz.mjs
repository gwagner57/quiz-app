import Question from "./Question.mjs";

class Quiz {
    constructor({id, title, titleTextItem, questions=[], availableLanguages=[]}) {
      this.id = id;
      this.title = title;
      if (titleTextItem) this.titleTextItem = titleTextItem;
      this.questions = questions;
      this.availableLanguages = availableLanguages;
    }

    //Todo
    async loadQuestions(){
      try {
        const questionRecords = (await fetch("../../data/questions.json")).json()
        this.questions = questionRecords.map( questRec => new Question( questRec));
      } catch (error) {
        console.error( error.name +": "+ error.message);
      }
    }
}

export default Quiz;