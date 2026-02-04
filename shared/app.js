(function () {
  "use strict";

  function wire(root, api) {
    // Páginas SOLO dentro del breakout1
    const pages = root.querySelectorAll(".page");

    function setActivePage(pageId) {
      pages.forEach((p) => {
        p.classList.remove("active");
        p.classList.add("hidden");
      });
      const target = root.querySelector("#" + pageId);
      if (!target) {
        console.error("Missing page:", pageId);
        return;
      }
      target.classList.add("active");
      target.classList.remove("hidden");
    }

    // Estado local del breakout (no global)
    let currentReto1Index = 0;
    let currentReto2Index = 0;
    let currentReto3Index = 0;

    // ✅ Botones (en scope)
    const btnStart = root.querySelector("#b1-start-game");
    const btnToCh2 = root.querySelector("#b1-to-challenge-2");
    const btnStartCh2 = root.querySelector("#b1-start-challenge-2");
    const btnNext2 = root.querySelector("#b1-next-button-2");
    const btnVerify3 = root.querySelector("#b1-verify-code");

    // Si faltan, es que el HTML no se montó
    if (!btnStart) {
      console.error("b1-start-game not found (HTML not mounted?)");
      return;
    }

    // ✅ Inicio
    setActivePage("b1-page-intro");

    btnStart.addEventListener("click", () => {
      setActivePage("b1-challenge-1");
      loadReto1Question();
      api?.progress?.set?.(1); // opcional
    });

    btnToCh2?.addEventListener("click", () => {
      setActivePage("b1-challenge-2");
      api?.progress?.set?.(2);
    });

    // … aquí pegas tu lógica de reto1/2/3
    // IMPORTANTE: usa root.querySelector para los elementos

    function loadReto1Question() {
      const qEl = root.querySelector("#b1-question-text");
      const aEl = root.querySelector("#b1-answers");
      // ... tu código sin tocar dificultad
    }

    // Challenge 2 start
    btnStartCh2?.addEventListener("click", () => {
      root.querySelector("#b1-map-container")?.classList.add("hidden");
      root.querySelector("#b1-questions-container-2")?.classList.remove("hidden");
      loadReto2Question();
    });

    function loadReto2Question() {
      // ... igual, pero root.querySelector
    }

    btnNext2?.addEventListener("click", () => {
      // ... avanzar reto2
      // al terminar:
      // setActivePage("b1-transition-to-challenge-3");
    });

    btnVerify3?.addEventListener("click", () => {
      const input = root.querySelector("#b1-access-code")?.value?.trim();
      const err = root.querySelector("#b1-code-error-message");
      if (isValidCode(input)) {
        err?.classList.add("hidden");
        setActivePage("b1-challenge-3");
        loadReto3Question();
        api?.progress?.set?.(3);
      } else {
        err?.classList.remove("hidden");
      }
    });

    function isValidCode(code) {
      // tu validación, igual que antes
      return !!code && code.length === 5;
    }

    function loadReto3Question() {
      // ... al terminar:
      // setActivePage("b1-final-page");
      // api?.complete?.b1?.();
    }
  }

  function mountFromTemplate(scopeId, tplId) {
    const mount = document.getElementById(scopeId);
    if (!mount) throw new Error("Missing #" + scopeId);

    const tpl = document.getElementById(tplId);
    if (!tpl) throw new Error("Missing #" + tplId);

    mount.innerHTML = "";
    mount.appendChild(tpl.content.cloneNode(true));
    return mount;
  }

  function init(api) {
    const root = mountFromTemplate("b1-scope", "tpl-b1");
    wire(root, api);
  }

  window.Breakouts = window.Breakouts || {};
  window.Breakouts.b1 = { init };
})();
window.addEventListener("load", () => {
  console.log("✅ FORCE BIND (load)");

  const startBtn =
    document.getElementById("btn-start") ||
    document.querySelector("button")?.textContent?.trim() === "Start"
      ? document.querySelector("button")
      : document.querySelector("button#start, button.start, #start");

  const resetBtn =
    document.getElementById("btn-reset") ||
    Array.from(document.querySelectorAll("button")).find(b => b.textContent.trim().toLowerCase().includes("reset"));

  console.log("startBtn:", startBtn, "resetBtn:", resetBtn);

  if (startBtn) {
    startBtn.onclick = () => {
      console.log("▶ Start clicked");

      // Mostrar pantalla b1
      const b1 = document.getElementById("screen-b1");
      const home = document.getElementById("screen-home");
      if (home) home.classList.add("hidden");
      if (b1) b1.classList.remove("hidden");

      // Llamar breakout1
      if (window.Breakouts?.b1?.init) {
        window.Breakouts.b1.init({
          progress: { set() {} },
          setBunkerCode() {},
          completePart() {},
        });
      } else {
        console.error("❌ Breakouts.b1.init not found");
      }
    };
  } else {
    console.error("❌ Start button not found in DOM");
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      console.log("↩ Reset clicked");
      localStorage.clear();
      location.reload();
    };
  }
});
