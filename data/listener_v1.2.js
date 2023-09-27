document.addEventListener("DOMContentLoaded", function () {
    // Function to collect user inputs and checked checkboxes

const resultsContainer = document.getElementById('results-container');



function all(){

  
  

// Get the number of questions by counting the <div> elements with IDs q0, q1, q2, etc.
const numberOfQuestions = document.querySelectorAll('div[id^="q"]').length;

//console.log('Number of questions:', numberOfQuestions);







function collectUserInputs() {
  const userInputArrays = {}; // Object to store user inputs for each question ID

  // Iterate through each question div (q0, q1, q2, q3, q4, etc.)
  for (let i = 0; i <numberOfQuestions; i++) {
    const questionId = `q${i}`;
    const questionDiv = document.getElementById(questionId);

    // Find all input elements within the question div
    const inputElements = questionDiv.querySelectorAll('input[type="txt"], input[type="text"], input[type="checkbox"]:checked');
    
     // Initialize an array for the current question ID
    userInputArrays[questionId] = [];



    // Iterate through the input elements and add them to the array
    inputElements.forEach((inputElement) => {
      const inputType = inputElement.type;
      const inputName = inputElement.name;
      const inputValue = inputElement.value;

      // Create an object to represent the input and add it to the array
      const userInput = {
        type: inputType,
        name: inputName,
        value: inputValue,
        Id: i,
      };

      userInputArrays[questionId].push(userInput);
    });
  }

  // Display the collected user inputs in the console
  //console.log(userInputArrays);
	return userInputArrays;
  // You can perform further processing or send the data to a server here
}


const userInputArrays = collectUserInputs();



//console.log(userInputArrays);
var originalURL = window.location.href;




// URL of the JSON file you want to load
const jsonFileURL = originalURL.replace(".html", ".json");

console.log(window.location.href);



// Function to fetch JSON data and return it as a Promise
function fetchJSONData(jsonFileURL) {
  return fetch(jsonFileURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}
 //let score =0;



// Function to decode HTML entities
function decodeHTMLEntities(input) {
  const parser = new DOMParser();
  const decodedDocument = parser.parseFromString(input, 'text/html');
  return decodedDocument.documentElement.textContent;
}

fetchJSONData(jsonFileURL)
  .then(jsonData => {
    // Now you can use jsonData as the JSON data returned from the function
    //console.log(jsonData);
    //return jsonData;
    
    
    
    
		// Function to replace HTML entities
		function replaceHtmlEntities(data) {
		  if (typeof data === 'string') {
		    // Replace HTML entities with their corresponding symbols
		    data = data.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
		  } else if (typeof data === 'object') {
		    // Recursively replace HTML entities in nested objects and arrays
		    for (const key in data) {
		      if (data.hasOwnProperty(key)) {
			data[key] = replaceHtmlEntities(data[key]);
		      }
		    }
		  }
		  return data;
		}

		// Replace HTML entities in the JSON data
		const convertedData = replaceHtmlEntities(jsonData);

		//console.log(convertedData);
    
    
    
    
    
    
    
    
    
    
    
    
    
   // let Id = userInputArray[0].Id;
    let score =[0,0,0,0,0];
    convertedData.forEach(question => {
    const type = question.type;
    
    //console.log(type);
    if (type === 'multichoice'){
    const answers = question.answer;
    //console.log(answers);
    answers.forEach(answerr => {
    //console.log(question.name[0].value);
    //console.log(answer.attributes.fraction);
    //console.log(answerr.value);
    for (let i = 0; i <numberOfQuestions; i++) {
    const questionId = `q${i}`; 
    const userInputArrayForQuestion = userInputArrays[questionId];
    if (userInputArrayForQuestion.length > 0) {
  	const firstName = userInputArrayForQuestion[0].name; // Access the name property of the first element
  	//console.log("Name of the first input for question", questionId, ":", firstName);
    
    
    
    if (userInputArrayForQuestion[0].name === question.name[0].value){
    console.log(userInputArrayForQuestion[0].name);
    for (let j = 0; j <userInputArrayForQuestion.length;j++){
     if(userInputArrayForQuestion[j].value === answerr.value){
     //console.log(userInputArray[i].value);
     //console.log(answerr.attributes.fraction);
     //console.log(answerr.attributes.fraction);
     score[i] += parseInt(answerr.attributes.fraction);
     console.log(score[i]);
     }}
     //else{
     //score[i] = parseInt(answerr.attributes.fraction);
     //}
     //Id = userInputArray[i].Id

     }
    
    
    
    
    
    
    
    
    } 
    else {
  	console.log("No user inputs for question", questionId);
    }
     
    //console.log(userInputArray[i].name)
    //console.log(question.name[0].value)
    } })

    }
    

    })

//});
    

  //console.log(Id);
                        console.log(score);
    
    
    let result = 0;
    for(let i=0; i <score.length; i++){
    if (score[i]>0){
    result += score[i];
    }}
    
    const resultsPage = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Quiz Results</title>
                <link rel="stylesheet" type="text/css" href="https://rawcdn.githack.com/gwagner57/quiz-app/main/data/css/Quiz_results.css?token=GHSAT0AAAAAACFSDHPIVJYJNPS5BC6GB5HUZIUQNOQ">
            </head>
            <body>
            <div class="container" id="container">
                <h1>Quiz Results</h1>
                <p>Your Score: ${result/100} Out of ${numberOfQuestions}</p>
                <!-- You can include more details about the results here -->
            </div>
            </body>
            </html>
        `;

        // Open the results page in a new window/tab
        const resultsWindow = window.open('', '_blank');
        resultsWindow.document.open();
        resultsWindow.document.write(resultsPage);
        resultsWindow.document.close();


    
    
 
    
    
    
    
    
    
    
    
    
    
    
    
    

    // You can perform further processing with jsonData here
  })

  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
































}
















// Add an event listener to the Submit button to trigger data collection
const submitButton = document.getElementById("Submit");
submitButton.addEventListener("click", all);

    
    
    
    
    
    
    
    
    
    
    
    
    
    /*
    const quizContainer = document.getElementById("container");
    const submitButton = document.getElementById("Submit");
    const element = document.querySelector('.container>h1');
    const jsonName = fileNameDisplay.textContent+".json";
    submitButton.addEventListener("click", async function () {
      const response = await fetch(jsonName); // Replace with the actual path to your JSON file
      const questions = await response.json();
      const userAnswers = [];
  	//console.log(questions);
      // Loop through the questions and collect user answers
      questions.forEach((question, index) => {
        const questionElement = quizContainer.querySelector(`[name="q${index}"]`);
        if (question.type === "multichoice") {
            //console.log("questiontype = "+question.type);
          const selectedOption = quizContainer.querySelector(`input[name="q${index}"]:checked`);
          console.log("radio ="+selectedOption);
          if (selectedOption) {
            userAnswers.push(selectedOption.value);
          } else {
            userAnswers.push(null);
          }
        } else {
          userAnswers.push(questionElement.value);
        }
      });
      
      console.log(userAnswers);

      /*
      console.log(userAnswers);
      // Compare user answers with correct answers and calculate score
      let score = 0;
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].type === "multichoice") {
          if (userAnswers[i] === questions[i].correctAnswerIndex.toString()) {
            score++;
          }
        } else {
          if (userAnswers[i] === questions[i].correctAnswer.toString()) {
            score++;
          }
        }
      }
      // Display the results in another HTML page
      const resultPage = `<html>
        <head>
          <title>Quiz Result</title>
          <link rel="stylesheet" href="../docs/Quiz.css" />
        </head>
        <body>
        <dev class="container">
          <h1>Your Quiz Result</h1>
          <p>You scored ${score} out of ${questions.length}.</p>
        </div>
        </body>
      </html>`;
  
      // Open the result in a new window
      const resultWindow = window.open("", "_blank");
      resultWindow.document.write(resultPage);        */
    }); 
  //});
  
