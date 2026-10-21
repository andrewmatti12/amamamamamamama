(() => {
  "use strict";

  const STORAGE_KEY = "bouquet-for-maria";
  const FINAL = 6; // index of the seventh flower
  const CENTRE = { x: 200, y: 205 }; // middle of the bouquet, inside the 400x570 viewBox
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PETAL_COLOURS = ["#f4b6c0", "#f9d2d6", "#eea3ae", "#fde4e6", "#f6c1a8"];

  // ---------------------------------------------------------------------------
  // Flower designs
  // Each flower is layers of petals rotated around its centre. len/w are fractions
  // of the flower radius; each petal shades from `from` at the base to `to` at the tip.
  // ---------------------------------------------------------------------------
  const FLOWERS = [
    { // 1. Blush peony
      x: 110, y: 153, r: 42, turn: 8, accent: "#c95a70",
      layers: [
        { n: 9, len: 1, w: 0.62, from: "#eeaab5", to: "#fde6e8" },
        { n: 8, len: 0.8, w: 0.55, from: "#e8909f", to: "#fbd6db" },
        { n: 7, len: 0.6, w: 0.45, from: "#e07c8e", to: "#f7c3cb" },
        { n: 6, len: 0.4, w: 0.34, from: "#d86a7e", to: "#f2aebb" },
      ],
      centre: { kind: "bud", colour: "#cf5f74" },
    },
    { // 2. Ivory garden rose
      x: 200, y: 101, r: 42, turn: -12, accent: "#b58456",
      layers: [
        { n: 6, len: 1, w: 0.82, from: "#e9cfb2", to: "#fff8ef" },
        { n: 6, len: 0.78, w: 0.7, from: "#e3c19f", to: "#fdf0e0" },
        { n: 5, len: 0.56, w: 0.56, from: "#dab38c", to: "#f9e6d0" },
        { n: 5, len: 0.36, w: 0.42, from: "#d1a77d", to: "#f3dcc2" },
      ],
      centre: { kind: "spiral", colour: "#c99c74" },
    },
    { // 3. Coral ranunculus
      x: 290, y: 153, r: 42, turn: 20, accent: "#d0583d",
      layers: [
        { n: 10, len: 1, w: 0.5, from: "#ee8f72", to: "#ffd8c6" },
        { n: 9, len: 0.82, w: 0.46, from: "#ea8064", to: "#ffcdb8" },
        { n: 8, len: 0.64, w: 0.4, from: "#e57257", to: "#fbc0a8" },
        { n: 7, len: 0.47, w: 0.33, from: "#df664b", to: "#f8b298" },
        { n: 6, len: 0.3, w: 0.25, from: "#d65a40", to: "#f2a387" },
      ],
      centre: { kind: "bud", colour: "#9fb36f" },
    },
    { // 4. Pink cosmos
      x: 290, y: 257, r: 42, turn: 0, accent: "#cc5f8a",
      layers: [
        { n: 8, len: 1, w: 0.52, from: "#ef9dbd", to: "#fde3ee" },
      ],
      centre: { kind: "pollen", colour: "#f2c14e" },
    },
    { // 5. Lilac anemone
      x: 200, y: 309, r: 42, turn: 15, accent: "#7f5aa3",
      layers: [
        { n: 6, len: 1, w: 0.8, from: "#b598d0", to: "#f1e7f8" },
        { n: 6, len: 0.8, w: 0.66, from: "#c4aadc", to: "#f8f1fc", offset: 30 },
      ],
      centre: { kind: "anemone", colour: "#3a2347" },
    },
    { // 6. Peach dahlia
      x: 110, y: 257, r: 42, turn: 5, accent: "#cf6b34",
      layers: [
        { n: 14, len: 1, w: 0.32, shape: "pointed", from: "#f0a476", to: "#ffe1c9" },
        { n: 12, len: 0.78, w: 0.3, shape: "pointed", from: "#eb9566", to: "#fdd3b4" },
        { n: 10, len: 0.56, w: 0.26, shape: "pointed", from: "#e48654", to: "#f9c39f" },
        { n: 8, len: 0.36, w: 0.22, shape: "pointed", from: "#dc7646", to: "#f3b089" },
      ],
      centre: { kind: "bud", colour: "#c9663a" },
    },
    { // 7. Deep red rose, the final flower. "core" layers stay visible while it is still a bud.
      x: 200, y: 205, r: 54, turn: 0, accent: "#8e1b35",
      layers: [
        { n: 6, len: 1, w: 0.82, from: "#7d1530", to: "#c1405a" },
        { n: 6, len: 0.8, w: 0.7, from: "#861a35", to: "#cc4a63", offset: 30 },
        { n: 5, len: 0.6, w: 0.58, from: "#8f1f3a", to: "#d4566d", core: true },
        { n: 5, len: 0.42, w: 0.46, from: "#7a1530", to: "#c4445d", offset: 36, core: true },
      ],
      centre: { kind: "spiral", colour: "#5e0f24" },
    },
  ];

  const PETAL_PATHS = {
    round: (l, w) => `M0 0C${-w} ${-0.3 * l} ${-0.9 * w} ${-l} 0 ${-l}C${0.9 * w} ${-l} ${w} ${-0.3 * l} 0 0Z`,
    pointed: (l, w) => `M0 0C${-w} ${-0.35 * l} ${-0.3 * w} ${-0.8 * l} 0 ${-l}C${0.3 * w} ${-0.8 * l} ${w} ${-0.35 * l} 0 0Z`,
  };
  const HEART_PATH = "M0 4C-7-1-4-8 0-4.5C4-8 7-1 0 4Z";

  const round = (n) => Math.round(n * 10) / 10;
  const polar = (angle, distance) => {
    const rad = (angle * Math.PI) / 180;
    return { x: round(CENTRE.x + distance * Math.cos(rad)), y: round(CENTRE.y + distance * Math.sin(rad)) };
  };

  function drawFlower(spec, prefix) {
    let defs = "";
    let layers = "";
    spec.layers.forEach((layer, k) => {
      const id = `${prefix}-l${k}`;
      defs += `<linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${layer.from}"/><stop offset="1" stop-color="${layer.to}"/></linearGradient>`;
      const d = PETAL_PATHS[layer.shape || "round"](round(layer.len * spec.r), round(layer.w * spec.r));
      const offset = (layer.offset ?? k * 23) + spec.turn;
      let petals = "";
      for (let p = 0; p < layer.n; p++) {
        petals += `<path d="${d}" transform="rotate(${round(offset + (p * 360) / layer.n)})"/>`;
      }
      layers += `<g class="layer${layer.core ? " core" : ""}" style="--k:${k}" fill="url(#${id})">${petals}</g>`;
    });
    return `<defs>${defs}</defs>${layers}${drawCentre(spec.centre, spec.r)}`;
  }

  // Centres are drawn for a 42px flower and scaled to fit
  function drawCentre({ kind, colour }, r) {
    let shapes = "";
    if (kind === "spiral") {
      shapes = `<circle r="7" fill="${colour}"/><path d="M-4 1a4.5 4.5 0 1 1 5 4M-1-1a2 2 0 1 1 2 2" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="1.2" stroke-linecap="round"/>`;
    } else if (kind === "pollen") {
      shapes = `<circle r="9" fill="${colour}"/>`;
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI) / 6;
        shapes += `<circle cx="${round(6 * Math.cos(a))}" cy="${round(6 * Math.sin(a))}" r="1.1" fill="#c98a1f"/>`;
      }
      shapes += `<circle r="2" fill="#d99a2b"/>`;
    } else if (kind === "anemone") {
      shapes = `<circle r="8" fill="${colour}"/>`;
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI) / 8;
        shapes += `<circle cx="${round(10.5 * Math.cos(a))}" cy="${round(10.5 * Math.sin(a))}" r="1.4" fill="${colour}"/>`;
      }
      shapes += `<circle r="4" fill="#5a3a6b"/>`;
    } else {
      shapes = `<circle r="6" fill="${colour}"/><circle cx="-1.5" cy="-1.5" r="2.5" fill="rgba(255,255,255,.35)"/>`;
    }
    return `<g transform="scale(${round(r / 42)})">${shapes}</g>`;
  }

  // ---------------------------------------------------------------------------
  // Bouquet: paper, greenery, flowers, ribbon and the tucked-in photo
  // ---------------------------------------------------------------------------
  const RING_ANGLES = [210, 270, 330, 30, 90, 150]; // where flowers 1–6 sit around the centre

  function drawBouquet() {
    const leafPath = "M0 0C-15-17-10-45 0-58C10-45 15-17 0 0Z";
    let leaves = "";
    let filler = "";
    RING_ANGLES.forEach((angle) => {
      const gap = angle + 30;
      const base = polar(gap, 92);
      leaves += `<g transform="translate(${base.x} ${base.y}) rotate(${gap + 90})"><path d="${leafPath}" fill="url(#leaf)"/><path d="M0 0L0-50" stroke="#b9cfa5" stroke-width="1" opacity=".7"/></g>`;
      [-15, 15].forEach((spread) => {
        const spot = polar(gap + spread, 122);
        [[0, 0], [5, -3], [-4, -5], [2, 5], [-5, 3]].forEach(([dx, dy]) => {
          filler += `<circle cx="${round(spot.x + dx)}" cy="${round(spot.y + dy)}" r="2.6"/>`;
        });
      });
    });

    const stems = FLOWERS.map(({ x, y }) => {
      const tieX = round(200 + (x - 200) * 0.06);
      const endX = round(200 + (x - 200) * 0.12);
      return `<path d="M${x} ${y}Q${round((x + 200) / 2)} ${round((y + 425) / 2 + 20)} ${tieX} 425L${endX} 562"/>`;
    }).join("");

    const flowers = FLOWERS.map((spec, i) => `
      <g class="flower" data-index="${i}" transform="translate(${spec.x} ${spec.y})" tabindex="0" role="button">
        <g class="flower-enter" style="--i:${i === FINAL ? 6.5 : i}">
          <g class="flower-sway" style="--delay:${-i * 1.3}s">
            <g class="flower-bloom">
              <circle class="halo" r="${spec.r + 18}" fill="url(#halo)"/>
              ${drawFlower(spec, `b${i}`)}
              <path class="read-mark" d="${HEART_PATH}" transform="translate(${round(spec.r * 0.72)} ${round(spec.r * 0.72)}) scale(1.3)"/>
              <circle class="hit" r="${spec.r + 4}"/>
            </g>
          </g>
        </g>
      </g>`).join("");

    return `
      <defs>
        <radialGradient id="halo"><stop offset=".55" stop-color="#fff4d6" stop-opacity=".95"/><stop offset="1" stop-color="#fff4d6" stop-opacity="0"/></radialGradient>
        <linearGradient id="leaf" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#5d7d4c"/><stop offset="1" stop-color="#9cb787"/></linearGradient>
        <linearGradient id="paper-front" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdf4ec"/><stop offset="1" stop-color="#f2ddd2"/></linearGradient>
        <linearGradient id="paper-back" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7dcdc"/><stop offset="1" stop-color="#eec4c6"/></linearGradient>
      </defs>
      <path d="M200 440L18 205Q40 60 200 28Q360 60 382 205Z" fill="#f3e4d6"/>
      <path d="M200 440L40 180Q90 70 200 50Q310 70 360 180Z" fill="url(#paper-back)"/>
      <g>${leaves}</g>
      <g fill="none" stroke="#6f8f5a" stroke-width="4" stroke-linecap="round">${stems}</g>
      <g fill="#fffdf8" stroke="#ead8cf" stroke-width=".8">${filler}</g>
      <path d="M66 300Q200 340 334 300L232 530L168 530Z" fill="#efc2c6"/>
      <path d="M78 316Q200 350 322 316L228 528L172 528Z" fill="url(#paper-front)" stroke="rgba(150,90,80,.18)"/>
      <path d="M200 333Q262 333 322 316L228 528L200 528Z" fill="#ecd3c9" opacity=".55"/>
      <g class="ribbon" id="ribbon" tabindex="0" role="button" aria-label="The ribbon">
        <path d="M124 412L276 412L273 428L127 428Z" fill="#b8475e"/>
        <path d="M196 424L176 474L186 469L192 478L203 426Z" fill="#a83d55"/>
        <path d="M204 424L224 474L214 469L208 478L197 426Z" fill="#a83d55"/>
        <path d="M200 420C170 392 146 402 156 422C164 438 186 432 200 420Z" fill="#c95a70"/>
        <path d="M200 420C230 392 254 402 244 422C236 438 214 432 200 420Z" fill="#c95a70"/>
        <ellipse cx="200" cy="420" rx="9" ry="8" fill="#9e3a52"/>
      </g>
      <g class="photo-card" id="photo-card" transform="translate(44 334) rotate(-10)" tabindex="0" role="button" aria-label="A photo of us">
        <rect x="2" y="3" width="72" height="88" rx="2" fill="rgba(80,40,40,.15)"/>
        <rect width="72" height="88" rx="2" fill="#fffdf9"/>
        <image href="images/us.jpeg" x="6" y="6" width="60" height="64" preserveAspectRatio="xMidYMid slice"/>
        <path d="${HEART_PATH}" transform="translate(36 79) scale(.9)" fill="#e07c8e"/>
      </g>
      ${flowers}`;
  }

  // ---------------------------------------------------------------------------
  // Saved progress (so she can come back to the same bouquet later)
  // ---------------------------------------------------------------------------
  function loadState() {
    const fresh = { read: [], finaleSeen: false };
    try {
      if (new URLSearchParams(location.search).has("reset")) localStorage.removeItem(STORAGE_KEY);
      return { ...fresh, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
    } catch (error) {
      console.warn("Could not load saved progress", error);
      return fresh;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("Could not save progress", error);
    }
  }

  const state = loadState();
  const isRead = (i) => state.read.includes(i);
  const othersRead = () => FLOWERS.every((_, i) => i === FINAL || isRead(i));

  // ---------------------------------------------------------------------------
  // Page elements
  // ---------------------------------------------------------------------------
  const $ = (id) => document.getElementById(id);
  const svg = $("bouquet-svg");
  const letter = $("letter");
  const photo = $("photo");
  let openIndex = null;

  svg.innerHTML = drawBouquet();
  const flowerEls = [...svg.querySelectorAll(".flower")];
  flowerEls.forEach((el, i) => el.setAttribute("aria-label", `Flower ${i + 1}: ${CONTENT.letters[i].question}`));
  if (!othersRead()) flowerEls[FINAL].classList.add("is-bud");

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach((screen) => screen.classList.toggle("is-active", screen.id === id));
    window.scrollTo(0, 0);
  }

  function updateBouquet() {
    const opened = state.read.length;
    const next = othersRead() && !isRead(FINAL) ? FINAL : FLOWERS.findIndex((_, i) => i !== FINAL && !isRead(i));

    flowerEls.forEach((el, i) => {
      el.classList.toggle("is-read", isRead(i));
      el.classList.toggle("is-next", i === next);
    });

    $("progress").innerHTML = FLOWERS.map((_, i) =>
      `<li class="${isRead(i) ? "is-read" : ""} ${i === FINAL ? "is-final" : ""}"><span class="visually-hidden">Flower ${i + 1}: ${isRead(i) ? "opened" : "not opened yet"}</span></li>`
    ).join("");

    const hints = CONTENT.hints;
    if (opened === FLOWERS.length) $("hint").textContent = hints.done;
    else if (othersRead()) $("hint").textContent = hints.finalReady;
    else if (opened > 0) $("hint").textContent = hints.progress(opened);
    else $("hint").textContent = hints.start;

    $("show-finale").hidden = !state.finaleSeen;
  }

  // ---------------------------------------------------------------------------
  // Little effects
  // ---------------------------------------------------------------------------
  let toastTimer;
  function toast(message) {
    const el = $("toast");
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 3200);
  }

  function replayAnimation(el, className) {
    el.classList.remove(className);
    void el.getBoundingClientRect(); // restart the animation
    el.classList.add(className);
    el.addEventListener("animationend", () => el.classList.remove(className), { once: true });
  }

  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  // Petals drifting down a container. `once` petals fall a single time and are removed.
  function spawnPetals(container, count, { once = false } = {}) {
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.setProperty("--size", `${10 + Math.random() * 10}px`);
      petal.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);
      petal.style.setProperty("--dur", `${10 + Math.random() * 10}s`);
      petal.style.setProperty("--colour", pick(PETAL_COLOURS));
      if (once) {
        petal.style.setProperty("--dur", `${5 + Math.random() * 4}s`);
        petal.style.setProperty("--delay", `${Math.random() * 2.5}s`);
        petal.classList.add("once");
        petal.addEventListener("animationend", () => petal.remove());
      } else {
        petal.style.setProperty("--delay", `${-Math.random() * 20}s`);
      }
      container.appendChild(petal);
    }
  }

  function burstFrom(el) {
    if (reduceMotion) return;
    const box = el.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
      const petal = document.createElement("span");
      const angle = (i / 10) * Math.PI * 2;
      const distance = 50 + Math.random() * 40;
      petal.className = "burst-petal";
      petal.style.left = `${box.left + box.width / 2}px`;
      petal.style.top = `${box.top + box.height / 2}px`;
      petal.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      petal.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
      petal.style.setProperty("--colour", pick(PETAL_COLOURS));
      petal.addEventListener("animationend", () => petal.remove());
      document.body.appendChild(petal);
    }
  }

  function floatHeart(x, y) {
    if (reduceMotion) return;
    const heart = document.createElement("span");
    heart.className = "tap-heart";
    heart.textContent = "♥";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.addEventListener("animationend", () => heart.remove());
    document.body.appendChild(heart);
  }

  // ---------------------------------------------------------------------------
  // Letters
  // ---------------------------------------------------------------------------
  function openFlower(i) {
    const flowerEl = flowerEls[i];
    if (i === FINAL && !othersRead()) {
      replayAnimation(flowerEl.querySelector(".flower-bloom"), "is-wiggling");
      toast(CONTENT.toasts.notYet);
      return;
    }
    replayAnimation(flowerEl.querySelector(".flower-bloom"), "is-blooming");
    burstFrom(flowerEl);
    setTimeout(() => showLetter(i), reduceMotion ? 0 : 420);
  }

  function showLetter(i) {
    const { label, question, answer } = CONTENT.letters[i];
    const isFinal = i === FINAL;
    openIndex = i;

    $("letter-flower").innerHTML = drawFlower(FLOWERS[i], "letter");
    $("letter-label").textContent = label;
    $("letter-question").textContent = question;
    $("letter-greeting").textContent = CONTENT.greeting;
    $("letter-body").textContent = answer;
    $("letter-signoff").textContent = CONTENT.signoff;
    $("letter-action").textContent = isFinal && !state.finaleSeen ? "Continue ❤️" : "Back to my bouquet";

    letter.style.setProperty("--accent", FLOWERS[i].accent);
    letter.classList.toggle("is-final", isFinal);
    $("letter-petals").replaceChildren();
    if (isFinal) spawnPetals($("letter-petals"), 18);

    letter.showModal();
    letter.querySelector(".letter").scrollTop = 0;

    if (!isRead(i)) {
      state.read.push(i);
      saveState();
    }
  }

  function closeSheet(dialog) {
    if (!dialog.open || dialog.classList.contains("is-closing")) return;
    dialog.classList.add("is-closing");
    setTimeout(() => {
      dialog.classList.remove("is-closing");
      dialog.close();
    }, reduceMotion ? 0 : 260);
  }

  function afterLetterClosed() {
    const closed = openIndex;
    openIndex = null;
    const finalFlower = flowerEls[FINAL];
    updateBouquet();

    if (closed === FINAL && !state.finaleSeen) {
      state.finaleSeen = true;
      saveState();
      updateBouquet();
      showFinale();
      return;
    }

    if (finalFlower.classList.contains("is-bud") && othersRead()) {
      setTimeout(() => {
        finalFlower.classList.remove("is-bud");
        burstFrom(finalFlower);
        toast(CONTENT.toasts.bloomed);
      }, 500);
    }
  }

  function showFinale() {
    showScreen("finale");
    spawnPetals($("petals"), 28, { once: true });
  }

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------
  $("open-bouquet").addEventListener("click", () => {
    $("seal").classList.add("is-broken");
    setTimeout(() => showScreen("bouquet"), reduceMotion ? 0 : 650);
  });

  svg.addEventListener("click", (event) => {
    const flowerEl = event.target.closest(".flower");
    if (flowerEl) openFlower(Number(flowerEl.dataset.index));
    else if (event.target.closest("#photo-card")) photo.showModal();
    else if (event.target.closest("#ribbon")) toast(CONTENT.toasts.ribbon);
  });

  svg.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = event.target.closest(".flower, #photo-card, #ribbon");
    if (!target) return;
    event.preventDefault();
    target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Tapping anywhere else on the bouquet screen lets a little heart float up
  $("bouquet").addEventListener("click", (event) => {
    if (event.target.closest(".flower, #photo-card, #ribbon, button")) return;
    floatHeart(event.clientX, event.clientY);
  });

  [letter, photo].forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target.closest("[data-close]") || event.target === dialog || event.target.classList.contains("photo-view")) {
        closeSheet(dialog);
      }
    });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeSheet(dialog);
    });
  });
  letter.addEventListener("close", afterLetterClosed);

  $("show-finale").addEventListener("click", showFinale);
  $("back-to-bouquet").addEventListener("click", () => showScreen("bouquet"));

  spawnPetals($("petals"), 12);
  updateBouquet();
})();
