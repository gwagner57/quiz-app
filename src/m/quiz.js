import Question from "./question";
import QuestionTypeEl from "./questionTypeEl";

export class Quiz {
    constructor(id, title) {
      this.id = id;
      this.title = title;
      this.questions = [];
    }

    //Todo
    async loadQuestions(){
      try {
        const questions = (await fetch("../questions.json")).json()
        const map1 = questions.map(question => new Question(question.id,));
      } catch (error) {
        
      }
      
  
    }

    static createQuestion(question){

      const options = [];
      const index = 0;
      for (const [key, value] of Object.entries(question)) { 
        if(key.includes()){

        }
      }
      constquestion = new Question(question.id, QuestionTypeEl.MULTIPLE_CHOICE, null, question.question,)
    }
}