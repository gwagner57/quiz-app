var template = document.createElement('template')
template.innerHTML= `
    <link rel="stylesheet" href="css/main.css" />
    <div class="info_box">
        <div class="info-title"><span>Quiz paused!</span></div>
        <div class="buttons">
            <button class="restart">resume</button>
            <button class="quit">Exit Quiz</button>
        </div>
    </div>
    
`

class Pause extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('start-quiz', StartQuiz)