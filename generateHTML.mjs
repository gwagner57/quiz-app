import { promises as fsPromises } from "fs";
import Quiz from "./Quiz.mjs"; // Import the Quiz class
async function generateQuizHTML() {
  const quiz = new Quiz({
    // Initialize quiz properties
    /*"id": 1,
      "title": "Quiz 1",
      "titleTextItem": "",
      "questions": [1,2,3],
      "availableLanguages": "" */
  });

  await quiz.loadQuestions(); // Load question data

  let quizHTML = `<html>
    <head>
      <title>${quiz.title}</title>
    </head>
    <body>
      <h1>${quiz.title}</h1>
      <div id="quiz-container">`;

  // Iterate through questions and generate HTML
  quiz.questions.forEach((question, index) => {
    quizHTML += `<div class="question">
        <h3>Question ${index + 1}</h3>
        <p>${question.questionText}</p>`;

    if (question.type === "multichoice") {
      question.answerOptions.forEach((option, optionIndex) => {
        quizHTML += `<label>
            <input type="radio" name="q${index}" value="${optionIndex}">
            ${option}
          </label>`;
      });
    } else if (question.type === "numerical" || question.type === "shortanswer") {
      quizHTML += `<input type="text" name="q${index}" placeholder="Your answer">`;
    }

    quizHTML += "</div>";
  });

  quizHTML += `</div>
    </body>
  </html>`;

  // Write the generated HTML to an output file
  await fsPromises.writeFile("output.html", quizHTML, "utf-8");

  console.log("Static HTML generated successfully!");
}

generateQuizHTML();
