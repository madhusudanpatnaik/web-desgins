import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let animationsStarted = false;

    const CHAR_STEP = 0.038;
    const animateLines = (selector: string, baseDelay: number, lineGap: number) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, lineIndex) => {
        const lineDelay = baseDelay + lineIndex * lineGap;
        let charCount = 0;

        const walk = (node: Node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue || '';
            // Skip pure whitespace text nodes
            if (!text.trim() && text.length > 0) return;

            const fragment = document.createDocumentFragment();
            for (let i = 0; i < text.length; i++) {
              const char = text[i];
              if (char === ' ') {
                fragment.appendChild(document.createTextNode(' '));
              } else {
                const span = document.createElement('span');
                span.className = 'hero__char';
                span.style.animationDelay = `${lineDelay + charCount * CHAR_STEP}s`;
                span.textContent = char;
                fragment.appendChild(span);
                charCount++;
              }
            }
            node.parentNode?.replaceChild(fragment, node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // we copy childNodes because we will mutate the DOM
            Array.from(node.childNodes).forEach(walk);
          }
        };

        Array.from(el.childNodes).forEach(walk);
      });
    };

    const startAnimations = () => {
      if (animationsStarted) return;
      animationsStarted = true;
      document.body.classList.add('is-ready');

      animateLines('.hero__heading .hero__line-inner', 0.3, 0.85);
      animateLines('.hero__label', 0.3, 0.65);
      animateLines('.hero__desc', 0.3, 0.65);
    };

    const onTimeUpdate = () => {
      const vid = videoRef.current;
      if (vid && vid.currentTime >= 10) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      }
    };

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});

      const checkReady = () => {
        if (video.readyState >= 4) {
          startAnimations();
        }
      };

      video.addEventListener('timeupdate', onTimeUpdate);
      video.addEventListener('canplaythrough', startAnimations, { once: true });
      // In case it's already loaded
      checkReady();

      var fallbackTimeout = setTimeout(startAnimations, 5000);
    } else {
      var fallbackTimeout = setTimeout(startAnimations, 5000);
    }

    // Smooth scroll for anchors
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        // Since we don't have actual sections in this hero-only demo,
        // we just prevent default or do a dummy scroll.
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Scroll down button
    const scrollDownBtn = document.getElementById('scrollDown');
    const handleScrollDown = () => {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    };
    scrollDownBtn?.addEventListener('click', handleScrollDown);

    // Side nav logic
    const sideNavLinks = document.querySelectorAll('.side-nav__link');
    const handleSideNavClick = (e: Event) => {
      e.preventDefault();
      const currentTarget = e.currentTarget as HTMLElement;
      
      sideNavLinks.forEach(link => {
        link.classList.remove('side-nav__link--active');
        const line = link.querySelector('.side-nav__line');
        if (line) line.remove();
      });

      currentTarget.classList.add('side-nav__link--active');
      const lineSpan = document.createElement('span');
      lineSpan.className = 'side-nav__line';
      currentTarget.appendChild(lineSpan);
    };

    sideNavLinks.forEach(link => {
      link.addEventListener('click', handleSideNavClick);
    });

    return () => {
      document.body.classList.remove('is-ready');
      if (video) {
        video.removeEventListener('timeupdate', onTimeUpdate);
        video.removeEventListener('canplaythrough', startAnimations);
      }
      clearTimeout(fallbackTimeout);
      document.removeEventListener('click', handleAnchorClick);
      scrollDownBtn?.removeEventListener('click', handleScrollDown);
      sideNavLinks.forEach(link => {
        link.removeEventListener('click', handleSideNavClick);
      });
    };
  }, []);

  return (
    <div className="hero" ref={heroRef}>
      <div className="hero__bg">
        <video className="hero__video" ref={videoRef} autoPlay muted loop playsInline preload="auto">
          <source src="https://qclay.design/lovable/kubric/body.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero__overlay"></div>
      <div className="hero__gradient-top"></div>
      <div className="hero__gradient-bottom"></div>
      <div className="hero__blur">
        <div className="hero__blur-layer"></div>
        <div className="hero__blur-layer"></div>
        <div className="hero__blur-layer"></div>
        <div className="hero__blur-layer"></div>
        <div className="hero__blur-layer"></div>
        <div className="hero__blur-layer"></div>
        <div className="hero__blur-layer"></div>
        <div className="hero__blur-layer"></div>
      </div>

      <header className="header">
        <a className="logo" href="#" aria-label="Kubric">
          <svg className="logo__icon" viewBox="0 0 122 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="logo__circle" cx="14.3" cy="14.9" r="7" fill="none" stroke="#fff" strokeWidth="3" />
            <path className="logo__arc-1a" pathLength="100" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" d="M28.4955 14.6513C28.4346 12.2923 27.7563 9.99047 26.5284 7.9753C25.3005 5.96012 23.5657 4.30202 21.4972 3.1663C19.4287 2.03059 17.0985 1.45693 14.7392 1.50252C12.3798 1.54811 10.0736 2.21137 8.05047 3.42615" />
            <path className="logo__arc-1b" pathLength="100" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" d="M28.4955 14.6513C28.5564 17.0104 27.998 19.3442 26.8757 21.4201C25.7535 23.496 24.1067 25.2414 22.0996 26.4824C20.0924 27.7234 17.795 28.4166 15.4365 28.4929C13.0779 28.5692 10.7405 28.026 8.65735 26.9173" />
            <path className="logo__arc-2a" pathLength="100" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" d="M37.4997 14.9144C37.4824 12.1783 36.634 9.51197 35.0671 7.26888C33.5001 5.02578 31.2885 3.31178 28.7254 2.35403" />
            <path className="logo__arc-2b" pathLength="100" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" d="M37.4997 14.9144C37.5171 17.6506 36.7026 20.3274 35.1642 22.5902C33.6258 24.853 31.4361 26.5949 28.8853 27.5851" />
            <g className="logo__text-group">
              <text x="46" y="22" fontFamily="Inter Tight" fontSize="22" fontWeight="700" fill="#fff" letterSpacing="-0.5">Kubric</text>
              <text className="logo__tm" x="113" y="10">™</text>
            </g>
          </svg>
        </a>
        <nav className="nav-pill" aria-label="Primary">
          <a className="nav-pill__link" href="#features">Features</a>
          <a className="nav-pill__link" href="#team">Team<span className="nav-pill__badge">3</span></a>
          <a className="nav-pill__link" href="#roadmap">Roadmap</a>
          <a className="nav-pill__link" href="#contact">Contact</a>
        </nav>
        <button className="btn btn--header">
          Book a call
          <svg className="btn__arrow" viewBox="0 0 8 8" fill="none">
            <path d="M1 7L7 1M7 1H2M7 1V6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      <h1 className="hero__heading">
        <span className="hero__line"><span className="hero__line-inner">Making your business</span></span><br />
        <span className="hero__line"><span className="hero__line-inner">outstanding — is a</span></span><br />
        <span className="hero__line"><span className="hero__line-inner"><em>Science</em></span></span>
      </h1>

      <nav className="side-nav" aria-label="Sections">
        <a className="side-nav__link side-nav__link--active" href="#home">
          <span className="side-nav__link-text">Home</span>
          <span className="side-nav__line"></span>
        </a>
        <a className="side-nav__link" href="#services">
          <span className="side-nav__link-text">Our Services</span>
        </a>
        <a className="side-nav__link" href="#about">
          <span className="side-nav__link-text">About Us</span>
        </a>
        <a className="side-nav__link" href="#reviews">
          <span className="side-nav__link-text">Reviews</span>
        </a>
        <a className="side-nav__link" href="#contact">
          <span className="side-nav__link-text">Contact Us</span>
        </a>
      </nav>

      <div className="hero__blur-bar"></div>
      
      <div className="hero__bottom">
        <div className="hero__label">01 — Our goal</div>
        <p className="hero__desc">
          We enable the world's most engaged investors and<br />
          family offices to access professionally managed<br />
          investment strategies.
        </p>
        <div className="hero__actions">
          <button className="btn btn--footer">
            Discuss the project
            <svg className="btn__arrow" viewBox="0 0 8 8" fill="none">
              <path d="M1 7L7 1M7 1H2M7 1V6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="scroll-down" id="scrollDown">
            <span className="scroll-down__text">Scroll down</span>
            <span className="scroll-down__circle">
              <svg viewBox="0 0 7.222 8.667" fill="none">
                <path d="M3.611 1V7.667M3.611 7.667L1 5M3.611 7.667L6.222 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
        <a className="about-card" href="#about">
          <div className="about-card__image">
            <img src="https://qclay.design/lovable/kubric/card-image.png" alt="Pink tulip closeup" />
          </div>
          <div className="about-card__content">
            <div>
              <h3 className="about-card__title">About us</h3>
              <p className="about-card__text">We're driven by user-centered design that drives productivity and increases revenue.</p>
            </div>
            <svg className="about-card__arrow" viewBox="0 0 77 13" fill="none">
              <path d="M1 6.5H75M75 6.5L70 1.5M75 6.5L70 11.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  )
}
