/* Non-intrusive progress bar (shell only). Does NOT touch breakout pages unless they include it. */
:root {
  --shell-bg: rgba(0, 0, 0, 0.7);
  --shell-border: rgba(233, 69, 96, 0.8);
  --shell-text: #fff;
}

.ww1-shell {
  min-height: 100vh;
  margin: 0;
  font-family: "Special Elite", "Roboto", sans-serif;
  background: #000;
  color: var(--shell-text);
  display: flex;
  flex-direction: column;
}

.ww1-shell header {
  padding: 16px 12px 10px;
  border-bottom: 2px solid var(--shell-border);
  background: var(--shell-bg);
}

.ww1-shell h1 {
  margin: 0 0 10px;
  font-size: 1.6rem;
  color: #e94560;
}

.ww1-progress {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.ww1-progress .bar {
  position: relative;
  width: min(520px, 100%);
  height: 10px;
  border: 1px solid var(--shell-border);
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
}

.ww1-progress .fill {
  height: 100%;
  width: 0%;
  background: #e94560;
  transition: width 250ms ease-in-out;
}

.ww1-progress .steps {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 0.95rem;
}

.ww1-progress .badge {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.06);
}

.ww1-progress .badge.done {
  border-color: rgba(76, 175, 80, 0.8);
  background: rgba(76, 175, 80, 0.15);
}

.ww1-shell main {
  flex: 1;
  padding: 18px 12px 26px;
  display: grid;
  place-items: center;
}

.ww1-card {
  width: min(900px, 92vw);
  background: rgba(0, 0, 0, 0.75);
  border: 2px solid var(--shell-border);
  border-radius: 12px;
  padding: 18px 14px;
  text-align: center;
}

.ww1-card p {
  line-height: 1.4;
}

.ww1-actions {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.ww1-btn {
  padding: 12px 18px;
  font-size: 1.05rem;
  background-color: #e94560;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.ww1-btn.secondary {
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.25);
}

.ww1-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.ww1-small {
  opacity: 0.85;
  font-size: 0.95rem;
}
