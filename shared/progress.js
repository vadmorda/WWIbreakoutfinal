(function () {
  "use strict";

  function renderProgress(container, state, onGo) {
    const steps = [
      { id: "b1", label: "Part 1", unlocked: true },
      { id: "b2", label: "Part 2", unlocked: state.completed.b1 },
      { id: "b3", label: "Part 3", unlocked: state.completed.b2 },
      { id: "final", label: "Final", unlocked: state.completed.b3 }
    ];

    container.innerHTML = "";
    steps.forEach((s) => {
      const el = document.createElement("div");
      el.className = "app-step" + (s.unlocked ? " unlocked" : "") + (state.screen === s.id ? " active" : "");
      el.textContent = s.label;

      el.addEventListener("click", () => {
        if (!s.unlocked) return;
        onGo(s.id);
      });

      container.appendChild(el);
    });
  }

  window.AppProgress = { renderProgress };
})();
