(function () {
  "use strict";

  function init(mount, api) {
    if (mount.dataset.initialized === "1") return;
    mount.dataset.initialized = "1";

    fetch("./breakout3/breakout3.html")
      .then(r => r.text())
      .then(html => {
        mount.innerHTML = html;
        wire(mount, api);
      })
      .catch(err => console.error("b3 html load error", err));
  }

  function wire(root, api) {
    function showPage(pageToShow) {
      root.querySelectorAll(".page").forEach((page) => {
        page.classList.remove("active");
        page.classList.add("hidden");
      });

      root.querySelector("#b3-decryption-success")?.classList.add("hidden");
      root.querySelector("#b3-challenge-2-success")?.classList.add("hidden");

      const target = root.querySelector("#" + pageToShow);
      if (target) {
        target.classList.add("active");
        target.classList.remove("hidden");
      } else {
        console.error(`b3 page not found: ${pageToShow}`);
      }
    }

    showPage("b3-page-intro");

    // ✅ bunker code: from Part 1 stored code
    root.querySelector("#b3-check-code").addEventListener("click", () => {
      const input = root.querySelector("#b3-bunker-code").value.trim();
      const expected = api.getBunkerCode();
      if (expected && input === expected) {
        root.querySelector("#b3-code-error").classList.add("hidden");
        showPage("b3-challenge-1");
      } else {
        root.querySelector("#b3-code-error").classList.remove("hidden");
      }
    });

    // ✅ Decryption
    root.querySelector("#b3-check-decryption").addEventListener("click", () => {
      let userAnswer = root.querySelector("#b3-decryption-input").value.trim().toLowerCase();
      userAnswer = userAnswer.replace(/[.,]/g, "").replace(/\s+/g, " ");
      const correctMessage = "this is a test message we are offering mexico the territory of texas new mexico and arizona";

      if (userAnswer === correctMessage) {
        root.querySelector("#b3-decryption-feedback").classList.add("hidden");
        root.querySelector("#b3-decryption-success").classList.remove("hidden");

        // prevent duplicate listener
        const btn = root.querySelector("#b3-go-to-transition");
        if (!btn.dataset.bound) {
          btn.dataset.bound = "1";
          btn.addEventListener("click", () => showPage("b3-transition-page"));
        }
      } else {
        root.querySelector("#b3-decryption-feedback").classList.remove("hidden");
      }
    });

    // ✅ Challenge 2
    root.querySelector("#b3-start-challenge-2").addEventListener("click", () => {
      showPage("b3-challenge-2");
      loadQuestion();
    });

    const questions = [
      { question: "What was Germany's strategy in 1917?", answers: ["Total war", "War of attrition", "Defensive retreat"], correct: 1 },
      { question: "Which major event took place in April 1917?", answers: ["Zimmermann Telegram", "U.S. enters the war", "Battle of the Somme"], correct: 1 },
      { question: "What was the significance of the Russian Revolution?", answers: ["Russia exited the war", "Germany surrendered", "Britain gained troops"], correct: 0 },
      { question: "What was the purpose of unrestricted submarine warfare?", answers: ["To attack military fleets", "To cut off Britain's food supply", "To defend German waters"], correct: 1 }
    ];

    let currentQuestionIndex = 0;

    function loadQuestion() {
      const questionText = root.querySelector("#b3-question-text");
      const answersContainer = root.querySelector("#b3-answers-container");
      const feedback = root.querySelector("#b3-quiz-feedback");
      const nextButton = root.querySelector("#b3-next-question");

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

    root.querySelector("#b3-next-question").addEventListener("click", () => {
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
      } else {
        root.querySelector("#b3-challenge-2-success").classList.remove("hidden");
        const btn = root.querySelector("#b3-go-to-challenge-3");
        btn.classList.remove("hidden");
        if (!btn.dataset.bound) {
          btn.dataset.bound = "1";
          btn.addEventListener("click", () => {
            showPage("b3-challenge-3");
            loadRandomLetter();
          });
        }
      }
    });

    // ✅ Letters (challenge 3)
    const letters = [
      { text: "Today, the trenches are flooded with rain...", front: "Western", country: "British", year: "1916" },
      { text: "Our officers are worried...", front: "Eastern", country: "Russian", year: "1915" },
      { text: "Shells fall all around us...", front: "Western", country: "French", year: "1917" }
    ];

    let availableLetters = [...letters];
    let currentLetter = null;

    function loadRandomLetter() {
      if (availableLetters.length === 0) {
        root.querySelector("#b3-next-letter").classList.add("hidden");
        root.querySelector("#b3-go-to-next-section").classList.remove("hidden");
        return;
      }
      const idx = Math.floor(Math.random() * availableLetters.length);
      currentLetter = availableLetters.splice(idx, 1)[0];
      root.querySelector("#b3-letter-text").innerText = currentLetter.text;
    }

    function resetAnswerColors() {
      root.querySelectorAll(".answer-button").forEach(btn => (btn.style.backgroundColor = ""));
    }

    root.querySelectorAll(".answer-button").forEach((button) => {
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
      const greens = root.querySelectorAll(".answer-button[style='background-color: green;']");
      if (greens.length >= 2) {
        if (availableLetters.length > 0) root.querySelector("#b3-next-letter").classList.remove("hidden");
        else root.querySelector("#b3-go-to-next-section").classList.remove("hidden");
      }
    }

    root.querySelector("#b3-next-letter").addEventListener("click", () => {
      loadRandomLetter();
      resetAnswerColors();
      root.querySelector("#b3-next-letter").classList.add("hidden");
    });

    root.querySelector("#b3-go-to-next-section").addEventListener("click", () => showPage("b3-transition-challenge-4"));
    root.querySelector("#b3-start-challenge-4").addEventListener("click", () => showPage("b3-challenge-4"));

    // ✅ Timeline drag/drop (challenge 4)
    const timelineEvents = root.querySelectorAll(".timeline-event");
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

      event.addEventListener("dragover", (e) => e.preventDefault());

      event.addEventListener("drop", function () {
        if (draggedItem && draggedItem !== this) {
          const parent = this.parentNode;
          const items = Array.from(parent.children);
          const draggedIndex = items.indexOf(draggedItem);
          const droppedIndex = items.indexOf(this);
          if (draggedIndex < droppedIndex) parent.insertBefore(draggedItem, this.nextSibling);
          else parent.insertBefore(draggedItem, this);
        }
      });
    });

    root.querySelector("#b3-submit-timeline").addEventListener("click", () => {
      const correctOrder = ["1914", "1915", "1916", "1917", "1918", "1918"];
      const userOrder = [];
      root.querySelectorAll(".timeline-event").forEach((event) => userOrder.push(event.getAttribute("data-year")));

      const feedback = root.querySelector("#b3-timeline-feedback");
      if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
        feedback.innerText = "✅ Correct order! You've unlocked the final key.";
        feedback.style.color = "green";
        root.querySelector("#b3-proceed-after-timeline").classList.remove("hidden");
      } else {
        feedback.innerText = "❌ Incorrect order! Try again.";
        feedback.style.color = "red";
      }
      feedback.classList.remove("hidden");
    });

    root.querySelector("#b3-proceed-after-timeline").addEventListener("click", () => showPage("b3-challenge-5-intro"));
    root.querySelector("#b3-start-challenge-5").addEventListener("click", () => showPage("b3-challenge-5"));

    // ✅ Challenge 5 drag/drop map
    const draggables = root.querySelectorAll(".draggable");
    const dropZones = root.querySelectorAll(".drop-zone");

    draggables.forEach(d => {
      d.addEventListener("dragstart", function () {
        draggedItem = this;
        setTimeout(() => (this.style.display = "none"), 0);
      });
      d.addEventListener("dragend", function () {
        setTimeout(() => {
          if (draggedItem) draggedItem.style.display = "block";
          draggedItem = null;
        }, 0);
      });
    });

    dropZones.forEach(zone => {
      zone.addEventListener("dragover", (e) => e.preventDefault());
      zone.addEventListener("drop", function () {
        if (!draggedItem) return;
        this.textContent = draggedItem.textContent;
        this.setAttribute("data-placed", draggedItem.getAttribute("data-location"));
        draggedItem.style.display = "none";
      });
    });

    root.querySelector("#b3-check-map").addEventListener("click", () => {
      const correctPlacements = {
        "b3-zone-saint-quentin": "Saint-Quentin",
        "b3-zone-marne": "Marne River",
        "b3-zone-amiens": "Amiens",
        "b3-zone-compiegne": "Compiègne"
      };

      let allCorrect = true;

      for (const zoneID in correctPlacements) {
        const zone = root.querySelector("#" + zoneID);
        if (zone.getAttribute("data-placed") !== correctPlacements[zoneID]) {
          allCorrect = false;
          zone.style.backgroundColor = "#ff4d4d";
        } else {
          zone.style.backgroundColor = "#4CAF50";
        }
      }

      const feedback = root.querySelector("#b3-map-feedback");
      if (allCorrect) {
        feedback.innerText = "✅ All positions correct!";
        feedback.style.color = "green";
        root.querySelector("#b3-proceed-to-next-section").classList.remove("hidden");
      } else {
        feedback.innerText = "❌ Some positions are incorrect. Try again.";
        feedback.style.color = "red";
      }
      feedback.classList.remove("hidden");
    });

    root.querySelector("#b3-proceed-to-next-section").addEventListener("click", () => {
      // ✅ Complete Part 3 -> go final
      api.completePart("b3");
    });
  }

  window.Breakouts = window.Breakouts || {};
  window.Breakouts.b3 = { init };
})();
