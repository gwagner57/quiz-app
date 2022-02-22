var template = document.createElement('template')
template.innerHTML= `
    <link rel="stylesheet" href="css/main.css" />
    <div class="start_page">
        <img alt = "logo" height="65" width ="65" src ="resources/logo.svg"/>
        <input class="start_element" type="text" id="fname" name="fname" placeholder="Enter your name">
        <button class="start_element">Start Quiz</button>
    </div>
    
`

class StartQuiz extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('start-quiz', StartQuiz)