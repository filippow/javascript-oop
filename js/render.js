
export  class SingleQuestionType {
  renderAnswers(answers, onAnswer) {
    let form = document.createElement('form');
    let button = document.createElement('button');

    button.textContent = 'Подтвердить';
    button.type = 'submit';
    
    for (let i=0; i<answers.length; i++) {
      let label = document.createElement('label');
      let input = document.createElement('input');

      label.textContent = answers[i];
      input.type = 'radio';
      input.name = 'answer';
      input.value = i;
      
      label.appendChild(input);
      form.appendChild(label);

    }
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      let answer = Array.from(form.querySelectorAll('input'));
      answer = answer.findIndex( item => item.checked == true)
      onAnswer(answer);
    })
   
    
    form.appendChild(button);

    return form
  }
} 

export class MultipleQuestionType {
  
  renderAnswers(answers, onAnswer) {
    let form = document.createElement('form');
    let button = document.createElement('button');

    button.textContent = 'Подтвердить';
    button.type = 'submit';
    
    for (let i=0; i<answers.length; i++) {
      let label = document.createElement('label');
      let input = document.createElement('input');

      label.textContent = answers[i];
      input.type = 'checkbox';
      input.name = 'answer';
      input.value = i;
      
      label.appendChild(input);
      form.appendChild(label);

    }

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      let answer = Array.from(form.querySelectorAll('input'));
      let newAnswer = [];
      
      answer.forEach( item => {
        if (item.checked) {
          newAnswer.push(item.value);
        }
      })
      onAnswer(newAnswer);
    })
    
    form.appendChild(button);

    return form
  }
}

export class OpenQuestionType {
  renderAnswers(answer, onAnswer) {
    let form = document.createElement('form');
    let button = document.createElement('button');
    let input = document.createElement('input');


    button.textContent = 'Подтвердить';
    button.type = 'submit';
    input.type = 'text';

    form.appendChild(input);
    form.appendChild(button);

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      let answer = input.value;
      onAnswer(answer);
      input.value = '';

    })
    
    return form;
  }
}

const renderer = {
  single: SingleQuestionType,
  multiple: MultipleQuestionType,
  open: OpenQuestionType
}

export function createRender(type) {
  return new renderer[type]
}