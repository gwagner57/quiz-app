// app.mjs
import Quiz from "./Quiz.mjs"; // Import the Quiz class

// Create an instance of the Quiz class
const quizInstance = new Quiz({
    // Initialize quiz properties
      "id": 1,
      "title": "Quiz 1",
      "titleTextItem": "",
      "questions": [1,2,3],
      "availableLanguages": ""
  });
   const response = await clearfetch("./questions.json");
      const questionRecords = await response.json();
  console.log (response);
// Now you can use the quizInstance or call its methods
