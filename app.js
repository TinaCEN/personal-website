import { about, contents, filters, intro, profile, projects } from "./data.js?v=33";

const root = document.getElementById("root");
const TALK_PHRASES = ["Builder", "Designer", "Creator", "Developer", "Thinking", "Let’s Talk"];
const TALK_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TALK_SLOTS = Math.max(...TALK_PHRASES.map((phrase) => phrase.length));

let filter = "all";
let unlockedSlug = "";
let talkTimer = 0;
let phraseTimer = 0;
let talkRaf = 0;
let tocRaf = 0;
let tocFlash = 0;
let phraseIndex = 0;
let visionIdle = 0;
let visionBound = false;
let visionSettleTimers = [];
const CV_POOL = "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#%$<>/\\|[]{}";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function route() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const work = hash.match(/^\/work\/([a-z0-9-]+)/i);
  if (work) return { name: "project", slug: work[1] };
  return { name: "home", hash };
}

function navMarkup(solid) {
  return `
    <header class="nav ${solid ? "is-solid" : ""}">
      <a href="#/" class="nav-logo" aria-label="CEN Sitian home">
        <span class="nav-blob" aria-hidden="true">
          <img src="/nav-blob.gif?v=1" alt="" />
        </span>
        <span class="nav-wordmark">CEN Sitian</span>
      </a>
      <nav class="nav-links" aria-label="Primary">
        <div>
          <a href="#/work">Work</a>
          <a href="#/services">Contents</a>
        </div>
        <div>
          <a href="#/about">About</a>
          <a href="#/contact">Contact</a>
        </div>
      </nav>
    </header>
  `;
}

function footerMarkup() {
  return `
    <footer class="footer" id="contact">
      <p class="footer-kicker">Let’s kick off</p>
      <a class="footer-mail" href="mailto:${profile.email}">${profile.email}</a>
      <div class="footer-row">
        <div>
          <p>${profile.nameEn}</p>
          <p>${profile.role}</p>
          <p>${profile.location}</p>
        </div>
        <div>
          <a href="tel:${profile.phone.replaceAll(" ", "")}">${profile.phone}</a>
          <p>WeChat ${profile.wechat}</p>
          <a href="https://${profile.cargo}" target="_blank" rel="noreferrer">${profile.cargo}</a>
        </div>
        <div>
          <div class="footer-actions">
            <a href="mailto:${profile.email}">Email</a>
            <div class="footer-socials">
              <a
                class="footer-icon"
                href="${profile.xhs}"
                target="_blank"
                rel="noreferrer"
                aria-label="小红书 ${profile.xhsId}"
                title="小红书 ${profile.xhsId}"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7.15 3h9.7A4.15 4.15 0 0 1 21 7.15v9.7A4.15 4.15 0 0 1 16.85 21h-9.7A4.15 4.15 0 0 1 3 16.85v-9.7A4.15 4.15 0 0 1 7.15 3Zm4.85 4.35c-2.9 1.28-4.85 3.72-4.85 6.4a4.85 4.85 0 1 0 9.7 0c0-2.68-1.95-5.12-4.85-6.4Zm0 4.05a2.35 2.35 0 1 1 0 4.7 2.35 2.35 0 0 1 0-4.7Z" />
                </svg>
              </a>
              <a
                class="footer-icon"
                href="${profile.linkedin}"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM6.87 20.45H3.56V9h3.31v11.45z" />
                </svg>
              </a>
              <a
                class="footer-icon"
                href="${profile.github}"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub TinaCEN"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5A11.5 11.5 0 0 0 8.34 22.87c.58.1.79-.25.79-.56v-2.17c-3.22.7-3.9-1.55-3.9-1.55-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.57-.29-5.27-1.29-5.27-5.73 0-1.27.45-2.3 1.2-3.12-.12-.3-.52-1.48.11-3.08 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.6.24 2.78.12 3.08.75.82 1.2 1.85 1.2 3.12 0 4.45-2.7 5.43-5.28 5.72.42.36.79 1.08.79 2.18v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <p class="footer-giant">${profile.nameEn}</p>
    </footer>
  `;
}

