(function () {
  "use strict";

  function init(mount, api) {
    if (mount.dataset.initialized === "1") return;
    mount.dataset.initialized = "1";

    // Inject HTML
    fetch("./breakout1/breakout1.html")
      .then(r => r.text())
      .then(html => {
        mount.innerHTML = html;
        wire(mount, api);
      })
      .catch(err => console.error("b1 html load error", err));
  }

  function wire(root, api) {
    const pages = root.querySelectorAll(".page");

    const setActivePage = (pageId) => {
      pages.forEach((p) => {
        p.classList.remove("active");
        p.style.display = "none";
      });
      const target = root.querySelector("#" + pageId);
      if (target) {
        target.classList.add("active");
        target.style.display = "flex";
      } else {
        console.error(`b1 page not found: ${pageId}`);
      }
    };

    // Force intro
    setActivePage("b1-page-intro");

    // Codes
    const validCodes = [
      "12345","54321","67890","09876","11223","33445","55667","77889","99000"
    ];
    let generatedCode = "";

    const generateCode = () => {
      generatedCode = Math.floor(10000 + Math.random() * 90000).toString();
      validCodes.push(generatedCode);
      root.querySelector("#b1-generated-code").textContent = generatedCode;
    };

    const validateCode = (inputCode) => validCodes.includes(inputCode);

    // Challenge 1 quiz
    const reto1Questions = [ /* unchanged data */ 
      {question:"What policy did Great Britain adopt in 1889 to maintain naval superiority?",answers:["Two Power Standard","Naval Arms Act","Imperial Defense Strategy"],correct:"Two Power Standard"},
      {question:"Which German admiral advocated for a stronger navy to rival Britain?",answers:["Alfred von Tirpitz","Otto von Bismarck","Wilhelm II"],correct:"Alfred von Tirpitz"},
      {question:"What was Kaiser Wilhelm II's approach to imperialism called?",answers:["Weltpolitik","Lebensraum","Pax Germania"],correct:"Weltpolitik"},
      {question:"Which war conference in 1912 showed Germany's preparation for war?",answers:["German War Conference","Congress of Vienna","Berlin Conference"],correct:"German War Conference"},
      {question:"What was the alliance between Germany, Austria-Hungary, and Italy called?",answers:["Triple Alliance","Triple Entente","Central Powers"],correct:"Triple Alliance"},
      {question:"By what year had France, Britain, and Russia formed the Triple Entente?",answers:["1907","1897","1912"],correct:"1907"},
      {question:"What colonial rivalry between Germany and France almost led to war?",answers:["Moroccan Crises","Alsace-Lorraine Conflict","Berlin Conference"],correct:"Moroccan Crises"},
      {question:"Which territories did Germany annex after the Franco-Prussian War?",answers:["Alsace and Lorraine","Saarland and Rhineland","Bohemia and Moravia"],correct:"Alsace and Lorraine"},
      {question:"What nationalist organization was Gavrilo Princip a member of?",answers:["The Black Hand","The Iron Guard","The Serbian League"],correct:"The Black Hand"},
      {question:"What term describes France's desire for revenge after losing Alsace-Lorraine?",answers:["Revanchism","Imperialism","Nationalism"],correct:"Revanchism"},
      {question:"Which empire was the most ethnically diverse in Europe before WWI?",answers:["Austro-Hungarian Empire","German Empire","Russian Empire"],correct:"Austro-Hungarian Empire"},
      {question:"What movement in Serbia aimed to unite the Balkans and gain independence?",answers:["Balkan Nationalism","Panslavism","Unification Movement"],correct:"Balkan Nationalism"},
      {question:"What belief fueled Britain's desire to maintain the strongest navy?",answers:["Nationalism","Imperialism","Isolationism"],correct:"Nationalism"},
      {question:"What historian compared the pre-WWI period to modern globalization?",answers:["Margaret McMillan","Barbara Tuchman","John Keegan"],correct:"Margaret McMillan"},
      {question:"Which German chancellor emphasized the need to avoid war in 1898?",answers:["Otto von Bismarck","Alfred von Tirpitz","Kaiser Wilhelm II"],correct:"Otto von Bismarck"}
    ];
    let currentReto1Index = 0;

    const loadReto1Question = () => {
      const qEl = root.querySelector("#b1-question-text");
      const aEl = root.querySelector("#b1-answers");
      const q = reto1Questions[currentReto1Index];
      qEl.textContent = q.question;
      aEl.innerHTML = "";
      [...q.answers].sort(() => Math.random() - 0.5).forEach((ans) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.classList.add("answer-option");
        btn.addEventListener("click", () => {
          if (ans === q.correct) {
            currentReto1Index++;
            if (currentReto1Index < reto1Questions.length) loadReto1Question();
            else {
              alert("You have completed Challenge 1!");
              setActivePage("b1-transition-page");
            }
          } else alert("Incorrect! Try again.");
        });
        aEl.appendChild(btn);
      });
    };

    // Challenge 2
    const reto2Questions = [
      { question:"How were the Triple Alliance countries known in 1915?",answers:["Central Powers","Triple Entente","Allied Forces"],correct:"Central Powers"},
      { question:"How were the Triple Entente countries known in 1915?",answers:["Central Powers","The Allies","Eastern Bloc"],correct:"The Allies"},
      { question:"Which European power left the Triple Alliance before the war started?",answers:["Italy","Austria-Hungary","Germany"],correct:"Italy"},
      { question:"Which two eastern powers joined the Central Powers during the war?",answers:["Bulgaria and Ottoman Empire","Romania and Portugal","Serbia and Greece"],correct:"Bulgaria and Ottoman Empire"}
    ];
    let currentReto2Index = 0;

    const startChallenge2 = () => {
      root.querySelector("#b1-map-container").classList.add("hidden");
      root.querySelector("#b1-questions-container-2").classList.remove("hidden");
      loadReto2Question();
    };

    const loadReto2Question = () => {
      const qText = root.querySelector("#b1-question-text-2");
      const answers = root.querySelector("#b1-answers-container-2");
      const nextBtn = root.querySelector("#b1-next-button-2");
      const err = root.querySelector("#b1-error-message-2");

      qText.textContent = reto2Questions[currentReto2Index].question;
      answers.innerHTML = "";
      err.classList.add("hidden");
      nextBtn.classList.add("hidden");

      [...reto2Questions[currentReto2Index].answers].sort(() => Math.random() - 0.5).forEach((ans) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.classList.add("button");
        btn.addEventListener("click", () => {
          if (ans === reto2Questions[currentReto2Index].correct) {
            nextBtn.classList.remove("hidden");
            err.classList.add("hidden");
          } else {
            err.classList.remove("hidden");
            nextBtn.classList.add("hidden");
          }
        });
        answers.appendChild(btn);
      });
    };

    const loadNextQuestion2 = () => {
      currentReto2Index++;
      if (currentReto2Index < reto2Questions.length) loadReto2Question();
      else {
        alert("You have completed Challenge 2!");
        generateCode();
        setActivePage("b1-transition-to-challenge-3");
      }
    };

    // Challenge 3
    const reto3Questions = [
      {question:"What were the main alliances dividing Europe before World War I?",answers:["The Triple Entente and the Triple Alliance","The League of Nations and the Axis","The Franco-Russian Alliance and the Treaty of Versailles"],correct:"The Triple Entente and the Triple Alliance"},
      {question:"Which countries were part of the Triple Entente?",answers:["France, Germany, and Great Britain","France, Great Britain, and Russia","Great Britain, Russia, and Austria-Hungary"],correct:"France, Great Britain, and Russia"},
      {question:"Who was assassinated on June 28, 1914, in Sarajevo?",answers:["Nicholas II","Archduke Franz Ferdinand","Gavrilo Princip"],correct:"Archduke Franz Ferdinand"},
      {question:"Which country was accused of supporting the assassination of Archduke Franz Ferdinand?",answers:["Serbia","Russia","France"],correct:"Serbia"},
      {question:"Which empire declared war on Serbia after it rejected the ultimatum?",answers:["Germany","Austria-Hungary","Turkey"],correct:"Austria-Hungary"},
      {question:"Why did Nicholas II of Russia order the mobilization of the Russian army?",answers:["To defend Serbia","To invade Germany","To respond to the naval blockade"],correct:"To defend Serbia"},
      {question:"What was Germany's military plan for a two-front war called?",answers:["Schlieffen Plan","Plan XVII","Operation Barbarossa"],correct:"Schlieffen Plan"},
      {question:"Why did Germany invade Belgium in 1914?",answers:["To capture resources","To bypass and quickly defeat France","To prevent a Russian attack"],correct:"To bypass and quickly defeat France"},
      {question:"Which country declared war on Germany after the invasion of Belgium?",answers:["United States","Italy","Great Britain"],correct:"Great Britain"},
      {question:"Which battle marked the halting of the German advance near Paris?",answers:["Battle of the Marne","Battle of Verdun","Battle of Ypres"],correct:"Battle of the Marne"}
    ];
    let currentReto3Index = 0;

    const loadReto3Question = () => {
      if (currentReto3Index >= reto3Questions.length) {
        alert("You have completed Challenge 3!");
        loadFinalPage();
        return;
      }

      const qEl = root.querySelector("#b1-question-3-text");
      const aEl = root.querySelector("#b1-answers-3-container");
      const err = root.querySelector("#b1-error-3-message");
      err.classList.add("hidden");
      aEl.innerHTML = "";

      const q = reto3Questions[currentReto3Index];
      qEl.textContent = q.question;

      q.answers.forEach((ans) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.classList.add("answer-option");
        btn.addEventListener("click", () => {
          if (ans === q.correct) {
            currentReto3Index++;
            loadReto3Question();
          } else {
            err.classList.remove("hidden");
          }
        });
        aEl.appendChild(btn);
      });
    };

    const loadFinalPage = async () => {
      setActivePage("b1-final-page");

      // keep your exact external CSV logic
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/1-RRMrn93y7YkyIDNQWF3VsbqwisvKTDf0xKwoI0KorQ/export?format=csv"
      );
      const text = await response.text();
      const codes = text.split("\n").map(s => s.trim()).filter(Boolean);
      const randomCode = codes[Math.floor(Math.random() * codes.length)] || generatedCode || "00000";

      root.querySelector("#b1-final-code").textContent = randomCode;

      // 🔗 CONNECT: this code unlocks Part 3 bunker
      api.setBunkerCode(randomCode);

      // ✅ Mark Part 1 completed and move to Part 2
      api.completePart("b1");
    };

    // UI wiring
    root.querySelector("#b1-start-game").addEventListener("click", () => {
      setActivePage("b1-challenge-1");
      loadReto1Question();
    });

    root.querySelector("#b1-to-challenge-2").addEventListener("click", () => {
      setActivePage("b1-challenge-2");
    });

    root.querySelector("#b1-start-challenge-2").addEventListener("click", startChallenge2);
    root.querySelector("#b1-next-button-2").addEventListener("click", loadNextQuestion2);

    root.querySelector("#b1-verify-code").addEventListener("click", () => {
      const codeInput = root.querySelector("#b1-access-code").value.trim();
      const err = root.querySelector("#b1-code-error-message");
      if (validateCode(codeInput)) {
        err.classList.add("hidden");
        setActivePage("b1-challenge-3");
        loadReto3Question();
      } else {
        err.classList.remove("hidden");
      }
    });

    // optional shortcut on intro (if you had code input)
    root.querySelector("#b1-code-verify").addEventListener("click", () => {
      const codeInput = root.querySelector("#b1-code-input").value.trim();
      const err = root.querySelector("#b1-code-error");
      if (validateCode(codeInput)) {
        err.classList.add("hidden");
        setActivePage("b1-challenge-3");
        loadReto3Question();
      } else {
        err.classList.remove("hidden");
      }
    });
  }

  window.Breakouts = window.Breakouts || {};
  window.Breakouts.b1 = { init };
})();
