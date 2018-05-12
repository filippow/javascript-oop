export default class Quiz {
  
    constructor(title, questions) {
        this.title = title;
        this.questions = questions;
        this._questionsLength = questions.length;
        this._currentIndexQuestion = 0;

        this.init();
    }

    init() {
        this._currentType = this.questions[this._currentIndexQuestion].typeOfQuestion;
    }

    get currentIndexQuestion() {
        return this._currentIndexQuestion;
    }

    set currentIndexQuestion(value) {
        this._currentIndexQuestion = value;
        if (!this.hasEnded) {
            this._currentType = this.questions[this._currentIndexQuestion].typeOfQuestion ;
        }
    }
   
    get currentQuestion() {
        return this.questions[this.currentIndexQuestion];
    }
    
    get hasEnded() {
        return this.currentIndexQuestion >= this._questionsLength;
    }

    get currentType() {
        return this._currentType;  
    }

    checkAnswer(answer) {
       return this.currentQuestion.isCorrectAnswer(answer)
    }
}