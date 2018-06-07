
export class SingleAnswerType {
  validateAnswer(answer, correctAnswer) {
    console.log(answer);
    console.log(correctAnswer);
    return answer == correctAnswer
  }
}

export class MultipleAnswerType {
  validateAnswer(answer, correctAnswer) {
    return answer.length == correctAnswer.length && answer.every ((item,index) => item == correctAnswer[index])
  }
}

export class OpenAnswerType {
  validateAnswer(answer, correctAnswer) {
    return answer.toLowerCase() == correctAnswer.toLowerCase();
  }
}

const validate = {
  single: SingleAnswerType,
  multiple: MultipleAnswerType,
  open: OpenAnswerType
}

export function createValidator(type) {
  return new validate[type]
}