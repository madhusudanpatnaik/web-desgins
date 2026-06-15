/* =========================================================
   OPALINE — main.js
   three.js painted bg (cursor-reactive) · Lenis · GSAP
   fluid colour transitions driven by chapter ScrollTriggers
   ========================================================= */
import * as THREE from "three";

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
const isTouch = window.matchMedia("(hover:none)").matches;
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------------------------------------------------------
   1. PAINTED TEXTURE BACKGROUND  (three.js fragment shader)
--------------------------------------------------------- */
const PaintBG = (() => {
  const canvas = document.getElementById("paint");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTouch ? 1.4 : 2));
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    uTime:   { value: 0 },
    uRes:    { value: new THREE.Vector2() },
    uMouse:  { value: new THREE.Vector2(0, 0) },     // smoothed -1..1
    uColorA: { value: new THREE.Color("#1a1410") },  // base
    uColorB: { value: new THREE.Color("#4a3424") },  // paint
    uColorC: { value: new THREE.Color("#b9885f") },  // accent
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */`
      precision highp float;
      varying vec2 vUv;
      uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse;
      uniform vec3 uColorA, uColorB, uColorC;

      // ---- value noise + fbm (organic painted flow) ----
      float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
      }
      float fbm(vec2 p){
        float v=0.0, amp=0.55; mat2 m=mat2(1.6,1.2,-1.2,1.6);
        for(int i=0;i<6;i++){ v+=amp*noise(p); p=m*p; amp*=0.5; }
        return v;
      }
      void main(){
        vec2 aspect = vec2(uRes.x/uRes.y, 1.0);
        vec2 p = (vUv-0.5)*aspect*1.4;
        float t = uTime*0.045;

        // cursor ripple — paint pushes away from pointer
        vec2 m = uMouse*0.5*aspect;
        float md = distance(p, m);
        vec2 push = normalize(p-m+0.0001)*0.18/(md*md+0.35);

        // domain-warped fbm = marbled paint
        vec2 q = vec2(fbm(p+push+t), fbm(p+push+vec2(5.2,1.3)-t));
        vec2 r = vec2(fbm(p+1.7*q+vec2(8.3,2.8)+0.12*t),
                      fbm(p+1.7*q+vec2(2.6,7.4)-0.10*t));
        float f = fbm(p + 1.8*r);

        vec3 col = mix(uColorA, uColorB, smoothstep(0.15,0.95,f));
        col = mix(col, uColorC, smoothstep(0.55,1.15,length(r))*0.6);
        // soft glow following the cursor
        col += uColorC*0.10/(md*md*6.0+0.25);
        // vignette
        col *= 1.0 - 0.34*pow(length((vUv-0.5)*1.7),2.2);
        gl_FragColor = vec4(col,1.0);
      }
    `,
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w, h);
  }
  resize();
  window.addEventListener("resize", resize);

  // pointer (smoothed in render loop)
  const target = new THREE.Vector2(0, 0);
  window.addEventListener("pointermove", (e) => {
    target.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
  }, { passive: true });
  if (isTouch) {
    window.addEventListener("touchmove", (e) => {
      const tch = e.touches[0]; if (!tch) return;
      target.set((tch.clientX / window.innerWidth) * 2 - 1, -((tch.clientY / window.innerHeight) * 2 - 1));
    }, { passive: true });
  }

  // colour targets lerped each frame for *fluid* transitions
  const tA = new THREE.Color("#1a1410"), tB = new THREE.Color("#4a3424"), tC = new THREE.Color("#b9885f");
  const setColors = (a, b, c) => { tA.set(a); tB.set(b); tC.set(c); };

  function render(time) {
    uniforms.uTime.value = time;
    uniforms.uMouse.value.lerp(target, 0.05);
    uniforms.uColorA.value.lerp(tA, 0.04);
    uniforms.uColorB.value.lerp(tB, 0.04);
    uniforms.uColorC.value.lerp(tC, 0.04);
    renderer.render(scene, camera);
  }
  return { render, setColors };
})();

