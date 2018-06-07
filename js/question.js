import {createValidator} from './validator.js';
import {createRender} from './render.js';

export default class Question {
 
    constructor({text, answers, correctAnswer, type, validator, render}) {
        this.text = text;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.type = type;
        this.validator = validator;
        this.render = render;
    }

    checkAnswer(answer) {
       return this.validator.validateAnswer(answer, this.correctAnswer);
    }

    renderAnswers(onAnswer) {
       return this.render.renderAnswers(this.answers,onAnswer);
    }

    get question() {
        return this.text;
    }
}

export  function createQuestion({type,text,answers,correctAnswer}) {
    return new Question ({
        type,
        text,
        answers,
        correctAnswer,
        validator: createValidator(type),
        render: createRender(type)
    }) 
}