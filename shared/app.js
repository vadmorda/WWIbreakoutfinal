console.log("✅ app.js loaded");

(function () {
  "use strict";

  const LS_KEY = "ww1_breakout_state_v1";

  function loadState() {
    try {
      return (
        JSON.parse(localStorage.getItem(LS_KEY)) || {
          step: "shell", // shell | b1 | b2 | b3 | final
          completed: { b1: false, b2: false, b3: false },
          bunkerCode: null,
        }
      );
    } catch {
      return { step: "shell", completed: { b1: false, b2: false, b3: false }, bunkerCode: null };
    }
  }

  function saveState(state) {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }

  function showScreen(screenId) {
    // OJO: tu clase es app-screen, no screen
    document.querySelectorAll(".app-screen").forEach((s) => s.classList.add("hidden"));
    const el = document.getElementById(screenId);
    if (!el) {
      console.error("❌ Missing screen:", screenId);
      return;
    }
    el.classList.remove("hidden");
  }

  function makeApi(state) {
    return {
      progress: {
        set(n) {
          // si quieres sincronizar progress.js, deja esta línea:
          window.Progress?.set?.(n);
          // y guarda estado
          state.step = n === 1 ? "b1" : n === 2 ? "b2" : n === 3 ? "b3" : state.step;
          saveState(state);
        },
      },
      setBunkerCode(code) {
        state.bunkerCode = code;
        saveState(state);
      },
      getBunkerCode() {
        return state.bunkerCode;
      },
      completePart(part) {
        state.completed[part] = true;
        if (part === "b1") state.step = "b2";
        if (part === "b2") state.step = "b3";
        if (part === "b3") state.step = "final";
        saveState(state);
      },
      getState() {
        return state;
      },
    };
  }

  function startPart(part, api) {
    if (part === "b1") {
      showScreen("screen-b1");
      if (!window.Breakouts?.b1?.init) return console.error("❌ Breakouts.b1.init not found");
      window.Breakouts.b1.init(api);
      return;
    }
    if (part === "b2") {
      showScreen("screen-b2");
      if (!window.Breakouts?.b2?.init) return console.error("❌ Breakouts.b2.init not found");
      window.Breakouts.b2.init(api);
      return;
    }
    if (part === "b3") {
      showScreen("screen-b3");
      if (!window.Breakouts?.b3?.init) return console.error("❌ Breakouts.b3.init not found");
      window.Breakouts.b3.init(api);
      return;
    }
    if (part === "final") {
      showScreen("screen-final"); // si no existe aún, lo dejas para después
      return;
    }
    showScreen("screen-shell");
  }

  document.addEventListener("DOMContentLoaded", () => {
    // ✅ TUS IDs REALES
    const btnStart = document.getElementById("app-start");
    const btnContinue = document.getElementById("app-continue");
    const btnReset = document.getElementById("app-reset");

    if (!btnStart || !btnReset) {
      console.error("❌ Missing #app-start or #app-reset in index.html");
      return;
    }

    const state = loadState();
    const api = makeApi(state);

    // Estado inicial (si el alumno ya tenía progreso)
    if (state.step === "b1") startPart("b1", api);
    else if (state.step === "b2") startPart("b2", api);
    else if (state.step === "b3") startPart("b3", api);
    else if (state.step === "final") startPart("final", api);
    else showScreen("screen-shell");

    // Decide qué botón mostrar: Start vs Continue (sin rediseñar, solo hidden)
    const canContinue = state.step !== "shell";
    if (btnContinue) {
      btnContinue.classList.toggle("hidden", !canContinue);
    }

    btnStart.addEventListener("click", () => {
      console.log("▶ Start clicked");
      // start siempre arranca Part 1 desde cero de sesión (sin borrar localStorage)
      startPart("b1", api);
      api.progress.set(1);
    });

    btnContinue?.addEventListener("click", () => {
      console.log("▶ Continue clicked");
      // continuar donde estaba
      if (state.step === "b1") startPart("b1", api);
      else if (state.step === "b2") startPart("b2", api);
      else if (state.step === "b3") startPart("b3", api);
      else if (state.step === "final") startPart("final", api);
      else startPart("b1", api);
    });

    btnReset.addEventListener("click", () => {
      console.log("↩ Reset clicked");
      localStorage.removeItem(LS_KEY);
      // opcional: reset barra
      window.Progress?.reset?.();
      location.reload();
    });
  });
})();
