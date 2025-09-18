import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const RainEffect = ({ theme = 'light' }) => {
  const rainContainerRef = useRef(null)

  useEffect(() => {
    const container = rainContainerRef.current
    const numberOfDrops = 50

    for (let i = 0; i < numberOfDrops; i++) {
      const drop = document.createElement('div')
      drop.className = 'rain-drop'

      const xPos = Math.random() * 100
      const height = Math.random() * 30 + 20
      const opacity = Math.random() * 0.3 + 0.1

      // Color base según tema
      const baseColor =
        theme === 'light'
          ? `rgba(100, 150, 255, ${opacity})` // azul más vibrante para modo claro
          : `rgba(174, 194, 224, ${opacity})` // tono más suave para modo oscuro

      // Estilo de la gota
      drop.style.cssText = `
        position: absolute;
        left: ${xPos}%;
        top: -50px;
        width: 2px;
        height: ${height}px;
        background: linear-gradient(to bottom, transparent, ${baseColor});
        pointer-events: none;
        filter: ${theme === 'light' ? 'drop-shadow(0 0 2px rgba(100,150,255,0.5))' : 'none'};
      `

      container.appendChild(drop)

      gsap.to(drop, {
        y: window.innerHeight + 100,
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 2,
        repeat: -1,
        ease: 'linear',
        onRepeat: () => {
          drop.style.left = `${Math.random() * 100}%`
        }
      })
    }

    return () => {
      container.innerHTML = ''
    }
  }, [theme])

  return (
    <div
      ref={rainContainerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}

export default RainEffect