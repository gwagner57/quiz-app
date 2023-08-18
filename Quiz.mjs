import Question from "./Question.mjs";
import fs from "fs/promises";

class Quiz {
    constructor({id, title, titleTextItem, questions=[], availableLanguages=[]}) {
      this.id = id;
      this.title = title;
      if (titleTextItem) this.titleTextItem = titleTextItem;
      this.questions = questions;
      this.availableLanguages = availableLanguages;
    }

    //Todo
    async loadQuestions() {
      try {
        const fileContent = await fs.readFile("./questions.json", "utf-8");
        const questionRecords = JSON.parse(fileContent);
        this.questions = questionRecords.map(questRec => new Question(questRec));
      } catch (error) {
        console.error(error.name + ": " + error.message);
      }
    }

    
}

export default Quiz;
