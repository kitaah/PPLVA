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

    rightFeedback = "Bravo ! Bonne r??ponse ???? ";
    wrongFeedback = "Oh ! Mauvaise r??ponse ????";

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

let questionsContent = [
  {
    content: "Concernant les codes en entreprise, il est important de??? ",
    answers: [
      {
        content: "Se montrer anarchiste",
        isRight: false
      },
      {
        content: "Apprendre le code Python",
        isRight: false
      },
      {
        content: "S???informer avant son int??gration",
        isRight: true
      },
      {
        content: "Conna??tre un bon avocat",
        isRight: false
      }
    ]
  },
  {
    content: "Comment faire preuve de professionnalisme ? ",
    answers: [
      {
        content: "Faire des selfies avec Chantal de la compta",
        isRight: false
      },
      {
        content: "Savourer de longues pauses caf??",
        isRight: false
      },
      {
        content: "Mentir pour se faire bien voir",
        isRight: false
      },
      {
        content: "Se montrer r??actif et comp??tent",
        isRight: true
      }
    ]
  },
  {
    content: "Comment cr??er efficacement du lien social ?",
    answers: [
      {
        content: "S???int??resser aux autres",
        isRight: true
      },
      {
        content: "Faire courir des rumeurs",
        isRight: false
      },
      {
        content: "Organiser un loup-garou en r??union",
        isRight: false
      },
      {
        content: "Jouer un r??le de gentil",
        isRight: false
      }
    ]
  },
  {
    content: "Laquelle de ces propositions est vraie ? ",
    answers: [
      {
        content: "Organisation, polyvalence et caprices",
        isRight: false
      },
      {
        content: "Ecoute, manipulation et ponctualit??",
        isRight: false
      },
      {
        content: "Adaptation, curiosit?? et respect",
        isRight: true
      },
      {
        content: "Amour, gloire et beaut??",
        isRight: false
      }
    ]
  },
  {
    content: "Avant d?????tre embauch??, il est important de???",
    answers: [
      {
        content: "Faire des faux dipl??mes",
        isRight: false
      },
      {
        content: "D??compresser en faisant du pilate",
        isRight: false
      },
      {
        content: "S??duire la RH lors de l???entretien",
        isRight: false
      },
      {
        content: "N??gocier son contrat de travail",
        isRight: true
      }
    ]
  },
  {
    content: "Laquelle de ces attitudes n'est pas positive ?",
    answers: [
      {
        content: "D??velopper son assertivit??",
        isRight: false
      },
      {
        content: "Imposer ses propres r??gles",
        isRight: true
      },
      {
        content: "S???impr??gner de la culture d???entreprise",
        isRight: false
      },
      {
        content: "Faire le point avec son manager",
        isRight: false
      }
    ]
  },
  {
    content: "Qu???est-il important de faire avant l???envoi d???un email ?",
    answers: [
      {
        content: "Se relire pour ??viter les fautes d???orthographe",
        isRight: true
      },
      {
        content: "Scotcher l?????tiquette d???envoi",
        isRight: false
      },
      {
        content: "V??rifier sa connexion internet",
        isRight: false
      },
      {
        content: "Choisir le lieu d???exp??dition",
        isRight: false
      }
    ]
  },
  {
    content: "Quel comportement vaut-il mieux ??viter ?",
    answers: [
      {
        content: "Ne pas h??siter ?? poser des questions",
        isRight: false
      },
      {
        content: "Avoir un style vestimentaire conforme",
        isRight: false
      },
      {
        content: "??tre pr??t ?? tout pour arriver ?? ses fins",
        isRight: true
      },
      {
        content: "Faire preuve d'assurance",
        isRight: false
      }
    ]
  },
  {
    content: "Laquelle de ces propositions est vraie ?",
    answers: [
      {
        content: "Courtoisie, ??criture soign??e, orgueil",
        isRight: false
      },
      {
        content: "Assurance, ouverture d???esprit, assertivit??",
        isRight: true
      },
      {
        content: "Organisation, empathie, rivalit??",
        isRight: false
      },
      {
        content: "Ecoute, agressivit??, r??activit??",
        isRight: false
      }
    ]
  },
  {
    content: "Comment faire bonne impression d??s son arriv??e ?",
    answers: [
      {
        content: "Faire un check ?? son employeur",
        isRight: false
      },
      {
        content: "Se montrer curieux, poli et souriant",
        isRight: true
      },
      {
        content: "Organiser un pot d'arriv??e avec de la vodka",
        isRight: false
      },
      {
        content: "R??citer ?? voix haute le r??glement int??rieur",
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
      alert(`Quiz termin?? ! ???? \nTon score est de ${score}/${questions.length}`);
    }, 200);
  }
});
});
