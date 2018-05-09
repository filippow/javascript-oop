export default class Quiz {
    /**
     * @param {string} title 
     * @param {Question[]} questions 
     */
    constructor(title, questions) {
        this.title = title;
        this.questions = questions;
        this._questionsLength = questions.length;
        this._currentIndexQuestion = 0;
    }

    /**
     * Возвращает текущий вопрос.
     * 
     * @returns {Question}
     */
    get currentQuestion() {
        return this.questions[this._currentIndexQuestion];
    }

    /**
     * Возвращает `true/false` в зависимости от того закончился тест или нет.
     * 
     * @returns {boolean}
     */
    get hasEnded() {
        return this._currentIndexQuestion >= this._questionsLength;
    }

    /**
     * Проверяет правильность ответа выбранного пользователем.
     * @param {*} answer 
     */
    checkAnswer(answer) {
       return this.currentQuestion.isCorrectAnswer(answer)
    }
}