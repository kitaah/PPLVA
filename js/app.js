document.addEventListener("DOMContentLoaded", () => {
let Question = function (questionObj) {
  this.value = {
    content: "Question",
    answers: []
  };

  this.chosenAnswer = null;
  this.html = null;
  this.questionContent = null;
  this.questionWithAnswers = null;
  this.questionWithFeedback = null;

  this.value = Object.assign(this.value, questionObj);

  this.onQuestionChosen = ({ detail }) => {
    this.chosenAnswer = {
      value: detail.answer,
      html: detail.answerHtml
    };
    this.update();

    document.dispatchEvent(
      new CustomEvent("question-chosen", {
        detail: {
          question: this,
          answer: detail.answer
        }
      })
    );
  };

  this.create = function () {
    this.html = document.createElement("p");
    this.html.classList.add("question__content");

    this.questionContent = document.createElement("h2");
    this.questionContent.textContent = this.value.content;

    this.questionWithAnswers = document.createElement("p");
    this.questionWithAnswers.classList.add("answers__content");

    for (let i = 0; i < this.value.answers.length; i++) {
      const ansObj = this.value.answers[i];
      let answer = createNewAnswer(ansObj);

      answer.onclick = (e) => {
        if (this.chosenAnswer !== null) {
          this.chosenAnswer.html.classList.remove("chosen");
        }

        answer.classList.add("chosen");

        this.html.dispatchEvent(
          new CustomEvent("question-chosen", {
            detail: {
              answer: ansObj,
              answerHtml: answer
            }
          })
        );
      };

      this.questionWithAnswers.appendChild(answer);
    }

    this.questionWithFeedback = document.createElement("p");
    this.questionWithFeedback.classList.add("question__feedback");

    this.html.appendChild(this.questionContent);
    this.html.appendChild(this.questionWithAnswers);
    this.html.appendChild(this.questionWithFeedback);

    this.html.addEventListener("question-chosen", this.onQuestionChosen);

    return this.html;
  };

  this.disable = function () {
    this.html.classList.add("dead");
    this.html.onclick = (e) => {
      e.stopPropagation();
    };

    this.html.removeEventListener("question-chosen", this.onQuestionChosen);

    let answers = this.html.querySelectorAll(".answer__content");
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      answer.onclick = null;
    }
  };

  this.remove = function () {
    let children = this.html.querySelectorAll("*");
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      this.html.removeChild(child);
    }

    this.html.removeEventListener("question-chosen", this.onQuestionChosen);

    this.html.parentNode.removeChild(this.html);
    this.html = null;
  };

  this.update = function () {
    let rightFeedback, wrongFeedback;
    this.html = this.html || document.createElement("p");

    rightFeedback = "Bravo ! Bonne réponse 😊 ";
    wrongFeedback = "Oh ! Mauvaise réponse 😢";

    if (this.chosenAnswer !== null) {
      if (this.chosenAnswer.value.isRight) {
        this.html.classList.add("right");
        this.html.classList.remove("wrong");
        this.questionWithFeedback.innerHTML = rightFeedback;
      } else {
        this.html.classList.add("wrong");
        this.html.classList.remove("right");
        this.questionWithFeedback.innerHTML = wrongFeedback;
      }
    }
  };

  function createNewAnswer(obj) {
    this.value = {
      content: "Answer",
      isRight: false
    };

    this.value = Object.assign(this.value, obj);

    this.html = document.createElement("button");
    this.html.classList.add("answer__content");

    this.html.textContent = this.value.content;

    return this.html;
  }
};

//
// main.js
//

