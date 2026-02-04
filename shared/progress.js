(() => {
  const STORAGE_KEY = "ww1_breakout_state_v1";

  const defaultState = () => ({
    part1: { completed: false },
    part2: { completed: false },
    part3: { completed: false },
    // optional shared info
    meta: { lastVisited: null }
  });

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      // merge defensively
      return {
        ...defaultState(),
        ...parsed,
        part1: { ...defaultState().part1, ...(parsed.part1 || {}) },
        part2: { ...defaultState().part2, ...(parsed.part2 || {}) },
        part3: { ...defaultState().part3, ...(parsed.part3 || {}) },
        meta: { ...defaultState().meta, ...(parsed.meta || {}) }
      };
    } catch {
      return defaultState();
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function markPartComplete(partNumber) {
    const state = loadState();
    const key = `part${partNumber}`;
    if (!state[key]) return;
    state[key].completed = true;
    state.meta.lastVisited = key;
    saveState(state);
  }

  function setLastVisited(partNumber) {
    const state = loadState();
    state.meta.lastVisited = `part${partNumber}`;
    saveState(state);
  }

  function resetAll() {
    saveState(defaultState());
  }

  function getProgressPercent(state) {
    const total = 3;
    const done =
      (state.part1.completed ? 1 : 0) +
      (state.part2.completed ? 1 : 0) +
      (state.part3.completed ? 1 : 0);
    return Math.round((done / total) * 100);
  }

  // Expose globally (safe)
  window.SharedProgress = {
    loadState,
    saveState,
    markPartComplete,
    setLastVisited,
    resetAll,
    getProgressPercent
  };
})();
