import gsap from 'gsap'

// Animación del Navbar - CORREGIDA
export const animateNavbar = (element) => {
  gsap.fromTo(element, 
    {
      y: -100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }
  )
}

// Animación del botón de tema
export const animateButton = (element) => {
  gsap.to(element, {
    scale: 1.1,
    duration: 0.2,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut'
  })
}

// Animación hover para el logo
export const animateLogo = (element, isHovering) => {
  gsap.to(element, {
    scale: isHovering ? 1.1 : 1,
    rotate: isHovering ? 10 : 0,
    duration: 0.3,
    ease: 'power2.out'
  })
}