let questionsContent = [
  {
    content: "Quelle est la couleur du cheval blanc d'Henry IV ?",
    answers: [
      {
        content: "Vert",
        isRight: false
      },
      {
        content: "Rouge",
        isRight: true
      },
      {
        content: "Bleu",
        isRight: false
      },
      {
        content: "Jaune",
        isRight: false
      }
    ]
  },
  {
    content: "Quelle est la couleur du cheval blanc d'Henry IV ?",
    answers: [
      {
        content: "Vert",
        isRight: false
      },
      {
        content: "Rouge",
        isRight: true
      },
      {
        content: "Bleu",
        isRight: false
      },
      {
        content: "Jaune",
        isRight: false
      }
    ]
  },
  {
    content: "Quelle est la couleur du cheval blanc d'Henry IV ?",
    answers: [
      {
        content: "Vert",
        isRight: false
      },
      {
        content: "Rouge",
        isRight: true
      },
      {
        content: "Bleu",
        isRight: false
      },
      {
        content: "Jaune",
        isRight: false
      }
    ]
  },
  {
    content: "Quelle est la couleur du cheval blanc d'Henry IV ?",
    answers: [
      {
        content: "Vert",
        isRight: false
      },
      {
        content: "Rouge",
        isRight: true
      },
      {
        content: "Bleu",
        isRight: false
      },
      {
        content: "Jaune",
        isRight: false
      }
    ]
  },
  {
    content: "Quelle est la couleur du cheval blanc d'Henry IV ?",
    answers: [
      {
        content: "Vert",
        isRight: false
      },
      {
        content: "Rouge",
        isRight: true
      },
      {
        content: "Bleu",
        isRight: false
      },
      {
        content: "Jaune",
        isRight: false
      }
    ]
  },
  {
    content: "Quelle est la couleur du cheval blanc d'Henry IV ?",
    answers: [
      {
        content: "Vert",
        isRight: false
      },
      {
        content: "Rouge",
        isRight: true
      },
      {
        content: "Bleu",
        isRight: false
      },
      {
        content: "Jaune",
        isRight: false
      }
    ]
  },
  {
    content: "Quelle est la couleur du cheval blanc d'Henry IV ?",
    answers: [
      {
        content: "Vert",
        isRight: false
      },
      {
        content: "Rouge",
        isRight: true
      },
      {
        content: "Bleu",
        isRight: false
      },
      {
        content: "Jaune",
        isRight: false
      }
    ]
  },
  {
    content: "Quelle est la couleur du cheval blanc d'Henry IV ?",
    answers: [
      {
        content: "Vert",
        isRight: false
      },
      {
        content: "Rouge",
        isRight: true
      },
      {
        content: "Bleu",
        isRight: false
      },
      {
        content: "Jaune",
        isRight: false
      }
    ]
  },
  {
    content: "Quelle est la couleur du cheval blanc d'Henry IV ?",
    answers: [
      {
        content: "Vert",
        isRight: false
      },
      {
        content: "Rouge",
        isRight: true
      },
      {
        content: "Bleu",
        isRight: false
      },
      {
        content: "Jaune",
        isRight: false
      }
    ]
  },
  {
    content: "Quelle est la couleur du cheval blanc d'Henry IV ?",
    answers: [
      {
        content: "Vert",
        isRight: false
      },
      {
        content: "Rouge",
        isRight: true
      },
      {
        content: "Bleu",
        isRight: false
      },
      {
        content: "Jaune",
        isRight: false
      }
    ]
  }
];

let questions = [];
let score = 0;
let answeredQuestions = 0;
let questionsContainer = document.getElementById("questions__content");
let resultContainer = document.getElementById("result__content");
resultContainer.innerHTML = `Score: ${score}/${questionsContent.length}`;

function shuffle(ev) {
  for (let i = ev.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ev[i], ev[j]] = [ev[j], ev[i]];
  }
}

shuffle(questionsContent);

// creating questions
for (let i = 0; i < questionsContent.length; i++) {
  let question = new Question({
    content: questionsContent[i].content,
    answers: questionsContent[i].answers
  });

  questionsContainer.appendChild(question.create());
  questions.push(question);
}

document.addEventListener("question-chosen", ({ detail }) => {
  if (detail.answer.isRight) {
    score++;
  }

  answeredQuestions++;
  resultContainer.innerHTML = `Score: ${score}/${questions.length}`;
  detail.question.disable();

  if (answeredQuestions == questions.length) {
    setTimeout(function () {
      alert(`Quiz terminé ! 🚀🚀🚀 \nTon score est de ${score}/${questions.length}`);
    }, 200);
  }
});
});

