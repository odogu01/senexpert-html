// Main JavaScript for SenExpert Global Energies Website

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');
const navbarLine = document.getElementById('navbar-line');
const heroSection = document.getElementById('home');
let lastScrollY = 0;

function handleNavbarScroll() {
  const scrollY = window.scrollY;
  
  if (scrollY > 50) {
    navbar.classList.add('bg-primary/95', 'backdrop-blur-lg', 'shadow-lg', 'shadow-primary/20');
    navbar.classList.remove('bg-transparent');
    if (navbarLine) navbarLine.style.transform = 'scaleX(1)';
  } else {
    navbar.classList.remove('bg-primary/95', 'backdrop-blur-lg', 'shadow-lg', 'shadow-primary/20');
    navbar.classList.add('bg-transparent');
    if (navbarLine) navbarLine.style.transform = 'scaleX(0)';
  }
  
  lastScrollY = scrollY;
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// ========================================
// MOBILE MENU
// ========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuPanel = document.getElementById('mobile-menu-panel');

function openMobileMenu() {
  mobileMenu.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  // Animate in
  requestAnimationFrame(() => {
    mobileMenu.style.opacity = '1';
    if (mobileMenuPanel) mobileMenuPanel.style.transform = 'translateX(0)';
  });
}

function closeMobileMenu() {
  mobileMenu.style.opacity = '0';
  if (mobileMenuPanel) mobileMenuPanel.style.transform = 'translateX(100%)';
  setTimeout(() => {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = 'unset';
  }, 300);
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);

// Close menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    closeMobileMenu();
  }
});

// ========================================
// SCROLL DOWN BUTTON
// ========================================
const scrollDownBtn = document.getElementById('scroll-down');
if (scrollDownBtn) {
  scrollDownBtn.addEventListener('click', () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// ========================================
// HERO FRAME ANIMATION
// ========================================
const TOTAL_FRAMES = 150;
const FRAME_BASE_PATH = 'image/hero-background/frame_';
const FRAME_DURATION = 46; // ~22fps

let currentFrame = 0;
let direction = 1;
let lastFrameTime = 0;
let animationId = null;
const frameCache = new Map();

// Check browser support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isLowMemory = navigator.deviceMemory !== undefined && navigator.deviceMemory < 4;
const shouldAnimate = !prefersReducedMotion && !(isMobile && window.innerWidth < 768) && !isLowMemory;

function getFramePath(frameIndex) {
  const paddedIndex = String(frameIndex).padStart(3, '0');
  return `${FRAME_BASE_PATH}${paddedIndex}_delay-0.033s.jpg`;
}

function preloadImage(frameIndex) {
  return new Promise((resolve) => {
    if (frameCache.has(frameIndex)) {
      resolve();
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      frameCache.set(frameIndex, img);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = getFramePath(frameIndex);
  });
}

function animate(timestamp) {
  if (!lastFrameTime) {
    lastFrameTime = timestamp;
  }
  
  const elapsed = timestamp - lastFrameTime;
  
  if (elapsed >= FRAME_DURATION) {
    lastFrameTime = timestamp;
    
    let nextFrame = currentFrame + direction;
    
    // Ping-pong effect
    if (nextFrame >= TOTAL_FRAMES) {
      nextFrame = TOTAL_FRAMES - 2;
      direction = -1;
    } else if (nextFrame < 0) {
      nextFrame = 1;
      direction = 1;
    }
    
    // Preload frames
    const preloadStart = direction === 1 
      ? Math.min(nextFrame, TOTAL_FRAMES - 5)
      : Math.max(nextFrame - 4, 0);
    
    for (let i = 0; i < 5; i++) {
      const preloadFrame = preloadStart + (i * direction);
      if (preloadFrame >= 0 && preloadFrame < TOTAL_FRAMES) {
        preloadImage(preloadFrame);
      }
    }
    
    // Update frame
    const heroFrame = document.getElementById('hero-frame');
    if (heroFrame) {
      heroFrame.src = getFramePath(nextFrame);
    }
    
    currentFrame = nextFrame;
  }
  
  animationId = requestAnimationFrame(animate);
}

// Initialize hero animation
async function initHeroAnimation() {
  if (!shouldAnimate) return;
  
  // Preload first 20 frames
  const initialFrames = Array.from({ length: 20 }, (_, i) => i);
  await Promise.all(initialFrames.map(preloadImage));
  
  // Start animation after short delay
  setTimeout(() => {
    animationId = requestAnimationFrame(animate);
  }, 500);
}

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================
const animateElements = document.querySelectorAll('.data-animate');

const observerOptions = {
  root: null,
  rootMargin: '-100px',
  threshold: 0.1
};

const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('opacity-0', 'translate-x-[-50px]', 'translate-x-[50px]', 'translate-y-[30px]');
      entry.target.classList.add('opacity-100');
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0) translateY(0)';
      animateObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => {
  animateObserver.observe(el);
});

// ========================================
// COUNTER ANIMATION
// ========================================
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, duration / steps);
  });
  
  countersAnimated = true;
}

const counterSection = document.querySelector('.counter')?.closest('section');
if (counterSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  counterObserver.observe(counterSection);
}

// ========================================
// CSS KEYFRAMES (Dynamically added)
// ========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes float1 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -30px); }
  }
  
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-20px, 30px); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .data-animate {
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimation();
  handleNavbarScroll();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});
