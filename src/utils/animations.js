// Animation presets for GSAP
export const fadeIn = {
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
}

export const fadeUp = {
  opacity: 0,
  y: 50,
  duration: 0.8,
  ease: 'power3.out',
}

export const fadeDown = {
  opacity: 0,
  y: -50,
  duration: 0.8,
  ease: 'power3.out',
}

export const scaleIn = {
  scale: 0.8,
  opacity: 0,
  duration: 0.6,
  ease: 'back.out(1.7)',
}

export const revealUp = {
  yPercent: 100,
  duration: 1,
  ease: 'power4.out',
}

export const revealDown = {
  yPercent: -100,
  duration: 1,
  ease: 'power4.out',
}

export const charReveal = {
  opacity: 0,
  y: 20,
  rotateX: -90,
  duration: 0.6,
  stagger: 0.02,
  ease: 'power3.out',
}

export const wordReveal = {
  yPercent: 100,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power4.out',
}

export const lineReveal = {
  yPercent: 100,
  duration: 1,
  stagger: 0.15,
  ease: 'power4.out',
}

export const imageReveal = {
  scaleX: 0,
  duration: 1.2,
  ease: 'power4.inOut',
  transformOrigin: 'left',
}

// ScrollTrigger defaults
export const scrollTriggerDefaults = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
}

// Easing functions
export const easing = {
  outExpo: 'power4.out',
  inOutExpo: 'power4.inOut',
  outQuart: 'power3.out',
  inOutQuart: 'power3.inOut',
  outBack: 'back.out(1.7)',
  inOutBack: 'back.inOut(1.7)',
  outElastic: 'elastic.out(1, 0.3)',
}

// Parallax speed presets
export const parallaxSpeeds = {
  slow: 0.3,
  medium: 0.5,
  fast: 0.8,
}
