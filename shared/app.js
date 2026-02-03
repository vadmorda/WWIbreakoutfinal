(function () {
  "use strict";
console.log("APP.JS loaded");
  const state = window.AppStorage.load();

  const screens = {
    shell: document.getElementById("screen-shell"),
    b1: document.getElementById("screen-b1"),
    b2: document.getElementById("screen-b2"),
    b3: document.getElementById("screen-b3"),
    final: document.getElementById("screen-final")
  };

  const progressEl = document.getElementById("app-progress");
  const btnStart = document.getElementById("app-start");
  const btnContinue = document.getElementById("app-continue");
  const btnReset = document.getElementById("app-reset");
  const btnRestart = document.getElementById("app-restart");

  const mountB1 = document.getElementById("b1-scope");
  const mountB2 = document.getElementById("b2-scope");
  const mountB3 = document.getElementById("b3-scope");

  let initialized = { b1: false, b2: false, b3: false };

  function persist() {
    window.AppStorage.save(state);
    window.AppProgress.renderProgress(progressEl, state, go);
    btnContinue.classList.toggle("hidden", state.screen === "shell");
  }

  function hideAll() {
    Object.values(screens).forEach((s) => s.classList.add("hidden"));
  }

  function canGo(target) {
    if (target === "b1") return true;
    if (target === "b2") return state.completed.b1;
    if (target === "b3") return state.completed.b2;
    if (target === "final") return state.completed.b3;
    if (target === "shell") return true;
    return false;
  }

  function go(target) {
    if (!canGo(target)) return;

    state.screen = target;
    hideAll();
    screens[target].classList.remove("hidden");

    // lazy-init breakouts (avoid double listeners)
    if (target === "b1" && !initialized.b1) {
      window.Breakouts?.b1?.init(mountB1, api);
      initialized.b1 = true;
    }
    if (target === "b2" && !initialized.b2) {
      window.Breakouts?.b2?.init(mountB2, api);
      initialized.b2 = true;
    }
    if (target === "b3" && !initialized.b3) {
      window.Breakouts?.b3?.init(mountB3, api);
      initialized.b3 = true;
    }

    persist();
  }

  const api = {
    go,
    completePart(partId) {
      state.completed[partId] = true;
      // auto-advance to next logical screen
      if (partId === "b1") go("b2");
      else if (partId === "b2") go("b3");
      else if (partId === "b3") go("final");
      persist();
    },
    setBunkerCode(code) {
      state.codes.bunker = String(code || "").trim();
      persist();
    },
    getBunkerCode() {
      return String(state.codes.bunker || "").trim();
    }
  };

  btnStart.addEventListener("click", () => go("b1"));
  btnContinue.addEventListener("click", () => go(state.screen === "shell" ? "b1" : state.screen));
  btnReset.addEventListener("click", () => {
    const fresh = window.AppStorage.reset();
    state.screen = fresh.screen;
    state.completed = fresh.completed;
    state.codes = fresh.codes;
    initialized = { b1: false, b2: false, b3: false };

    // reset mounts
    mountB1.innerHTML = "";
    mountB2.innerHTML = "";
    mountB3.innerHTML = "";

    go("shell");
  });
  btnRestart.addEventListener("click", () => btnReset.click());

  // initial render
  go(state.screen || "shell");
})();
