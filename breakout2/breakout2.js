document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JavaScript loaded correctly.");

  function showPage(pageToShow) {
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.add("hidden");
      page.classList.remove("active");
    });

    const target = document.getElementById(pageToShow);
    if (target) {
      target.classList.remove("hidden");
      target.classList.add("active");
      console.log(`📌 Showing page: ${pageToShow}`);
    }

    if (pageToShow === "challenge-2") {
      resetChallenge1Quiz();
      quizContainer2.classList.remove("hidden");
      currentQuestionIndex2 = 0;
      loadQuestion2();
    }
  }

  // Shell buttons
  document.getElementById("to-shell")?.addEventListener("click", () => location.href = "../index.html");
  document.getElementById("back-to-hub")?.addEventListener("click", () => location.href = "../index.html");

  // Proceed to part 3 (bridge)
  document.getElementById("go-part-3")?.addEventListener("click", () => {
    location.href = "../breakout3/index.html";
  });

  function resetChallenge1Quiz() {
    quizContainer.classList.add("hidden");
    questionText.innerText = "";
    answersContainer.innerHTML = "";
    nextButton.classList.add("hidden");
  }

  document.getElementById("start-challenge-1")?.addEventListener("click", function () {
    showPage("challenge-1");
  });

  document.getElementById("read-memory")?.addEventListener("click", function () {
    showPage("memory-page");
    setTimeout(() => {
      quizContainer.classList.remove("hidden");
      loadQuestion();
    }, 200);
  });

  const quizContainer = document.getElementById("quiz-container");
  const questionText = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers-container");
  const errorMessage = document.getElementById("error-message");
  const nextButton = document.getElementById("next-question");

  const questions = [ /* unchanged */ 
    { question:"What type of warfare led to a stalemate on the Western Front in 1915?",
      answers:["A) Guerrilla Warfare","B) Trench Warfare","C) Blitzkrieg"], correct:1 },
    // ... keep the rest exactly as your provided list ...
  ];

  let currentQuestionIndex = 0;

  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      showPage("challenge-2");
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.innerText = answer;
      button.classList.add("answer-button");
      button.addEventListener("click", function () {
        if (index === currentQuestion.correct) {
          currentQuestionIndex++;
          errorMessage.classList.add("hidden");
          nextButton.classList.remove("hidden");
        } else {
          errorMessage.classList.remove("hidden");
        }
      });
      answersContainer.appendChild(button);
    });
  }

  nextButton?.addEventListener("click", function () {
    nextButton.classList.add("hidden");
    loadQuestion();
  });

  // Challenge 2 quiz setup (unchanged)
  const quizContainer2 = document.getElementById("quiz-container-2");
  const questionText2 = document.getElementById("question-text-2");
  const answersContainer2 = document.getElementById("answers-container-2");
  const errorMessage2 = document.getElementById("error-message-2");
  const nextButton2 = document.getElementById("next-question-2");

  const questions2 = [ /* unchanged */ 
    { question:"What year did Britain introduce conscription?", type:"short", correct:"1916" },
    // ... keep the rest exactly as your provided list ...
  ];

  let currentQuestionIndex2 = 0;

  function loadQuestion2() {
    console.log("📌 Loading Challenge 2 Question:", currentQuestionIndex2);

    if (currentQuestionIndex2 >= questions2.length) {
      proceedToEnigma();
      return;
    }

    const currentQuestion = questions2[currentQuestionIndex2];
    questionText2.innerText = currentQuestion.question;
    answersContainer2.innerHTML = "";
    quizContainer2.classList.remove("hidden");

    if (currentQuestion.type === "mcq") {
      currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer-button");
        button.addEventListener("click", function () {
          if (index === currentQuestion.correct) {
            currentQuestionIndex2++;
            errorMessage2.classList.add("hidden");
            nextButton2.classList.remove("hidden");
          } else {
            errorMessage2.classList.remove("hidden");
          }
        });
        answersContainer2.appendChild(button);
      });
    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.id = "short-answer-input";
      input.placeholder = "Type your answer...";
      answersContainer2.appendChild(input);

      const submitButton = document.createElement("button");
      submitButton.innerText = "Submit";
      submitButton.classList.add("answer-button");
      submitButton.addEventListener("click", function () {
        const userAnswer = input.value.trim().toLowerCase();
        if (userAnswer === currentQuestion.correct.toLowerCase()) {
          currentQuestionIndex2++;
          errorMessage2.classList.add("hidden");
          nextButton2.classList.remove("hidden");
        } else {
          errorMessage2.classList.remove("hidden");
        }
      });
      answersContainer2.appendChild(submitButton);
    }
  }

  nextButton2?.addEventListener("click", function () {
    nextButton2.classList.add("hidden");
    loadQuestion2();
  });

  function proceedToEnigma() {
    showPage("transition-page");
  }

  // ENIGMA LOGIC (unchanged)
  const enigmaAnswer = document.getElementById("enigma-answer");
  const checkEnigma = document.getElementById("check-enigma");
  const enigmaFeedback = document.getElementById("enigma-feedback");
  const enigmaSuccess = document.getElementById("enigma-success");
  const correctCode = "4235";

  checkEnigma?.addEventListener("click", function () {
    const userAnswer = enigmaAnswer.value.trim();
    if (userAnswer === correctCode) {
      enigmaFeedback.classList.add("hidden");
      enigmaSuccess.classList.remove("hidden");

      // ✅ Mark part 2 complete for shell
      window.SharedProgress?.markPartComplete(2);
    } else {
      enigmaFeedback.classList.remove("hidden");
    }
  });
});
