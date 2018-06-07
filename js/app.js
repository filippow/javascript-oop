export default class App {

    constructor(element, quiz) {
        

        this.quiz = quiz;

        this.init(element);
    }

    init(element) { 
        this.title = element.querySelector('#title');
        this.question = element.querySelector('#question');
        this.answers = element.querySelector('#answers');
        this.progress = element.querySelector('#progress');
        this.handleAnswer = this.handleAnswer.bind(this);

       
    }
    handleAnswer(answer) {
        this.quiz.checkAnswer(answer);
        this.clear();
        this.displayNext();
    }

    displayNext() {
        if (this.quiz.hasEnded) {
            this.displayScore();
            this.displayButtonRepeat();
        } else {
            this.renderAnswers();
            this.renderQuestion();   
            this.displayNumberQuestion();
        }
       
        this.displayProgress();
    }

    renderQuestion() {
       let title =  this.quiz.renderQuestion();
       this.title.textContent = title;
    }

    renderAnswers() {
        let form = this.quiz.currentQuestion.renderAnswers(this.handleAnswer);
        this.answers.appendChild(form);
    }

    clear() {
        this.title.textContent = '';
        this.answers.textContent = '';
        this.question.textContent = '';
    }

    displayScore() {
        this.title.textContent = `Ваш результат ${this.quiz.correctAnswers} из  ${this.quiz.questions.length}`;
    }

    displayProgress() {
        this.progress.style.width = (100/this.quiz.questions.length)*this.quiz.currentQuestionIndex + '%';
    }

    displayNumberQuestion() {
        this.question.textContent = `Вопрос ${this.quiz.currentQuestionIndex+1} из ${this.quiz.questions.length}`
    }

    displayButtonRepeat() {
        let button = document.createElement('button');
        button.textContent = 'Повторить тест';
        button.addEventListener('click', this.repeatTest.bind(this));
        this.answers.appendChild(button);
    }

    repeatTest() {
        this.quiz.currentQuestionIndex = 0;
        this.answers.textContent = '';
        this.displayNext();
    }
} 