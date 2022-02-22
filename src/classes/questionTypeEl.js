class QuestionTypeEl {
    static MULTIPLE_CHOICE = new QuestionTypeEl("MULTIPLE_CHOICE");
    static SHORT_ANSWER = new QuestionTypeEl("SHORT_ANSWER");
    static NUMBER = new QuestionTypeEl("NUMBER");
    static GAP__FILL = new QuestionTypeEl("GAP_FILL");

    constructor(name) {
      this.name = name;
    }

    toString(){
        return `${this.name}`;
    }
}