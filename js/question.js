export default class Question {
 
    constructor(text, answers, correctAnswer, type) {
        this.text = text;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.type = type;
    }

    isCorrectAnswer(answer) { 
        switch(this.type) {
            case 'single':
                return this.correctAnswer === this.answers.indexOf(answer);
                break;
            case 'open':
                return this.correctAnswer.toLowerCase() === answer.toLowerCase();
                break;
            case 'multiple':
                return this.correctAnswer.length == answer.length && this.correctAnswer.every((item,index)=> item == answer[index]);
                break;
        }
    }

    get typeOfQuestion() {
       return this.type;
    }
}