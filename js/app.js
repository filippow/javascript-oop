export default class App {
    /**
     * @param {HTMLElement} element 
     * @param {Quiz} quiz 
     */
    constructor(element, quiz) {
        this.element = element;
        this.quiz = quiz;
        this._amountCorrectAnswers = 0;
        
        this.init(element);

        
    }

    /**
     * Инициализирует объект.
     * 
     * Получает доступ к DOM-элементам, устанавливает заголовок и подписывается на событие при выборе ответа.
     */
    init(element) {
        this._title = element.querySelector('#title');
        this._score = element.querySelector('#score');
        this._answers = element.querySelector('#answers');
        this._progress = element.querySelector('#progress');
        this._styleProgress = element.querySelector('.styleProgress');
        this._answers.addEventListener('click', this.handleAnswerButtonClick.bind(this));
    }

    /**
     * Обрабатывает событие при выборе ответа.
     * 
     * @param {Event} event 
     */
    handleAnswerButtonClick(event) {
        let answer = event.target.innerHTML;

        if (this.quiz.checkAnswer(answer)) {
            this._amountCorrectAnswers +=1;
        } 
        this.quiz._currentIndexQuestion +=1;
        this._answers.innerText = '';
        this.displayNext();
       

    }

    /**
     * Отображает следующий вопрос или отображает результат если тест заверешен.
     */
    displayNext() {
        if (!this.quiz.hasEnded) {
            this.displayQuestion();
            this.displayAnswers();
            this.displayProgress();
        } else {
            this._title.textContent = '';
            this._progress.textContent = '';
            this.displayScore();
        }
        this._styleProgress.style.width = (100/this.quiz._questionsLength)*this.quiz._currentIndexQuestion + '%';
    }

    /**
     * Отображает вопрос.
     */
    displayQuestion() {
        this._title.textContent = this.quiz.currentQuestion.text;
    }

    /**
     * Отображает ответы.
     */
    displayAnswers() {
        this.quiz.currentQuestion.answers.forEach( item => {
            let domElementAnswers = document.createElement('li');
            domElementAnswers.textContent = item;
            domElementAnswers.classList.add('list-group-item-action');
            this._answers.appendChild(domElementAnswers);
       });
    }

    /**
     * Отображает прогресс ('Вопрос 1 из 5').
     */
    displayProgress() {
        this._progress.textContent = `Вопрос ${this.quiz._currentIndexQuestion +1} из ${this.quiz._questionsLength}`;
    }

    /**
     * Отображает результат теста.
     */
    displayScore() {
        this._score.textContent = `Правильных ответов: ${this._amountCorrectAnswers} из ${this.quiz._questionsLength }` ;
    }
}