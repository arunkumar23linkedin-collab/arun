const loadingScreen = document.getElementById('loading-screen');
const loadingBar = document.getElementById('loading-bar');
const loadingPercent = document.getElementById('loading-percent');
const cursorDot = document.querySelector('.cursor-dot');
const cursorGlow = document.querySelector('.cursor-glow');
const particleLayer = document.getElementById('particle-layer');
const heroTitle = document.querySelector('.hero-title');
const typeLines = [
  document.getElementById('typing-line-1'),
  document.getElementById('typing-line-2'),
  document.getElementById('typing-line-3')
];

const typingText = [
  "👋 Hi, I'm Arun Kumar.",
  "I'm a developer who loves turning ideas into interactive experiences.",
  "This is where I build, learn, create, and bring ideas to life."
];

function animateLoading() {
  let progress = 0;
  let isFinished = false;

  const finishLoading = () => {
    if (isFinished) return;
    isFinished = true;
    clearInterval(timer);
    loadingBar.style.width = '100%';
    loadingPercent.textContent = '100%';
    setTimeout(() => {
      loadingScreen?.classList.add('hidden');
    }, 450);
  };

  const timer = setInterval(() => {
    progress += Math.random() * 8 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
    }
    loadingBar.style.width = `${progress}%`;
    loadingPercent.textContent = `${Math.round(progress)}%`;
  }, 90);

  const fallbackTimer = window.setTimeout(() => {
    finishLoading();
  }, 1700);

  const completeLoading = () => {
    window.clearTimeout(fallbackTimer);
    finishLoading();
  };

  if (document.readyState === 'complete') {
    completeLoading();
  } else {
    window.addEventListener('load', completeLoading, { once: true });
    window.addEventListener('pageshow', completeLoading, { once: true });
    document.addEventListener('DOMContentLoaded', () => {
      if (document.readyState === 'complete') {
        completeLoading();
      }
    }, { once: true });
  }
}

function setupParticleField() {
  if (!particleLayer) return;
  const count = 48;
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 4}s`;
    particle.style.opacity = `${0.35 + Math.random() * 0.65}`;
    particleLayer.appendChild(particle);
  }
}

function setupCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursorDot.style.display = 'none';
    cursorGlow.style.display = 'none';
    return;
  }

  window.addEventListener('mousemove', (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('a, button, .social-card, .project-card, .skill-card, .timeline-card').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.15)';
    });
    element.addEventListener('mouseleave', () => {
      cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

function setupMagneticButtons() {
  document.querySelectorAll('.magnetic').forEach((button) => {
    button.addEventListener('mousemove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -6;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      button.style.transform = `translate3d(${(x / rect.width - 0.5) * 6}px, ${(y / rect.height - 0.5) * 6}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
}

function typeLinesSequentially() {
  let index = 0;
  const tick = () => {
    const current = typingText[index];
    let charIndex = 0;
    const target = typeLines[index];
    target.textContent = '';

    const interval = setInterval(() => {
      target.textContent += current.charAt(charIndex);
      charIndex += 1;
      if (charIndex > current.length) {
        clearInterval(interval);
        index += 1;
        if (index < typeLines.length) {
          setTimeout(tick, 450);
        }
      }
    }, 35);
  };
  tick();
}

function setupAboutVideo() {
  const video = document.getElementById('about-video');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');

  video.play().catch(() => {
    // Autoplay may be blocked until interaction; the video remains ready for user gesture.
  });
}

function setupMusicControl() {
  const toggle = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');
  if (!toggle || !audio) return;

  audio.load();

  const setState = (isPlaying) => {
    toggle.classList.toggle('is-playing', isPlaying);
    toggle.setAttribute('aria-label', isPlaying ? 'Pause background music' : 'Play background music');
    toggle.setAttribute('data-tooltip', isPlaying ? 'Pause Music' : 'Play Music');
    toggle.setAttribute('title', isPlaying ? 'Pause Music' : 'Play Music');
  };

  toggle.addEventListener('click', async () => {
    if (audio.paused) {
      try {
        await audio.play();
        setState(true);
      } catch (error) {
        setState(false);
      }
    } else {
      audio.pause();
      setState(false);
    }
  });

  setState(false);
}

function init() {
  animateLoading();
  setupParticleField();
  setupCursor();
  setupMagneticButtons();
  typeLinesSequentially();
  setupAboutVideo();
  setupMusicControl();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
