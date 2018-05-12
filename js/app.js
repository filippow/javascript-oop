export default class App {

    constructor(element, quiz) {
        this.element = element;
        this.quiz = quiz;
        this._amountCorrectAnswers = 0;
        
        this.init(element);
    }

    init(element) {
        this._title = element.querySelector('#title');
        this._score = element.querySelector('#score');
        this._openAnswer = element.querySelector('#openAnswer');
        this._progress = element.querySelector('#progress');
        this._styleProgress = element.querySelector('.styleProgress');

        this.openAnswer = element.querySelector('#openAnswer'); 
        this.openAnswer.addEventListener('input', this.changeInputAnswer.bind(this));

        this.multipleType = element.querySelector('#multipleType');

        this._answers = element.querySelector('#answers');
        this._answers.addEventListener('click', this.handleAnswerClick.bind(this));

        this.button = element.querySelector('#submit');
        this.button.addEventListener('click', this.handleAnswerClick.bind(this));

        this.buttonRepeat = element.querySelector('#repeat');
        this.buttonRepeat.addEventListener('click', this.repeatTest.bind(this));
    }

    handleAnswerClick(event) {
        let answer = '';

        switch (this.quiz.currentType) {
            case 'single':
                answer = event.target.innerHTML;
                this._answers.innerText = '';
                break;
            case 'open':
                answer = this.openAnswer.value;
                break;
            case 'multiple':
                answer = [];
                this.multipleType.querySelectorAll('.customCheckbox').forEach( item => {
                    item.checked ? answer.push(item.value) : ''
                });
        }

        this.quiz.checkAnswer(answer) ? this._amountCorrectAnswers +=1 : ''

        this.quiz.currentIndexQuestion = this.quiz.currentIndexQuestion +1;
        this.displayNext();
    }

    displayNext() { 
        if (!this.quiz.hasEnded) {
            this.displayQuestion();
            this.displayAnswers();
            this.displayProgress();
        } else {
            this._title.textContent = '';
            this._progress.textContent = '';
            this.multipleType.textContent = '';
            this._title.textContent = '';
            this.displayScore();
            this.hideElements({singleAnswer: true, multipleAnswer: true, openAnswer:true, button: true});
            this.buttonRepeat.classList.remove('hidden');

        }
        this._styleProgress.style.width = (100/this.quiz._questionsLength)*this.quiz._currentIndexQuestion + '%';
    }

    displayQuestion() {
        this._title.textContent = this.quiz.currentQuestion.text;
    }

    displayAnswers() {
        switch(this.quiz.currentType) {
            case 'single':
                this.displaySingleType();
                break;
            case 'open':
                this.displayOpenType();
                break;
            case 'multiple':
                this.displayMultipleType();
                break;
        }
    }

    displaySingleType() {
        this.hideElements({singleAnswer: false, multipleAnswer: true, openAnswer:true, button: true});

        this.quiz.currentQuestion.answers.forEach( item => {
            let domElementAnswers = document.createElement('li');
            domElementAnswers.textContent = item;
            domElementAnswers.classList.add('list-group-item-action');
            this._answers.appendChild(domElementAnswers);
       })
    }

    displayOpenType() {
        this.hideElements({singleAnswer: true, multipleAnswer: true, openAnswer:false, button: false});
        this.button.setAttribute('disabled', true);
        this.openAnswer.value = '';  // при повторном воспроизведении теста оставалось предыдущее значение
    }

    displayMultipleType() {
        this.hideElements({singleAnswer: true, multipleAnswer: false, openAnswer:true, button: false})

        this.quiz.currentQuestion.answers.forEach( (item,index)=> {
            let checkbox = document.createElement('input');
            let label = document.createElement('label');
         
            checkbox.type = 'checkbox';
            checkbox.value = index;
            checkbox.addEventListener('change', this.changeCheckbox.bind(this));
            checkbox.classList.add('customCheckbox');

            label.textContent = item;
            label.classList.add('reverse');     //Для правильного отображения группы элементов "Checkbox --> Label"
            label.appendChild(checkbox);
            
            this.multipleType.appendChild(label);    
        })
    }
    
    displayProgress() {
        this._progress.textContent = `Вопрос ${this.quiz._currentIndexQuestion +1} из ${this.quiz._questionsLength}`;
    }

    displayScore() {
        this._score.textContent = `Правильных ответов: ${this._amountCorrectAnswers} из ${this.quiz._questionsLength }` ;
    }

    hideElements({singleAnswer, multipleAnswer, openAnswer, button}) {
        this._answers.classList.toggle('hidden', singleAnswer);
        this.multipleType.classList.toggle('hidden', multipleAnswer);
        this._openAnswer.classList.toggle('hidden', openAnswer);
        this.button.classList.toggle('hidden', button);
    }
    
    changeCheckbox() {
        let checkboxs = Array.prototype.slice.call(this.multipleType.querySelectorAll('.customCheckbox'));
        let disableButton = checkboxs.some( item => item.checked === true);
    
        disableButton ? this.button.removeAttribute('disabled') : this.button.setAttribute('disabled', true); 
    }
    
    changeInputAnswer(event) {
        console.dir(event.target.value);
        event.target.value.length ? this.button.removeAttribute('disabled') : this.button.setAttribute('disabled', true); 
    }

    repeatTest() {
        this._amountCorrectAnswers = 0;
        this.quiz.currentIndexQuestion = 0;
        this.buttonRepeat.classList.add('hidden');
        this.displayNext();
    }
} 