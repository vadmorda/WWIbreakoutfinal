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

   {
      question:
        "What type of warfare led to a stalemate on the Western Front in 1915?",
      answers: ["A) Guerrilla Warfare", "B) Trench Warfare", "C) Blitzkrieg"],
      correct: 1
    },
    {
      question:
        "Which country did Germany focus on defeating in the East in 1915?",
      answers: ["A) France", "B) Russia", "C) Britain"],
      correct: 1
    },
    {
      question: "What was the goal of the Gallipoli Campaign?",
      answers: [
        "A) To capture Berlin",
        "B) To eliminate Turkey and open the Dardanelles",
        "C) To support Italy in the Alps"
      ],
      correct: 1
    },
    {
      question: "Which date marks the start of the Gallipoli landings?",
      answers: [
        "A) April 25, 1915",
        "B) June 10, 1915",
        "C) September 3, 1915"
      ],
      correct: 0
    },
    {
      question: "Which new country joined the Central Powers in 1915?",
      answers: ["A) Romania", "B) Bulgaria", "C) Greece"],
      correct: 1
    },
    {
      question: "What happened to the Serbian army in late 1915?",
      answers: [
        "A) It launched an offensive against Austria",
        "B) It was forced into a brutal retreat",
        "C) It captured Bulgaria"
      ],
      correct: 1
    },
    {
      question:
        "What was the primary reason for the failure of the Gallipoli Campaign?",
      answers: [
        "A) A lack of supplies",
        "B) Strong Turkish resistance and difficult terrain",
        "C) A German counteroffensive"
      ],
      correct: 1
    },
    {
      question:
        "Which commander insisted on repeated French offensives in 1915 despite heavy casualties?",
      answers: [
        "A) Philippe Pétain",
        "B) Joseph Joffre",
        "C) Erich Ludendorff"
      ],
      correct: 1
    },
    {
      question:
        "Which battle saw the first large-scale use of chemical warfare?",
      answers: [
        "A) The Battle of Verdun",
        "B) The First Battle of the Marne",
        "C) The Second Battle of Ypres"
      ],
      correct: 2
    },
    {
      question: "What gas was used by Germany in the Second Battle of Ypres?",
      answers: ["A) Mustard Gas", "B) Chlorine Gas", "C) Phosgene Gas"],
      correct: 1
    },
    {
      question: "Which country introduced the Adrian helmet in 1915?",
      answers: ["A) Britain", "B) Germany", "C) France"],
      correct: 2
    },
    {
      question: "Why was trench warfare particularly deadly?",
      answers: [
        "A) Lack of food supplies",
        "B) Heavy artillery, machine guns, and gas attacks",
        "C) Weak defensive structures"
      ],
      correct: 1
    },
    {
      question: "Which country declared war on Austria-Hungary in May 1915?",
      answers: ["A) Italy", "B) Romania", "C) Portugal"],
      correct: 0
    },
    {
      question: "Which region became a major front after Italy joined the war?",
      answers: [
        "A) The Eastern Front",
        "B) The Italian Front",
        "C) The Middle Eastern Front"
      ],
      correct: 1
    },
    {
      question: "What was a major challenge for Italy on the Italian Front?",
      answers: [
        "A) Harsh mountain terrain and strong Austro-Hungarian defenses",
        "B) Lack of weapons",
        "C) British opposition"
      ],
      correct: 0
    },
    {
      question: "What major event happened in Mesopotamia in 1915?",
      answers: [
        "A) British forces were forced to surrender",
        "B) Germany invaded Iraq",
        "C) The Ottomans withdrew from Baghdad"
      ],
      correct: 0
    },
    {
      question: "Why did propaganda play a big role in 1915?",
      answers: [
        "A) To recruit soldiers and maintain public support",
        "B) To force Germany into peace talks",
        "C) To spread misinformation about American involvement"
      ],
      correct: 0
    },
    {
      question: "What strategy did General Joffre use in 1915?",
      answers: [
        "A) Blitzkrieg",
        "B) Continuous large-scale offensives",
        "C) Defensive attrition warfare"
      ],
      correct: 1
    },
    {
      question: "Which new weapon did both sides improve in 1915?",
      answers: ["A) Tanks", "B) Poison Gas", "C) Jet Fighters"],
      correct: 1
    },
    {
      question: "What major city did the Russians capture in early 1915?",
      answers: ["A) Trebizond", "B) Baku", "C) Warsaw"],
      correct: 0
    },
    {
      question: "Which army faced severe equipment shortages in 1915?",
      answers: [
        "A) The French Army",
        "B) The German Army",
        "C) The Russian Army"
      ],
      correct: 0
    },
    {
      question:
        "What was the purpose of the Chantilly Conference in December 1915?",
      answers: [
        "A) To negotiate peace",
        "B) To coordinate Allied offensives in 1916",
        "C) To divide the Middle East"
      ],
      correct: 1
    },
    {
      question: "Which battle saw extensive mining warfare in 1915?",
      answers: [
        "A) The Battle of Vauquois",
        "B) The Battle of Verdun",
        "C) The Battle of Loos"
      ],
      correct: 0
    },
    {
      question: "By the end of 1915, how was the war viewed?",
      answers: [
        "A) A quick victory was near",
        "B) A long and grueling war was expected",
        "C) The Allies were on the verge of surrender"
      ],
      correct: 1
    }
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
    {
      question: "What year did Britain introduce conscription?",
      type: "short",
      correct: "1916"
    },
    {
      question: "Which country joined the Central Powers in 1915?",
      type: "short",
      correct: "Bulgaria"
    },
    {
      question:
        "What type of warfare created a stalemate on the Western Front?",
      type: "short",
      correct: "Trench"
    },
    {
      question: "Which sea battle was the only major naval battle of WWI?",
      type: "short",
      correct: "Jutland"
    },
    {
      question: "Which empire did Hussein bin Ali lead a revolt against?",
      type: "short",
      correct: "Ottoman"
    },
    {
      question: "Which country introduced the 'Mark 1' steel helmet?",
      type: "short",
      correct: "Britain"
    },
    {
      question: "Which lake did the British seize control of in Africa?",
      type: "short",
      correct: "Tanganyika"
    },
    {
      question: "What year did the Brusilov Offensive begin?",
      type: "short",
      correct: "1916"
    },
    {
      question: "Which country overran Serbia in 1915?",
      type: "short",
      correct: "Austria-Hungary"
    },
    {
      question:
        "Who was Britain's Secretary of State for War who died in 1916?",
      type: "short",
      correct: "Kitchener"
    },
    {
      question: "Which European empire collapsed after Franz Josef died?",
      type: "short",
      correct: "Austria-Hungary"
    },
    {
      question: "Which country declared war on Portugal in 1916?",
      type: "short",
      correct: "Germany"
    },
    {
      question: "Which city did Russian forces capture in April 1916?",
      type: "short",
      correct: "Trebizond"
    },
    {
      question: "What was the worst day in British military history?",
      type: "short",
      correct: "Battle of the Somme"
    },
    {
      question: "Which leader was forced out of office in Britain in 1916?",
      type: "short",
      correct: "Asquith"
    },

    // ✅ MULTIPLE-CHOICE QUESTIONS (Students must select the correct option)
    {
      question: "What strategy did Germany use at Verdun?",
      type: "mcq",
      answers: ["A) Blitzkrieg", "B) Attrition", "C) Trench Raiding"],
      correct: 1
    },
    {
      question: "Which country suffered 100,000 casualties at Lake Naroch?",
      type: "mcq",
      answers: ["A) Russia", "B) France", "C) Germany"],
      correct: 0
    },
    {
      question: "Who led the Arab Revolt against Ottoman rule?",
      type: "mcq",
      answers: ["A) Mustafa Kemal", "B) Hussein bin Ali", "C) T.E. Lawrence"],
      correct: 1
    },
    {
      question: "What was Britain's main goal with the naval blockade?",
      type: "mcq",
      answers: [
        "A) Stop Germany’s navy",
        "B) Cut off Germany’s supplies",
        "C) Protect British trade routes"
      ],
      correct: 1
    },
    {
      question: "Which country joined the Allies in 1916?",
      type: "mcq",
      answers: ["A) Romania", "B) Spain", "C) Norway"],
      correct: 0
    },
    {
      question: "What was the main cause of the Brusilov Offensive?",
      type: "mcq",
      answers: [
        "A) To break Austria-Hungary",
        "B) To invade Germany",
        "C) To attack Bulgaria"
      ],
      correct: 0
    },
    {
      question: "Which battle introduced tanks for the first time?",
      type: "mcq",
      answers: ["A) Verdun", "B) Jutland", "C) The Somme"],
      correct: 2
    },
    {
      question: "Who replaced General Falkenhayn after Verdun?",
      type: "mcq",
      answers: ["A) Hindenburg & Ludendorff", "B) Joffre", "C) Pershing"],
      correct: 0
    },
    {
      question: "What happened to Romania after joining the war?",
      type: "mcq",
      answers: [
        "A) It conquered Austria",
        "B) It was quickly defeated",
        "C) It remained neutral"
      ],
      correct: 1
    },
    {
      question: "Which front saw the highest casualties in 1916?",
      type: "mcq",
      answers: ["A) Western Front", "B) Eastern Front", "C) Italian Front"],
      correct: 0
    },
    {
      question: "What agreement secretly divided the Middle East?",
      type: "mcq",
      answers: [
        "A) Sykes-Picot Agreement",
        "B) Treaty of Versailles",
        "C) The Balfour Declaration"
      ],
      correct: 0
    },
    {
      question: "What battle had 365,000 French casualties?",
      type: "mcq",
      answers: ["A) The Somme", "B) Verdun", "C) Gallipoli"],
      correct: 1
    },
    {
      question: "Which leader in Russia launched an attack to help Verdun?",
      type: "mcq",
      answers: ["A) Lenin", "B) Brusilov", "C) Stalin"],
      correct: 1
    },
    {
      question: "Who became the new Prime Minister of Britain in 1916?",
      type: "mcq",
      answers: ["A) Asquith", "B) Lloyd George", "C) Churchill"],
      correct: 1
    },
    {
      question: "Which battle ended in November 1916 after 600,000 casualties?",
      type: "mcq",
      answers: ["A) The Somme", "B) Verdun", "C) Jutland"],
      correct: 0
    }
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
