var template = document.createElement('template')
template.innerHTML= `
    <link rel="stylesheet" href="../../v/css/main.css" />
    <div class="result_box">
        <div class="icon">
            <i class="fas fa-crown"></i>
        </div>
        <div class="complete_text">You've completed the Quiz!</div>
        <div class="score_text">
            <!-- Here I've inserted Score Result from JavaScript -->
        </div>
        <div class="buttons">
            <button class="restart">Replay Quiz</button>
            <button class="quit">Quit Quiz</button>
        </div>
    </div>
`

class QuizResults extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('quiz-results', QuizResults)