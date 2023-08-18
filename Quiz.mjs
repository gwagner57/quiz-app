import Question from "./Question.mjs";
import fs from "fs/promises";
import { selectedQuizId } from "./generateHTML.mjs";

class Quiz {
    constructor({id, title, titleTextItem, questions=[], availableLanguages=[]}) {
      this.id = id;
      this.title = title;
      if (titleTextItem) this.titleTextItem = titleTextItem;
      //this.questionsIds = questionsIds;
      this.questions = questions;
      this.availableLanguages = availableLanguages;
    }

    //Todo
    async loadQuestions() {
      try {
        const quizfileContent = await fs.readFile("./Quiz.json", "utf-8");
        const quizRecords = JSON.parse(quizfileContent);
        //const selectedQuizId = 2; // Assume you want to select questions for quiz with id 1
        console.log(typeof selectedQuizId);
        // Find the selected quiz based on its id
        const selectedQuiz = quizRecords.find(Quiz => Quiz.id === selectedQuizId);
      
        if (!selectedQuiz) {
          console.log(`Quiz with id ${selectedQuizId} not found.`);
          return;
        }
        console.log(selectedQuiz);
        const questionsfileContent = await fs.readFile("./questions.json", "utf-8");
        const questionRecords = JSON.parse(questionsfileContent);
        // Filter questions based on the selected quiz's questionsIds
        this.questions = questionRecords.filter(question => selectedQuiz.questions.includes(question.id))
        .map(questRec => new Question(questRec));
        //console.log(this.questions);
      } catch (error) {
        console.error(error.name + ": " + error.message);
      }
    }

    
}

export default Quiz;
