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

let questionsContent = [
  {
    content: "Concernant les codes en entreprise, il est important de… ",
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
        content: "S’informer avant son intégration",
        isRight: true
      },
      {
        content: "Connaître un bon avocat",
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
        content: "Savourer de longues pauses café",
        isRight: false
      },
      {
        content: "Mentir pour se faire bien voir",
        isRight: false
      },
      {
        content: "Se montrer réactif et compétent",
        isRight: true
      }
    ]
  },
  {
    content: "Comment créer efficacement du lien social ?",
    answers: [
      {
        content: "S’intéresser aux autres",
        isRight: true
      },
      {
        content: "Faire courir des rumeurs",
        isRight: false
      },
      {
        content: "Organiser un loup-garou en réunion",
        isRight: false
      },
      {
        content: "Jouer un rôle de gentil",
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
        content: "Ecoute, manipulation et ponctualité",
        isRight: false
      },
      {
        content: "Adaptation, curiosité et respect",
        isRight: true
      },
      {
        content: "Amour, gloire et beauté",
        isRight: false
      }
    ]
  },
  {
    content: "Avant d’être embauché, il est important de…",
    answers: [
      {
        content: "Faire des faux diplômes",
        isRight: false
      },
      {
        content: "Décompresser en faisant du pilate",
        isRight: false
      },
      {
        content: "Séduire la RH lors de l’entretien",
        isRight: false
      },
      {
        content: "Négocier son contrat de travail",
        isRight: true
      }
    ]
  },
  {
    content: "Laquelle de ces attitudes n'est pas positive ?",
    answers: [
      {
        content: "Développer mon assertivité",
        isRight: false
      },
      {
        content: "Imposer mes propres règles",
        isRight: true
      },
      {
        content: "M’imprégner de la culture d’entreprise",
        isRight: false
      },
      {
        content: "Faire le point avec mon manager",
        isRight: false
      }
    ]
  },
  {
    content: "Qu’est-il important de faire avant l’envoi d’un email ?",
    answers: [
      {
        content: "Se relire pour éviter les fautes d’orthographe",
        isRight: true
      },
      {
        content: "Scotcher l’étiquette d’envoi",
        isRight: false
      },
      {
        content: "Vérifier sa connexion internet",
        isRight: false
      },
      {
        content: "Choisir le lieu d’expédition",
        isRight: false
      }
    ]
  },
  {
    content: "Quel comportement vaut-il mieux éviter ?",
    answers: [
      {
        content: "Ne pas hésiter à poser des questions",
        isRight: false
      },
      {
        content: "Avoir un style vestimentaire conforme",
        isRight: false
      },
      {
        content: "Être prêt à tout pour arriver à ses fins",
        isRight: true
      },
      {
        content: "Se montrer curieux et motivé",
        isRight: false
      }
    ]
  },
  {
    content: "Laquelle des ces propositions est vraie ?",
    answers: [
      {
        content: "Savoir-vivre, écriture soignée, orgueil",
        isRight: false
      },
      {
        content: "Assurance, ouverture d’esprit, assertivité",
        isRight: true
      },
      {
        content: "Organisation, empathie, rivalité",
        isRight: false
      },
      {
        content: "Ecoute, agressivité, réactivité",
        isRight: false
      }
    ]
  },
  {
    content: "Comment faire bonne impression dès son arrivée ?",
    answers: [
      {
        content: "Faire un check à son employeur",
        isRight: false
      },
      {
        content: "Se montrer curieux, poli et souriant",
        isRight: true
      },
      {
        content: "Organiser un pot d'arrivée avec de la vodka",
        isRight: false
      },
      {
        content: "Réciter à voix haute le règlement intérieur",
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
