import store from '../store/index.js';

var template = document.createElement('template')
template.innerHTML= `
    <link rel="stylesheet" href="../../v/css/main.css" />
    <div class="start_page">
        <img alt = "logo" height="65" width ="65" src ="../../../src/resources/logo.svg"/>
        <input class="start_element name" type="text" id="fname" name="fname" placeholder="Enter your name">
        <button class="start_element start">Start Quiz</button>
    </div>
    
`

class StartQuiz extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    initializeQuiz(){
        const name = this.shadowRoot.querySelector(".name").value;
        store.dispatch('startQuiz', { name });
    }

    connectedCallback(){
        this.shadowRoot.querySelector(".start").addEventListener('click', () => this.initializeQuiz())
    }
    disconnectedCallback(){
        this.shadowRoot.querySelector('.start').removeEventListener()
    }
}

window.customElements.define('start-quiz', StartQuiz)