import gsap from 'gsap'

// Animación de entrada para el logo
export const animateLogoEntry = (element) => {
  // Primero aseguramos que sea visible
  gsap.set(element, { opacity: 1, y: 0 })
  
  // Luego animamos desde arriba
  gsap.fromTo(element, 
    { opacity: 0, y: -30 },
    { 
      opacity: 1, 
      y: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    }
  )
}

// Animación hover para el logo
export const setupLogoHover = (element) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: 1.1,
      rotation: 5,
      duration: 0.3,
      ease: 'power2.out'
    })
  })

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  })
}

// Animación de entrada para el botón
export const animateButtonEntry = (element) => {
  // Primero aseguramos que sea visible
  gsap.set(element, { opacity: 1 })
  
  // Luego animamos con rotación
  gsap.fromTo(element,
    { opacity: 0, rotation: -180, scale: 0.5 },
    {
      opacity: 1,
      rotation: 0,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: 0.5
    }
  )
}

// Animación hover para el botón
export const setupButtonHover = (element) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: 1.15,
      duration: 0.3,
      ease: 'power2.out'
    })
  })

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
  })
}