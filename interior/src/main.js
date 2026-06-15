import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Lenis Smooth Scroll Setup
  // ==========================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // ==========================================
  // 2. Three.js High-End 3D Interactive Scene
  // ==========================================
  const canvas = document.querySelector('#webgl-canvas');
  
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#F0FDFA');
  scene.fog = new THREE.FogExp2('#F0FDFA', 0.02);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 15;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Abstract Architecture (Torus Knot inside Icosahedron)
  const geometry = new THREE.TorusKnotGeometry(10, 3, 300, 20);
  const material = new THREE.PointsMaterial({
    color: 0x0F766E,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  const wireframeGeo = new THREE.IcosahedronGeometry(15, 2);
  const wireframeMat = new THREE.MeshBasicMaterial({
    color: 0x14B8A6,
    wireframe: true,
    transparent: true,
    opacity: 0.1
  });
  const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);
  scene.add(wireframe);

  // Mouse Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.005;
    mouseY = (event.clientY - windowHalfY) * 0.005;
  });

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    particles.rotation.y = elapsedTime * 0.1;
    wireframe.rotation.x = elapsedTime * 0.05;
    wireframe.rotation.y = elapsedTime * 0.08;

    targetX = mouseX * 2;
    targetY = mouseY * 2;
    
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (-targetY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // ==========================================
  // 3. GSAP Scroll Animations
  // ==========================================
  
  // Tie 3D object rotation to scroll
  gsap.to(particles.rotation, {
    x: Math.PI * 2,
    y: Math.PI * 4,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  });

  gsap.to(camera.position, {
    z: 5,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  });

  // Hero Text Reveal
  gsap.set('.text-line', { yPercent: 100 });
  gsap.to('.text-line', {
    yPercent: 0,
    duration: 1.5,
    stagger: 0.15,
    ease: 'power4.out',
    autoAlpha: 1,
    delay: 0.2
  });

  gsap.set('.hero-meta', { autoAlpha: 0, y: 30 });
  gsap.to('.hero-meta', {
    autoAlpha: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 1.2
  });
  
  gsap.set('.hero-title', { autoAlpha: 1 });

  // Standard Section Reveals
  const sections = gsap.utils.toArray('.gs-reveal:not(.hero-title):not(.hero-meta)');
  
  sections.forEach(section => {
    gsap.fromTo(section, 
      { autoAlpha: 0, y: 50 },
      { 
        duration: 1, 
        autoAlpha: 1, 
        y: 0, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Number Counter Animation
  const numbers = gsap.utils.toArray('.stat-number[data-target]');
  numbers.forEach(num => {
    const target = parseInt(num.getAttribute('data-target'), 10);
    ScrollTrigger.create({
      trigger: num,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(num, {
          innerHTML: target,
          duration: 2,
          ease: 'power3.out',
          snap: { innerHTML: 1 },
          onUpdate: function() {
            num.innerHTML = Math.round(this.targets()[0].innerHTML);
          }
        });
      },
      once: true
    });
  });

  // ==========================================
  // 4. GSAP Horizontal Scroll (Portfolio)
  // ==========================================
  const horizontalTrack = document.getElementById('horizontal-track');
  const portfolioWrapper = document.querySelector('.portfolio-wrapper');
  
  if (horizontalTrack && portfolioWrapper) {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const getScrollAmount = () => -(horizontalTrack.scrollWidth - window.innerWidth);
      
      // Set up the tween
      const tween = gsap.to(horizontalTrack, {
        x: getScrollAmount,
        ease: "none"
      });

      // Create the ScrollTrigger to pin the wrapper and scrub the tween
      ScrollTrigger.create({
        trigger: portfolioWrapper,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    });
  }

  // ==========================================
  // 5. UI Interactions (Slider, Navbar)
  // ==========================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const slider = document.getElementById('compare-slider');
  const afterState = document.getElementById('after-state');
  const sliderLine = document.getElementById('slider-line');

  if (slider && afterState && sliderLine) {
    slider.addEventListener('input', (e) => {
      const sliderVal = e.target.value;
      afterState.style.width = `${sliderVal}%`;
      sliderLine.style.left = `${sliderVal}%`;
    });
  }

  // Smooth Anchor Scrolling via Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement, { offset: -100, duration: 1.5 });
      }
    });
  });
});
