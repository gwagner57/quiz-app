const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));


let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuesions = [];
let MAX_Questions = 3;
const selectedChoice = "";
let classToApply = "";


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
    availableQuesions = [...questions]
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuesions.length === 0 || questionCounter >= MAX_Questions) {
        return window.location.assign("end.html");
    }
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })

    availableQuesions.splice(questionIndex,1);
    acceptingAnswers = true
};



choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];


        if(selectedAnswer == currentQuestion.answer) {
            classToApply = "correct";
        } else {
            classToApply = "incorrect";
        }
        console.log(classToApply)
        selectedChoice.parentElement.classList.add(classToApply);
        document.getElementById("next").onclick = () => {
            getNewQuestion();
            selectedChoice.parentElement.classList.remove(classToApply);
        }
    });

});










