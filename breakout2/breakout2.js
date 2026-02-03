(function () {
  "use strict";

  function init(mount, api) {
    if (mount.dataset.initialized === "1") return;
    mount.dataset.initialized = "1";

    fetch("./breakout2/breakout2.html")
      .then(r => r.text())
      .then(html => {
        mount.innerHTML = html;
        wire(mount, api);
      })
      .catch(err => console.error("b2 html load error", err));
  }

  function wire(root, api) {
    function showPage(pageToShow) {
      root.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
      const t = root.querySelector("#" + pageToShow);
      if (t) t.classList.remove("hidden");
    }

    showPage("b2-page-intro");

    const startButton = root.querySelector("#b2-start-challenge-1");
    startButton.addEventListener("click", () => showPage("b2-challenge-1"));

    const memoryButton = root.querySelector("#b2-read-memory");
    memoryButton.addEventListener("click", () => {
      showPage("b2-memory-page");
      root.querySelector("#b2-quiz-container").classList.remove("hidden");
      loadQuestion();
    });

    const questionText = root.querySelector("#b2-question-text");
    const answersContainer = root.querySelector("#b2-answers-container");
    const errorMessage = root.querySelector("#b2-error-message");

    const questions = [
      {
        question: "What was Germany's main military goal in 1916?",
        answers: ["A) Capture Moscow", "B) Force Britain to surrender", "C) Inflict massive casualties on France"],
        correct: 2
      },
      {
        question: "What was the longest battle of World War I, lasting from February to December 1916?",
        answers: ["A) Battle of Verdun", "B) Battle of Ypres", "C) Battle of the Marne"],
        correct: 0
      },
      {
        question: "Why did Germany choose Verdun for a major attack?",
        answers: ["A) It was an industrial city", "B) It had a strong British presence", "C) It was a symbolic and strategic location for France"],
        correct: 2
      }
    ];

    let currentQuestionIndex = 0;

    function loadQuestion() {
      if (currentQuestionIndex >= questions.length) {
        // ✅ finish part 2 and jump to part 3
        api.completePart("b2");
        return;
      }

      const q = questions[currentQuestionIndex];
      questionText.innerText = q.question;
      answersContainer.innerHTML = "";

      q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer-button");
        button.addEventListener("click", () => {
          if (index === q.correct) {
            currentQuestionIndex++;
            errorMessage.classList.add("hidden");
            loadQuestion();
          } else {
            errorMessage.classList.remove("hidden");
          }
        });
        answersContainer.appendChild(button);
      });
    }
  }

  window.Breakouts = window.Breakouts || {};
  window.Breakouts.b2 = { init };
})();
