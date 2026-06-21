// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  const terminal = document.getElementById("terminalBody");
  if (terminal) runTerminal(terminal);
});

function runTerminal(el) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const script = [
    { text: "$ andyystudios build --site", cls: "line-cmd" },
    { text: "> generare structură...        ✓", cls: "ok" },
    { text: "> scriere componente...        ✓", cls: "ok" },
    { text: "> testare & optimizare...      ✓", cls: "ok" },
    { text: "> publicare site...            ✓", cls: "ok" },
    { text: "", cls: "" },
    { text: "Site live. Hai să-l construim pe al tău →", cls: "ok" }
  ];

  if (reduceMotion) {
    el.innerHTML = script.map(l => `<span class="${l.cls}">${l.text}</span>`).join("\n");
    return;
  }

  el.innerHTML = "";
  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= script.length) {
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      el.appendChild(cursor);
      return;
    }
    const line = script[lineIndex];
    const span = document.createElement("span");
    span.className = line.cls;
    el.appendChild(span);
    let charIndex = 0;

    function typeChar() {
      if (charIndex <= line.text.length) {
        span.textContent = line.text.slice(0, charIndex);
        charIndex++;
        setTimeout(typeChar, 18);
      } else {
        el.appendChild(document.createTextNode("\n"));
        lineIndex++;
        setTimeout(typeLine, 220);
      }
    }
    typeChar();
  }

  typeLine();
}