/* ---------------------------------------------------------
   2. LENIS smooth scroll  ⟷  GSAP ScrollTrigger
--------------------------------------------------------- */
let lenis;
if (!reduced) {
  lenis = new window.Lenis({ duration: 1.15, lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
  lenis.on("scroll", ScrollTrigger.update);
}

// single ticker drives Lenis + the painted background
gsap.ticker.add((time) => {
  if (lenis) lenis.raf(time * 1000);
  PaintBG.render(time);
});
gsap.ticker.lagSmoothing(0);

/* ---------------------------------------------------------
   3. small DOM helpers
--------------------------------------------------------- */
// wrap words for the word-reveal headings
document.querySelectorAll(".word-wrap").forEach((el) => {
  const html = el.innerHTML;
  // keep <em> tags intact while splitting text nodes into words
  const tmp = document.createElement("div"); tmp.innerHTML = html;
  const out = [];
  tmp.childNodes.forEach((node) => {
    if (node.nodeType === 3) {
      node.textContent.split(/(\s+)/).forEach((w) => {
        if (w.trim() === "") { out.push(w); }
        else out.push(`<span class="word"><span>${w}</span></span>`);
      });
    } else {
      const t = node.textContent;
      out.push(`<span class="word"><span><em>${t}</em></span></span>`);
    }
  });
  el.innerHTML = out.join("");
});

/* ---------------------------------------------------------
   4. LOADER
--------------------------------------------------------- */
document.body.classList.add("loading");
const loader = document.getElementById("loader");
const loaderFill = document.getElementById("loaderFill");
const loaderPct = document.getElementById("loaderPct");

let _started = false;
function startSite() {
  if (_started) return; _started = true;
  const tl = gsap.timeline();
  tl.to(loaderFill, { width: "100%", duration: 1.1, ease: "power2.inOut" })
    .to({ v: 0 }, { v: 100, duration: 1.1, ease: "power2.inOut",
      onUpdate() { loaderPct.textContent = String(Math.round(this.targets()[0].v)).padStart(2, "0"); } }, 0)
    .to(loader, { yPercent: -100, duration: 0.9, ease: "expo.inOut", delay: 0.05 })
    .add(() => { document.body.classList.remove("loading"); ScrollTrigger.refresh(); revealHero(); }, "-=0.5")
    .set(loader, { display: "none" });
}

/* ---------------------------------------------------------
   5. HERO intro
--------------------------------------------------------- */
function revealHero() {
  if (reduced) return;
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.to(".hero .eyebrow span", { yPercent: 0, opacity: 1, duration: 1 })
    .to(".hero__title .lh>span", { yPercent: 0, duration: 1.2, stagger: 0.12 }, "-=0.7")
    .to(".hero__lede span", { yPercent: 0, opacity: 1, duration: 1 }, "-=0.8")
    .from(".scrollcue", { opacity: 0, y: 16, duration: 0.8 }, "-=0.6");
}
// set hero start states immediately so nothing flashes
if (!reduced) {
  gsap.set(".hero .eyebrow span,.hero__lede span", { yPercent: 110, opacity: 0 });
  gsap.set(".hero__title .lh>span", { yPercent: 110 });
}

/* ---------------------------------------------------------
   6. CHAPTER colour + rail  (fluid transitions)
--------------------------------------------------------- */
const chapters = [...document.querySelectorAll(".chapter")];
const railNum = document.getElementById("railNum");
const railTitle = document.getElementById("railTitle");
const railFill = document.getElementById("railFill");
const root = document.documentElement;

function applyChapter(sec) {
  const a = sec.dataset.a, b = sec.dataset.b, c = sec.dataset.c;
  PaintBG.setColors(a, b, c);
  gsap.to("body", { backgroundColor: a, duration: 0.6 });
  root.style.setProperty("--accent", c);
  railNum.textContent = sec.dataset.chapter;
  railTitle.textContent = sec.dataset.name;
}
applyChapter(chapters[0]);

chapters.forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec, start: "top 55%", end: "bottom 55%",
    onToggle: (self) => { if (self.isActive) applyChapter(sec); },
  });
});

// rail progress
ScrollTrigger.create({
  start: 0, end: "max",
  onUpdate: (self) => { railFill.style.height = (self.progress * 100).toFixed(1) + "%"; },
});

