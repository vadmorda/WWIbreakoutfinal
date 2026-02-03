(function () {
  "use strict";

  const KEY = "ww1_breakout_state_v1";

  function defaultState() {
    return {
      screen: "shell",
      completed: { b1: false, b2: false, b3: false },
      codes: { bunker: "" } // code produced in b1 to unlock b3
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return { ...defaultState(), ...parsed };
    } catch {
      return defaultState();
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function reset() {
    const st = defaultState();
    save(st);
    return st;
  }

  window.AppStorage = { load, save, reset };
})();
