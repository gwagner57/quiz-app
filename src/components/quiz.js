


var template = document.createElement('template')
template.innerHTML= `
    <link rel="stylesheet" href="css/main.css" />
    <div class="quiz_page">
        <div class="quiz_header">
            <img alt = "logo" height="65" width ="65" src ="resources/logo.svg"/>
           
            <div class="quiz_header_timer">
                <div class="time_left_txt">Time Left</div>
                <div class="timer_sec">15:00</div>
            </div>
            
            <div class="quiz_header_progress-bar"></div>
        </div>
        <section>
            <div class="que_text">
                <!-- Here I've inserted question from JavaScript -->
            </div>
            <div class="option_list">
                <!-- Here I've inserted options from JavaScript -->
            </div>
        </section>

        <div class="quiz_footer">
            <button class="quiz_footer_button prev">Previous</button>
            <div class="quiz_footer_total_questions">
                <span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>
            </div>
            <button class="quiz_footer_button next">Next</button>
        </div>
    </div>
    
`

class Quiz extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.displayQuestion();
        
    }

    displayQuestion(){

        const question =   {
            numb: 1,
            question: "What does HTML stand for?",
            answer: "Hyper Text Markup Language",
            options: [
              "Hyper Text Preprocessor",
              "Hyper Text Markup Language",
              "Hyper Text Multiple Language",
              "Hyper Tool Multi Language"
            ]
          }
        const que_text = this.shadowRoot.querySelector(".que_text");
        const option_list = this.shadowRoot.querySelector(".option_list");

        console.log(window.document)

        //creating a new span and div tag for question and option and passing the value using array index
        let que_tag = '<span>'+ question.numb + ". " + question.question +'</span>';
        let option_tag = '<div class="option"><span>'+ question.options[0] +'</span></div>'
        + '<div class="option"><span>'+ question.options[1] +'</span></div>'
        + '<div class="option"><span>'+ question.options[2] +'</span></div>'
        + '<div class="option"><span>'+ question.options[3] +'</span></div>';
        que_text.innerHTML = que_tag; //adding new span tag inside que_tag
        option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
        const option = option_list.querySelectorAll(".option");

        // set onclick attribute to all available options
        for(i=0; i < option.length; i++){
            option[i].setAttribute("onclick", "optionSelected(this)");
        }
    }
}


window.customElements.define('app-quiz', Quiz)