/* ---------------------------------------------------------
   7. REVEAL animations (cinematic, per element)
--------------------------------------------------------- */
function buildReveals() {
  if (reduced) return;

  // generic text reveals
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 86%" },
    });
  });

  // media clip-path reveals + parallax zoom-out
  gsap.utils.toArray(".reveal-media").forEach((el) => {
    gsap.to(el, {
      clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 84%" },
    });
    const img = el.querySelector("img");
    if (img) gsap.fromTo(img, { scale: 1.18 }, {
      scale: 1, ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  // word-reveal headings
  gsap.utils.toArray(".word-wrap").forEach((el) => {
    gsap.set(el.querySelectorAll(".word>span"), { yPercent: 110 });
    gsap.to(el.querySelectorAll(".word>span"), {
      yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.06,
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  // split-section media inner-zoom on enter
  gsap.utils.toArray(".split__media img").forEach((img) => {
    gsap.to(img, { scale: 1, scrollTrigger: { trigger: img, start: "top 80%" }, duration: 1.6, ease: "expo.out" });
  });
}
buildReveals();

/* ---------------------------------------------------------
   8. PINNED cinematic chapter (Casa Lumière)
--------------------------------------------------------- */
if (!reduced && document.getElementById("pin3")) {
  gsap.set(".pin__title .lh>span", { yPercent: 110 });
  const caps = [
    { t: "Casa Lumière is a 320m² rebuild perched above the Tagus. We pulled the plan open to a single light-filled volume.", i: "01" },
    { t: "Raw lime plaster, smoked oak and washed linen carry the whole palette — nothing painted, everything natural.", i: "02" },
    { t: "One uninterrupted glazed wall folds the river into the room, so the view becomes the largest piece of art.", i: "03" },
  ];
  const capEl = document.querySelector("#pinCap .body");
  const idxEl = document.getElementById("pinIndex");

  const pinTl = gsap.timeline({
    scrollTrigger: { trigger: ".pinwrap", start: "top top", end: "bottom bottom", scrub: 1 },
  });
  pinTl
    .to(".pin__title .lh>span", { yPercent: 0, duration: 1, stagger: 0.15, ease: "expo.out" })
    .fromTo("#pinImg", { scale: 1.35, yPercent: -4 }, { scale: 1.1, yPercent: 4, ease: "none" }, 0);

  // swap captions across the three thirds of the scroll
  ScrollTrigger.create({
    trigger: ".pinwrap", start: "top top", end: "bottom bottom",
    onUpdate: (self) => {
      const k = Math.min(2, Math.floor(self.progress * 3));
      if (capEl.dataset.k !== String(k)) {
        capEl.dataset.k = String(k);
        gsap.fromTo(capEl, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 });
        capEl.textContent = caps[k].t;
        idxEl.textContent = caps[k].i;
      }
    },
  });
}

/* ---------------------------------------------------------
   9. CARD tilt (subtle, pointer-driven)
--------------------------------------------------------- */
if (!isTouch && !reduced) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const img = card.querySelector("img");
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(img, { rotateY: x * 5, rotateX: -y * 5, scale: 1.08, duration: 0.5, transformPerspective: 800 });
    });
    card.addEventListener("pointerleave", () => gsap.to(img, { rotateX: 0, rotateY: 0, scale: 1.04, duration: 0.6 }));
  });
}

/* ---------------------------------------------------------
   10. CUSTOM cursor + magnetic buttons
--------------------------------------------------------- */
if (!isTouch && !reduced) {
  const cursor = document.getElementById("cursor");
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; cursor.style.opacity = 1; });
  gsap.ticker.add(() => {
    pos.x = lerp(pos.x, mouse.x, 0.2); pos.y = lerp(pos.y, mouse.y, 0.2);
    cursor.style.transform = `translate(${pos.x}px,${pos.y}px) translate(-50%,-50%)`;
  });
  document.querySelectorAll("a,button,[data-tilt],.scrollcue").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-hover"));
  });
  // magnetic
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.35, y: (e.clientY - (r.top + r.height / 2)) * 0.4, duration: 0.5 });
    });
    el.addEventListener("pointerleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" }));
  });
}

/* ---------------------------------------------------------
   11. nav state + anchor scrolling through Lenis
--------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const tgt = document.querySelector(id);
    if (!tgt) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(tgt, { offset: 0, duration: 1.4 });
    else tgt.scrollIntoView({ behavior: "smooth" });
  });
});

const nav = document.getElementById("nav");
ScrollTrigger.create({ start: 80, onUpdate: (s) => nav.classList.toggle("is-scrolled", s.scroll() > 80) });

/* ---------------------------------------------------------
   12. go — start as soon as fonts are ready (cap at 1.5s)
   NOT on window.load: that waits for every lazy image/font
   over the network and would hang the loader for seconds.
--------------------------------------------------------- */
Promise.race([
  document.fonts ? document.fonts.ready : Promise.resolve(),
  new Promise((r) => setTimeout(r, 1500)),
]).then(startSite);
// absolute safety net
setTimeout(startSite, 4000);
