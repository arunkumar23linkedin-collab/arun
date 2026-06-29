const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

let lenis;

if (!prefersReducedMotion && !isTouchDevice) {
  lenis = new Lenis({
    duration: 0.42,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.15,
    normalizeWheel: true,
    smoothTouch: false,
  });

  lenis.on('scroll', () => ScrollTrigger.update());

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
}

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

if (lenis) {
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { duration: 0 });
        return;
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
  });
}

function refreshTriggers() {
  ScrollTrigger.refresh();
  setTimeout(() => ScrollTrigger.refresh(), 160);
}

function animateOnScroll(target, options = {}) {
  const element = target;
  const start = options.start || 'top 86%';
  const end = options.end || 'bottom 20%';
  const yFrom = options.yFrom ?? 70;
  const yTo = options.yTo ?? 0;
  const scaleFrom = options.scaleFrom ?? 0.9;
  const scaleTo = options.scaleTo ?? 1;
  const duration = options.duration ?? 0.9;
  const easeIn = options.easeIn || 'power3.out';
  const easeOut = options.easeOut || 'power3.out';
  const delay = options.delay ?? 0;
  const opacityFrom = options.opacityFrom ?? 0;
  const opacityTo = options.opacityTo ?? 1;
  const trigger = options.trigger || element;
  const once = options.once ?? false;

  gsap.set(element, {
    autoAlpha: opacityFrom,
    y: yFrom,
    scale: scaleFrom,
    transformOrigin: 'center center'
  });

  ScrollTrigger.create({
    trigger,
    start,
    end,
    once,
    onEnter: () => {
      gsap.to(element, {
        autoAlpha: opacityTo,
        y: yTo,
        scale: scaleTo,
        duration,
        ease: easeIn,
        delay,
        overwrite: 'auto'
      });
    },
    onEnterBack: () => {
      gsap.to(element, {
        autoAlpha: opacityTo,
        y: yTo,
        scale: scaleTo,
        duration,
        ease: easeIn,
        delay,
        overwrite: 'auto'
      });
    },
    onLeave: () => {
      gsap.to(element, {
        autoAlpha: opacityFrom,
        y: yFrom * 0.45,
        scale: scaleFrom + 0.02,
        duration: duration * 0.7,
        ease: easeOut,
        overwrite: 'auto'
      });
    },
    onLeaveBack: () => {
      gsap.to(element, {
        autoAlpha: opacityFrom,
        y: yFrom * 0.45,
        scale: scaleFrom + 0.02,
        duration: duration * 0.7,
        ease: easeOut,
        overwrite: 'auto'
      });
    }
  });
}

if (!prefersReducedMotion) {
  gsap.from('.hero-content', {
    duration: 1.1,
    y: 30,
    opacity: 0,
    scale: 0.96,
    ease: 'power3.out'
  });

  gsap.from('.hero-stage', {
    duration: 1.3,
    scale: 1.04,
    opacity: 0.9,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.section-heading').forEach((element, index) => {
    animateOnScroll(element, {
      start: 'top 88%',
      yFrom: 48,
      scaleFrom: 0.94,
      delay: index * 0.03,
      duration: 0.9,
      easeIn: 'back.out(1.2)',
      easeOut: 'power3.out'
    });
  });

  gsap.utils.toArray('.photo-card, .about-copy, .contact-card, .finale-core').forEach((element, index) => {
    animateOnScroll(element, {
      start: 'top 88%',
      yFrom: 56,
      scaleFrom: 0.92,
      delay: index * 0.04,
      duration: 0.95,
      easeIn: 'power3.out'
    });
  });

  gsap.utils.toArray('.interest-card').forEach((element, index) => {
    animateOnScroll(element, {
      start: 'top 92%',
      yFrom: 42,
      scaleFrom: 0.9,
      delay: index * 0.03,
      duration: 0.75,
      easeIn: 'power3.out'
    });
  });

  gsap.utils.toArray('.social-card').forEach((card, index) => {
    animateOnScroll(card, {
      start: 'top 92%',
      yFrom: 46,
      scaleFrom: 0.9,
      delay: index * 0.05,
      duration: 0.8,
      easeIn: 'power3.out'
    });
  });

  gsap.utils.toArray('.skill-card').forEach((card, index) => {
    animateOnScroll(card, {
      start: 'top 92%',
      yFrom: 46,
      scaleFrom: 0.9,
      delay: index * 0.04,
      duration: 0.8,
      easeIn: 'power3.out'
    });
  });

  gsap.utils.toArray('.project-card').forEach((card, index) => {
    animateOnScroll(card, {
      start: 'top 92%',
      yFrom: 54,
      scaleFrom: 0.92,
      delay: index * 0.05,
      duration: 0.9,
      easeIn: 'expo.out'
    });
  });

  gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    animateOnScroll(item, {
      start: 'top 92%',
      yFrom: 42,
      scaleFrom: 0.92,
      delay: index * 0.05,
      duration: 0.8,
      easeIn: 'power3.out'
    });
  });

  gsap.utils.toArray('.contact-links a, .contact-actions .button').forEach((element, index) => {
    animateOnScroll(element, {
      start: 'top 96%',
      yFrom: 26,
      scaleFrom: 0.95,
      delay: index * 0.03,
      duration: 0.7,
      easeIn: 'power3.out'
    });
  });

  gsap.utils.toArray('.project-card img').forEach((image) => {
    gsap.to(image, {
      yPercent: -8,
      scale: 1.02,
      ease: 'none',
      scrollTrigger: {
        trigger: image,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6
      }
    });
  });

  gsap.to('.quote-section', {
    scrollTrigger: {
      trigger: '.quote-section',
      start: 'top 74%',
      end: 'bottom 24%',
      scrub: 0.4
    },
    scale: 1.01,
    y: -8,
    opacity: 0.95,
    ease: 'none'
  });

  gsap.to('.ambient-one', {
    y: 24,
    x: 10,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.ambient-two', {
    y: -18,
    x: -14,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.ambient-three', {
    y: 12,
    x: 18,
    duration: 4.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

window.addEventListener('load', refreshTriggers);
window.addEventListener('resize', refreshTriggers);

let pointerFrame;
window.addEventListener('mousemove', (event) => {
  if (pointerFrame) return;
  pointerFrame = requestAnimationFrame(() => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;
    document.documentElement.style.setProperty('--pointer-x', `${x}deg`);
    document.documentElement.style.setProperty('--pointer-y', `${y}deg`);
    pointerFrame = null;
  });
});
