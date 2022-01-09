const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById("questionCounter");

let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];
let MAX_Questions = 10;
const selectedChoice = "";
let classToApply = "";
let endScore = 0;
let questionsIndex = 0;
let questions = [];

fetch("../questions.json").then(res => {
        return res.json();
    }).then(loadedQuestions => {
        console.log(loadedQuestions);
        questions = loadedQuestions;
        startQuizz();
    }).catch(err => {
        console.log(err);
})

startQuizz =() => {
    availableQuestions = [...questions]
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_Questions) {
        return window.location.assign("end.html");
    }

    let checkboxes = document.querySelectorAll('input[name=test]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    })

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_Questions;
    console.log(questionsIndex);
    currentQuestion = availableQuestions[questionsIndex];
    console.log(currentQuestion);
    question.innerText = currentQuestion.question;
    questionsIndex++;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })

};

getPreviousQuestion = () => {
    if(questionCounter === 1) {
        return;
    }
    questionsIndex--;
    questionCounter--;
    questionCounterText.innerText = questionCounter + "/" + MAX_Questions;
    console.log(questionsIndex-1);
    currentQuestion = availableQuestions[(questionsIndex)-1];
    console.log(currentQuestion);
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })
    acceptingAnswers = true
}

let next = document.getElementById("next");
let previous = document.getElementById("previous");

if(next) {
    next.addEventListener("click", e => {
        console.log("test");
        getNewQuestion();
    });
}

if(previous) {
    previous.addEventListener("click", e => {
        console.log("test2");
        getPreviousQuestion();
    });
}





// choices.forEach(choice => {
//     choice.addEventListener("click", e => {
//         if(!acceptingAnswers) return;
//
//         acceptingAnswers = false;
//         const selectedChoice = e.target;
//         const selectedAnswer = selectedChoice.dataset["number"];
//
//
//         if(selectedAnswer == currentQuestion.answer) {
//             classToApply = "correct";
//             endScore++;
//         } else {
//             classToApply = "incorrect";
//         }
//         console.log(classToApply)
//         selectedChoice.parentElement.classList.add(classToApply);
//         document.getElementById("next").onclick = () => {
//             getNewQuestion();
//             selectedChoice.parentElement.classList.remove(classToApply);
//         }
//     });
//
// });