function arcsMarkup(side) {
  return `
    <svg class="talk-arcs talk-arcs--${side}" viewBox="0 0 140 220" aria-hidden="true">
      <path d="M118 18 A 92 92 0 0 0 118 202" />
      <path d="M102 38 A 70 70 0 0 0 102 182" />
      <path d="M86 56 A 50 50 0 0 0 86 164" />
      <path d="M72 74 A 32 32 0 0 0 72 146" />
    </svg>
  `;
}

function markNames(text, names) {
  let html = escapeHtml(text);
  const marks = {
    淘宝闪购: { className: "is-flashbuy", href: "#/work/taobao-flashbuy" },
    微信支付: { className: "is-weixin", href: "#/work/weixin-treat" },
    欧诗漫: { className: "is-osmu" },
  };
  names.forEach((name) => {
    const mark = marks[name];
    const label = escapeHtml(name);
    if (!mark) return;
    html = html.replaceAll(
      label,
      mark.href
        ? `<a class="hero-mark ${mark.className}" href="${mark.href}">${label}</a>`
        : `<em class="${mark.className}">${label}</em>`
    );
  });
  return html;
}

function homeMarkup() {
  const list = filter === "all" ? projects : projects.filter((item) => item.category === filter);
  return `
    ${navMarkup(false)}
    <main>
      <section class="hero" aria-label="Intro">
        <div class="hero-layout">
          <figure class="polaroid">
            <div class="polaroid-window">
              <img class="polaroid-shot" src="${intro.portrait}" alt="${escapeHtml(profile.name)}" />
            </div>
            <img class="polaroid-frame" src="${intro.frame}" alt="" />
            <img class="polaroid-sign" src="${intro.sign}" alt="${intro.caption}" />
          </figure>
          <div class="hero-copy">
            <h1>${intro.lead.map((line) => escapeHtml(line)).join("<br>")}</h1>
            <p>${markNames(intro.experience, intro.marks)}</p>
          </div>
        </div>
      </section>

      <section class="talk" id="contact-cta">
        ${arcsMarkup("left")}
        ${arcsMarkup("right")}
        <div class="talk-core">
          <p class="talk-kicker">Who am I?</p>
          <p class="talk-word" aria-label="Who am I">
            ${Array.from(
              { length: TALK_SLOTS },
              () => `<span class="talk-slot is-empty" aria-hidden="true"><span class="talk-reel"><i>&nbsp;</i></span></span>`
            ).join("")}
          </p>
        </div>
        <a class="talk-start" href="mailto:${profile.email}">
          <span>START</span>
          <i aria-hidden="true">+</i>
        </a>
      </section>

      <section class="toc" id="services">
        <div class="section-kicker"><span>Contents</span><span>(04)</span></div>
        <div class="toc-stage">
          ${contents
            .map(
              (item) => `
            <a class="toc-row" href="#/work" data-filter="${item.filter}" data-imgs="${(item.previews || [item.cover]).join("|")}">
              <span class="toc-bar"></span>
              <span class="toc-word">${item.keyword}</span>
              <span class="toc-no">(${item.no})</span>
              <h2>${item.title}</h2>
            </a>`
            )
            .join("")}
        </div>
        <div class="toc-preview" aria-hidden="true"><img alt="" /></div>
      </section>

      <section class="cases" id="work">
        <div class="cases-head">
          <h2>Selected Cases</h2>
          <ul class="filters">
            ${filters
              .map((f) => {
                const count =
                  f.id === "all" ? projects.length : projects.filter((item) => item.category === f.id).length;
                return `<li><button type="button" data-filter="${f.id}" class="${
                  filter === f.id ? "is-on" : ""
                }">${f.label} (${count})</button></li>`;
              })
              .join("")}
          </ul>
        </div>
        <div class="case-grid">
          ${list
            .map((item, i) => {
              const feature = i === 0;
              const lock = item.locked
                ? `<span class="case-lock" aria-hidden="true"><span>🔑</span>Lock</span>`
                : "";
              const media = `
              <div class="case-media">
                <div class="case-media-grow">
                  <img src="${item.cover}" alt="${escapeHtml(item.title)}" />
                  ${lock}
                </div>
              </div>`;
              const copy = `
              <div class="case-copy">
                ${
                  feature
                    ? ""
                    : `<div class="case-meta"><span>${item.client}</span><span>${item.year}</span></div>`
                }
                <h3>${item.title}<em>${item.titleEn}</em></h3>
                <p>${item.excerpt}</p>
                <ul class="tags">${item.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
              </div>`;
              return `
            <a class="case-card ${feature ? "is-feature" : ""} ${item.locked ? "is-locked" : ""}" href="#/work/${item.slug}">
              ${feature ? `${copy}${media}<span class="case-year">${item.year}</span>` : `${media}${copy}`}
            </a>`;
            })
            .join("")}
        </div>
      </section>

      <section class="about" id="about">
        <div class="about-title">
          <h2 aria-label="Core Vision">
            <span class="cv-letter" data-char="C">C</span><span class="cv-loader" aria-hidden="true"><i></i></span><span class="cv-letter" data-char="r">r</span><span class="cv-letter" data-char="e">e</span><span class="cv-gap"></span><span class="cv-letter" data-char="V">V</span><span class="cv-letter is-light" data-char="i">i</span><span class="cv-letter" data-char="s">s</span><span class="cv-letter" data-char="i">i</span><span class="cv-letter" data-char="o">o</span><span class="cv-letter" data-char="n">n</span>
          </h2>
        </div>
        <p class="about-lead">${about.lead}</p>
        <div class="about-grid">${about.body
          .map(
            (col) =>
              `<div>${col.map((p) => `<p>${p}</p>`).join("")}</div>`
          )
          .join("")}</div>
        <div class="about-cols">
          <div>
            <h3>Education</h3>
            ${about.education
              .map(
                (e) =>
                  `<article><strong>${e.school}</strong><span>${e.detail}</span><em>${e.time}</em></article>`
              )
              .join("")}
          </div>
          <div>
            <h3>Experience</h3>
            ${about.experience
              .map(
                (e) =>
                  `<article><strong>${e.company}</strong><span>${e.detail}</span><em>${e.time}</em></article>`
              )
              .join("")}
          </div>
        </div>
      </section>
      ${footerMarkup()}
    </main>
  `;
}

function isUnlocked(slug) {
  return unlockedSlug === slug;
}

function gateMarkup(project) {
  return `
    ${navMarkup(true)}
    <main class="project-gate">
      <form class="gate-form" data-slug="${project.slug}">
        <p class="gate-kicker">${escapeHtml(project.client)} · ${escapeHtml(project.year)}</p>
        <h1>${escapeHtml(project.title)}<em>${escapeHtml(project.titleEn)}</em></h1>
        <p class="gate-note">该项目需要密码后查看</p>
        <label class="gate-field">
          <span class="sr-only">项目密码</span>
          <input type="password" name="code" inputmode="numeric" maxlength="16" autocomplete="off" placeholder="输入密码" />
        </label>
        <button type="submit">进入项目</button>
        <p class="gate-error" hidden>密码不正确</p>
      </form>
    </main>
  `;
}

function protoMarkup(project) {
  if (!project.demo) return "";
  return `
      <section class="proto" aria-label="原型体验">
        <div class="proto-head">
          <p>Interactive prototype</p>
          <h2>原型体验</h2>
          <span>可直接在手机里点击、填写、创建宠物</span>
        </div>
        <div class="phone-stage">
          <div class="phone">
            <span class="phone-btn phone-btn-silent" aria-hidden="true"></span>
            <span class="phone-btn phone-btn-vol-up" aria-hidden="true"></span>
            <span class="phone-btn phone-btn-vol-down" aria-hidden="true"></span>
            <span class="phone-btn phone-btn-power" aria-hidden="true"></span>
            <div class="phone-bezel">
              <span class="phone-island" aria-hidden="true"></span>
              <iframe
                class="phone-screen"
                src="${escapeHtml(project.demo)}"
                title="${escapeHtml(project.title)} 可交互原型"
                loading="lazy"
                allow="autoplay; clipboard-write"
              ></iframe>
              <span class="phone-home" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </section>
  `;
}

function projectMarkup(slug) {
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  if (!project) return homeMarkup();
  if (project.locked && !isUnlocked(project.slug)) return gateMarkup(project);
  const next = projects[(index + 1) % projects.length];
  return `
    ${navMarkup(true)}
    <main class="project-page">
      <section class="project-hero">
        <img src="${project.cover}" alt="" />
        <div class="project-hero-shade"></div>
        <div class="project-hero-copy">
          <p>${project.client} · ${project.year}</p>
          <h1>${project.title}<em>${project.titleEn}</em></h1>
        </div>
      </section>
      <section class="project-intro">
        <ul class="tags">${project.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
        <p>${project.description}</p>
      </section>
      <section class="project-pages">
        ${project.pages
          .map((n) =>
            typeof n === "string"
              ? `<img src="${n}" alt="${escapeHtml(project.title)}" />`
              : `<img src="/work/${String(n).padStart(2, "0")}.jpg" alt="${escapeHtml(project.title)} ${n}" />`
          )
          .join("")}
      </section>
      ${protoMarkup(project)}
      <a class="next-case" href="#/work/${next.slug}">
        <span>Next case</span>
        <strong>${next.title}<em>${next.titleEn}</em></strong>
      </a>
      ${footerMarkup()}
    </main>
  `;
}

function bindTalk() {
  const slots = [...document.querySelectorAll(".talk-slot")];
  const section = document.querySelector(".talk");
  const core = document.querySelector(".talk-core");
  const pill = document.querySelector(".talk-start");
  if (!slots.length || !section || !core || !pill) return;

  window.clearTimeout(talkTimer);
  window.clearInterval(talkTimer);
  window.clearTimeout(phraseTimer);
  window.clearInterval(phraseTimer);
  window.cancelAnimationFrame(talkRaf);
  phraseIndex = 0;

  const charsFor = (text) => {
    const extra = TALK_SLOTS - text.length;
    const left = Math.max(0, Math.floor(extra / 2));
    return Array.from({ length: TALK_SLOTS }, (_, i) => {
      const idx = i - left;
      return idx >= 0 && idx < text.length ? text[idx] : "";
    });
  };

  const randomGlyph = () => TALK_POOL[(Math.random() * TALK_POOL.length) | 0];

  const paint = (text, spin) => {
    const chars = charsFor(text);
    slots.forEach((slot, i) => {
      const target = chars[i];
      const reel = slot.querySelector(".talk-reel");
      if (!reel) return;
      const unused = !target;
      slot.classList.toggle("is-gap", target === " ");
      slot.classList.toggle("is-empty", unused);
      const display = unused || target === " " ? "&nbsp;" : escapeHtml(target);

      if (!spin || unused) {
        reel.style.transition = "none";
        reel.style.transform = "translateY(0)";
        reel.innerHTML = `<i>${display}</i>`;
        return;
      }

      const steps = target === " " ? 3 + ((Math.random() * 3) | 0) : 7 + ((Math.random() * 6) | 0);
      const items = [];
      for (let step = 0; step < steps; step += 1) {
        const glyph = randomGlyph();
        const dim = Math.random() > 0.42;
        items.push(`<i class="${dim ? "is-dim" : ""}">${glyph}</i>`);
      }
      items.push(`<i>${display}</i>`);
      reel.style.transition = "none";
      reel.style.transform = "translateY(0)";
      reel.innerHTML = items.join("");
      void reel.offsetHeight;
      const delay = 30 + i * 28 + Math.random() * 90;
      const duration = 480 + Math.random() * 320;
      reel.style.transition = `transform ${duration}ms cubic-bezier(0.12, 0.72, 0.18, 1) ${delay}ms`;
      reel.style.transform = `translateY(calc(${steps} * -1 * var(--slot-h)))`;
    });
  };

  const tick = () => {
    let next = phraseIndex;
    while (next === phraseIndex) next = (Math.random() * TALK_PHRASES.length) | 0;
    phraseIndex = next;
    paint(TALK_PHRASES[phraseIndex], true);
    talkTimer = window.setTimeout(tick, 2100 + Math.random() * 700);
  };

  paint(TALK_PHRASES[0], false);
  talkTimer = window.setTimeout(tick, 1100);

  let inside = false;
  let mx = 0;
  let my = 0;
  let px = 0;
  let py = 0;
  let wx = 0;
  let txWord = 0;
  section.addEventListener("mousemove", (e) => {
    inside = true;
    const box = section.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width;
    const y = (e.clientY - box.top) / box.height;
    mx = e.clientX - (box.left + box.width * 0.62);
    my = e.clientY - (box.top + box.height * 0.58);
    txWord = (x - 0.5) * 28;
    const nearCore = x > 0.26 && x < 0.74 && y > 0.22 && y < 0.78;
    section.classList.toggle("is-arc-left", nearCore || x < 0.3);
    section.classList.toggle("is-arc-right", nearCore || x > 0.7);
  });
  section.addEventListener("mouseleave", () => {
    inside = false;
    txWord = 0;
    section.classList.remove("is-arc-left", "is-arc-right");
  });
  const magnet = () => {
    const tx = inside ? mx : 0;
    const ty = inside ? my : 0;
    px += (tx - px) * 0.14;
    py += (ty - py) * 0.14;
    wx += (txWord - wx) * 0.08;
    pill.style.transform = `translate(${px}px, ${py}px)`;
    core.style.transform = `translateX(${wx}px)`;
    talkRaf = requestAnimationFrame(magnet);
  };
  talkRaf = requestAnimationFrame(magnet);
}

function bindToc() {
  const rows = [...document.querySelectorAll(".toc-row")];
  const preview = document.querySelector(".toc-preview");
  const img = preview?.querySelector("img");
  if (!rows.length || !preview || !img) return;

  window.cancelAnimationFrame(tocRaf);
  window.clearInterval(tocFlash);
  let px = window.innerWidth / 2;
  let py = window.innerHeight / 2;
  let tx = px;
  let ty = py;
  let visible = false;
  let frames = [];
  let frame = 0;

  contents.forEach((item) => {
    (item.previews || [item.cover]).forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });
  });

  const showFrame = () => {
    if (!frames.length) return;
    img.src = frames[frame % frames.length];
  };

  const startFlash = (list) => {
    window.clearInterval(tocFlash);
    frames = list;
    frame = 0;
    showFrame();
    if (frames.length < 2) return;
    tocFlash = window.setInterval(() => {
      frame = (frame + 1) % frames.length;
      showFrame();
    }, 108);
  };

  const loop = () => {
    px += (tx - px) * 0.16;
    py += (ty - py) * 0.16;
    preview.style.transform = `translate(${px}px, ${py}px) translate(-18%, -42%) rotate(-6deg)`;
    tocRaf = requestAnimationFrame(loop);
  };
  tocRaf = requestAnimationFrame(loop);

  rows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      rows.forEach((item) => item.classList.remove("is-on"));
      row.classList.add("is-on");
      startFlash((row.dataset.imgs || "").split("|").filter(Boolean));
      preview.classList.add("is-on");
      visible = true;
    });
    row.addEventListener("mousemove", (e) => {
      tx = e.clientX + 36;
      ty = e.clientY + 8;
    });
    row.addEventListener("mouseleave", () => {
      row.classList.remove("is-on");
      visible = false;
      window.clearInterval(tocFlash);
      window.setTimeout(() => {
        if (!visible) preview.classList.remove("is-on");
      }, 80);
    });
    row.addEventListener("click", (e) => {
      e.preventDefault();
      filter = row.dataset.filter || "all";
      if (location.hash === "#/work") render();
      else location.hash = "#/work";
    });
  });
}

let polaroidBound = false;

function bindPolaroid() {
  const card = document.querySelector(".polaroid");
  if (card) {
    card.addEventListener("mouseenter", () => {
      card.classList.remove("is-nudge");
      void card.offsetWidth;
      card.classList.add("is-nudge");
    });
    card.addEventListener("animationend", (event) => {
      if (event.animationName === "polaroid-nudge") card.classList.remove("is-nudge");
    });
  }
  if (polaroidBound) return;
  polaroidBound = true;
  window.addEventListener(
    "mousemove",
    (e) => {
      const el = document.querySelector(".polaroid");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = Math.max(r.left - e.clientX, e.clientX - r.right, 0);
      const dy = Math.max(r.top - e.clientY, e.clientY - r.bottom, 0);
      el.classList.toggle("is-develop", Math.hypot(dx, dy) < 80);
    },
    { passive: true }
  );
}

function bindGate() {
  const form = document.querySelector(".gate-form");
  if (!form) return;
  const project = projects.find((item) => item.slug === form.dataset.slug);
  const input = form.querySelector("input");
  const error = form.querySelector(".gate-error");
  input?.focus();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = String(new FormData(form).get("code") || "").trim();
    if (project && value === String(project.password)) {
      unlockedSlug = project.slug;
      render();
      return;
    }
    if (error) error.hidden = false;
    form.classList.remove("is-wrong");
    void form.offsetWidth;
    form.classList.add("is-wrong");
    if (input) {
      input.value = "";
      input.focus();
    }
  });
}

let caseGrowRaf = 0;
let caseGrowBound = false;

function bindVision() {
  const title = document.querySelector(".about-title h2");
  const loader = document.querySelector(".cv-loader");
  if (!title || !loader) return;

  const letters = () => [...document.querySelectorAll(".cv-letter")];
  const inView = () => {
    const box = document.querySelector(".about-title h2");
    if (!box) return false;
    const rect = box.getBoundingClientRect();
    return rect.bottom > 64 && rect.top < window.innerHeight - 48;
  };
  const settle = () => {
    visionSettleTimers.forEach((id) => window.clearTimeout(id));
    visionSettleTimers = [];
    letters().forEach((el, i) => {
      visionSettleTimers.push(
        window.setTimeout(() => {
          el.textContent = el.dataset.char || "";
          el.classList.remove("is-code");
        }, i * 16)
      );
    });
    document.querySelector(".cv-loader")?.classList.remove("is-spin");
    document.querySelector(".about-title h2")?.classList.remove("is-loading");
  };
  const scramble = () => {
    const h2 = document.querySelector(".about-title h2");
    const mark = document.querySelector(".cv-loader");
    if (!h2 || !mark || !inView()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    visionSettleTimers.forEach((id) => window.clearTimeout(id));
    visionSettleTimers = [];
    h2.classList.add("is-loading");
    mark.classList.add("is-spin");
    letters().forEach((el) => {
      el.classList.add("is-code");
      el.textContent = CV_POOL[(Math.random() * CV_POOL.length) | 0];
    });
    window.clearTimeout(visionIdle);
    visionIdle = window.setTimeout(settle, 140);
  };

  if (!visionBound) {
    visionBound = true;
    let last = 0;
    const onScroll = () => {
      if (!inView()) {
        if (document.querySelector(".cv-loader.is-spin") || document.querySelector(".cv-letter.is-code")) {
          settle();
        }
        return;
      }
      const now = performance.now();
      if (now - last < 28) {
        if (inView()) {
          window.clearTimeout(visionIdle);
          visionIdle = window.setTimeout(settle, 140);
        }
        return;
      }
      last = now;
      scramble();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }
}

function bindCaseGrow() {
  const update = () => {
    const cards = [...document.querySelectorAll(".case-card")];
    if (!cards.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.style.setProperty("--case-scale", "1"));
      return;
    }
    const vh = window.innerHeight || 1;
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const start = vh * 0.96;
      const end = vh * 0.22;
      const delay = i > 0 && i % 2 === 0 ? 0.1 : 0;
      let t = (start - rect.top) / (start - end) - delay;
      t = Math.max(0, Math.min(1, t));
      t = 1 - (1 - t) * (1 - t);
      if (card.classList.contains("is-feature")) {
        card.style.setProperty("--case-scale", (0.35 + 0.65 * t).toFixed(4));
      } else {
        card.style.setProperty("--case-scale", (0.38 + 0.62 * t).toFixed(4));
      }
    });
  };

  if (!caseGrowBound) {
    caseGrowBound = true;
    const onScroll = () => {
      if (caseGrowRaf) return;
      caseGrowRaf = window.requestAnimationFrame(() => {
        caseGrowRaf = 0;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }
  update();
}

function bindHome() {
  document.querySelectorAll("[data-filter]").forEach((btn) => {
    if (btn.classList.contains("toc-row")) return;
    btn.addEventListener("click", () => {
      filter = btn.getAttribute("data-filter") || "all";
      render({ keepScroll: true });
    });
  });

  bindTalk();
  bindToc();
  bindPolaroid();
  bindVision();
  bindCaseGrow();
}

let scrollBound = false;
let cursorBound = false;

function bindNav() {
  if (scrollBound) {
    document.querySelector(".nav") &&
      document.querySelector(".nav").classList.toggle(
        "is-solid",
        route().name !== "home" || window.scrollY > window.innerHeight * 1.72
      );
    return;
  }
  scrollBound = true;
  const onScroll = () => {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    if (route().name !== "home") {
      nav.classList.add("is-solid");
      return;
    }
    nav.classList.toggle("is-solid", window.scrollY > window.innerHeight * 1.72);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function bindCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) {
    document.querySelectorAll(".cursor").forEach((el) => {
      el.style.display = "none";
    });
    return;
  }
  if (cursorBound) return;
  cursorBound = true;
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let dx = x;
  let dy = y;
  let rx = x;
  let ry = y;
  let hovering = false;
  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    hovering = Boolean(e.target?.closest?.("a, button, .case-card, .toc-row, .polaroid"));
  });
  const loop = () => {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    dx += (x - dx) * 0.42;
    dy += (y - dy) * 0.42;
    rx += (x - rx) * 0.15;
    ry += (y - ry) * 0.15;
    if (dot) {
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
    }
    if (ring) {
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      ring.classList.toggle("is-hover", hovering);
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

function scrollToHash() {
  const current = route();
  if (current.name !== "home") {
    window.scrollTo(0, 0);
    return;
  }
  const id = location.hash.replace("#/", "").replace("/", "");
  if (["work", "services", "about", "contact"].includes(id)) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  window.scrollTo(0, 0);
}

function render(options = {}) {
  window.cancelAnimationFrame(talkRaf);
  window.cancelAnimationFrame(tocRaf);
  window.clearInterval(tocFlash);
  window.clearTimeout(talkTimer);
  window.clearInterval(talkTimer);
  window.clearTimeout(phraseTimer);
  window.clearInterval(phraseTimer);
  window.clearTimeout(visionIdle);
  visionSettleTimers.forEach((id) => window.clearTimeout(id));
  visionSettleTimers = [];
  const y = options.keepScroll ? window.scrollY : 0;
  const current = route();
  root.innerHTML =
    `<div class="cursor cursor-dot"></div><div class="cursor cursor-ring"></div>` +
    (current.name === "project" ? projectMarkup(current.slug) : homeMarkup());
  bindCursor();
  bindNav();
  bindGate();
  if (current.name === "home") bindHome();
  if (!options.keepScroll) scrollToHash();
  else window.scrollTo(0, y);
}

window.addEventListener("hashchange", () => {
  unlockedSlug = "";
  render();
});
render();
