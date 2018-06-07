export default class Quiz {
  
    constructor(title, questions) {
        this.title = title;
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.questions = questions;
        this.init();
    }

    init() {
       
    }
    get hasEnded() {
        return this.currentQuestionIndex>=this.questions.length;
    }

    get currentQuestion() {
        return this.questions[this.currentQuestionIndex]
    }

    renderQuestion() {
       return this.currentQuestion.question;
    }

    checkAnswer(answer) {
       let answ = this.currentQuestion.checkAnswer(answer);
       if (answ) {
           this.correctAnswers++;
       }
       this.currentQuestionIndex++;
    }
}