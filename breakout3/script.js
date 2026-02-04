document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JavaScript loaded correctly.");

  function showPage(pageToShow) {
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
      page.classList.add("hidden");
    });

    document.getElementById("decryption-success")?.classList.add("hidden");
    document.getElementById("challenge-2-success")?.classList.add("hidden");

    const targetPage = document.getElementById(pageToShow);
    if (targetPage) {
      targetPage.classList.add("active");
      targetPage.classList.remove("hidden");
    } else {
      console.error(`❌ ERROR: Page '${pageToShow}' not found!`);
    }
  }

  // ✅ Handle Bunker Code Input (kept as is: 19423)
  document.getElementById("check-code")?.addEventListener("click", function () {
    const codeInput = document.getElementById("bunker-code");
    if (codeInput && codeInput.value.trim() === "19423") {
      showPage("challenge-1");
    } else {
      document.getElementById("code-error")?.classList.remove("hidden");
    }
  });

  // ✅ Decryption (unchanged)
  document.getElementById("check-decryption")?.addEventListener("click", function () {
    let userAnswer = document.getElementById("decryption-input").value.trim().toLowerCase();
    userAnswer = userAnswer.replace(/[.,]/g, "").replace(/\s+/g, " ");
    const correctMessage = "this is a test message we are offering mexico the territory of texas new mexico and arizona";

    if (userAnswer === correctMessage) {
      document.getElementById("decryption-feedback")?.classList.add("hidden");
      document.getElementById("decryption-success")?.classList.remove("hidden");

      document.getElementById("go-to-transition")?.addEventListener("click", function () {
        showPage("transition-page");
      }, { once: true });
    } else {
      document.getElementById("decryption-feedback")?.classList.remove("hidden");
    }
  });

  document.getElementById("start-challenge-2")?.addEventListener("click", function () {
    showPage("challenge-2");
    loadQuestion();
  });

  // ✅ QUIZ LOGIC (unchanged)
  const questions = [ /* unchanged */ 
    { question: "What was Germany's strategy in 1917?", answers: ["Total war", "War of attrition", "Defensive retreat"], correct: 1 },
    // ... keep the rest as provided ...
  ];
  let currentQuestionIndex = 0;

  function loadQuestion() {
    const questionText = document.getElementById("question-text");
    const answersContainer = document.getElementById("answers-container");
    const feedback = document.getElementById("quiz-feedback");
    const nextButton = document.getElementById("next-question");

    feedback.classList.add("hidden");
    nextButton.classList.add("hidden");
    answersContainer.innerHTML = "";

    const q = questions[currentQuestionIndex];
    questionText.innerText = q.question;

    q.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.innerText = answer;
      button.classList.add("answer-button");
      button.addEventListener("click", () => {
        if (index === q.correct) {
          feedback.innerText = "✅ Correct!";
          feedback.style.color = "green";
          nextButton.classList.remove("hidden");
        } else {
          feedback.innerText = "❌ Incorrect! Try again.";
          feedback.style.color = "red";
        }
        feedback.classList.remove("hidden");
      });
      answersContainer.appendChild(button);
    });
  }

  document.getElementById("next-question")?.addEventListener("click", function () {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      document.getElementById("challenge-2-success")?.classList.remove("hidden");
      const challenge3Button = document.getElementById("go-to-challenge-3");
      challenge3Button?.classList.remove("hidden");
      challenge3Button?.addEventListener("click", function () {
        showPage("challenge-3");
        loadRandomLetter();
      }, { once: true });
    }
  });

  // Letters logic (unchanged)
  const letters = [ /* unchanged */ 
    { text: "Today, the trenches are flooded with rain...", front: "Western", country: "British", year: "1916" },
    // ... keep the rest ...
  ];
  let availableLetters = [...letters];
  let currentLetter = null;

  function loadRandomLetter() {
    if (availableLetters.length === 0) {
      document.getElementById("next-letter")?.classList.add("hidden");
      document.getElementById("go-to-next-section")?.classList.remove("hidden");
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableLetters.length);
    currentLetter = availableLetters.splice(randomIndex, 1)[0];
    document.getElementById("letter-text").innerText = currentLetter.text;
  }

  document.querySelectorAll(".answer-button").forEach((button) => {
    button.addEventListener("click", function () {
      if (!currentLetter) return;
      const questionType = this.getAttribute("data-question");
      const selectedAnswer = this.getAttribute("data-answer");
      const correctAnswer = currentLetter[questionType];

      this.style.backgroundColor = (selectedAnswer === correctAnswer) ? "green" : "red";
      checkCompletion();
    });
  });

  function checkCompletion() {
    const selectedAnswers = document.querySelectorAll(".answer-button[style='background-color: green;']");
    if (selectedAnswers.length >= 2) {
      if (availableLetters.length > 0) {
        document.getElementById("next-letter")?.classList.remove("hidden");
      } else {
        document.getElementById("go-to-next-section")?.classList.remove("hidden");
      }
    }
  }

  document.getElementById("next-letter")?.addEventListener("click", function () {
    loadRandomLetter();
    document.querySelectorAll(".answer-button").forEach(button => button.style.backgroundColor = "");
    document.getElementById("next-letter")?.classList.add("hidden");
  });

  document.getElementById("go-to-next-section")?.addEventListener("click", function () {
    showPage("transition-challenge-4");
  });

  document.getElementById("start-challenge-4")?.addEventListener("click", function () {
    showPage("challenge-4");
  });

  // Timeline drag-drop + check (unchanged)
  const timelineEvents = document.querySelectorAll(".timeline-event");
  let draggedItem = null;

  timelineEvents.forEach((event) => {
    event.addEventListener("dragstart", function () {
      draggedItem = this;
      setTimeout(() => (this.style.display = "none"), 0);
    });
    event.addEventListener("dragend", function () {
      setTimeout(() => {
        if (draggedItem) draggedItem.style.display = "block";
        draggedItem = null;
      }, 0);
    });
    event.addEventListener("dragover", function (e) { e.preventDefault(); });
    event.addEventListener("drop", function () {
      if (draggedItem !== this) {
        let parent = this.parentNode;
        let items = Array.from(parent.children);
        let draggedIndex = items.indexOf(draggedItem);
        let droppedIndex = items.indexOf(this);
        if (draggedIndex < droppedIndex) parent.insertBefore(draggedItem, this.nextSibling);
        else parent.insertBefore(draggedItem, this);
      }
    });
  });

  document.getElementById("submit-timeline")?.addEventListener("click", function () {
    const correctOrder = ["1914", "1915", "1916", "1917", "1918", "1918"];
    let userOrder = [];
    document.querySelectorAll(".timeline-event").forEach((event) => userOrder.push(event.getAttribute("data-year")));

    const feedback = document.getElementById("timeline-feedback");
    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
      feedback.innerText = "✅ Correct order! You've unlocked the final key.";
      feedback.style.color = "green";
      document.getElementById("proceed-after-timeline")?.classList.remove("hidden");
    } else {
      feedback.innerText = "❌ Incorrect order! Try again.";
      feedback.style.color = "red";
    }
    feedback.classList.remove("hidden");
  });

  document.getElementById("proceed-after-timeline")?.addEventListener("click", function () {
    showPage("challenge-5-intro");
  });

  document.getElementById("start-challenge-5")?.addEventListener("click", function () {
    showPage("challenge-5");
  });

  // Map drag-drop (unchanged)
  const draggables = document.querySelectorAll(".draggable");
  const dropZones = document.querySelectorAll(".drop-zone");

  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", function () {
      draggedItem = this;
      setTimeout(() => (this.style.display = "none"), 0);
    });
    draggable.addEventListener("dragend", function () {
      setTimeout(() => {
        if (draggedItem) draggedItem.style.display = "block";
        draggedItem = null;
      }, 0);
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener("dragover", function (e) { e.preventDefault(); });
    zone.addEventListener("drop", function () {
      if (draggedItem) {
        this.textContent = draggedItem.textContent;
        this.setAttribute("data-placed", draggedItem.getAttribute("data-location"));
        draggedItem.style.display = "none";
      }
    });
  });

  document.getElementById("check-map")?.addEventListener("click", function () {
    const correctPlacements = {
      "zone-saint-quentin": "Saint-Quentin",
      "zone-marne": "Marne River",
      "zone-amiens": "Amiens",
      "zone-compiegne": "Compiègne"
    };

    let allCorrect = true;
    for (let zoneID in correctPlacements) {
      const zone = document.getElementById(zoneID);
      if (zone.getAttribute("data-placed") !== correctPlacements[zoneID]) {
        allCorrect = false;
        zone.style.backgroundColor = "#ff4d4d";
      } else {
        zone.style.backgroundColor = "#4CAF50";
      }
    }

    const fb = document.getElementById("map-feedback");
    if (allCorrect) {
      fb.innerText = "✅ All positions correct!";
      fb.style.color = "green";
      document.getElementById("proceed-to-next-section")?.classList.remove("hidden");
    } else {
      fb.innerText = "❌ Some positions are incorrect. Try again.";
      fb.style.color = "red";
    }
    fb.classList.remove("hidden");
  });

  // ✅ Final transition instead of non-existent next-section-id
  document.getElementById("proceed-to-next-section")?.addEventListener("click", function () {
    // Mark completion + go to final page
    window.SharedProgress?.markPartComplete(3);
    showPage("final-page");
  });

  // Back to hub
  document.getElementById("back-to-hub")?.addEventListener("click", function () {
    location.href = "../index.html";
  });
});

