import { useEffect, useRef } from 'react'
import logo from '../assets/logo.png'
import { animateNavbar, animateButton, animateLogo } from '../utils/animations'

const Navbar = ({ theme, onToggleTheme }) => {
  const navbarRef = useRef(null)
  const buttonRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    animateNavbar(navbarRef.current)
  }, [])

  const handleThemeToggle = () => {
    animateButton(buttonRef.current)
    onToggleTheme()
  }

  return (
    <nav 
      ref={navbarRef}
      className="sticky top-0 z-20 px-4 sm:px-6 py-1.5 bg-white dark:bg-gray-800 shadow-lg transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo y Título */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img 
            ref={logoRef}
            src={logo} 
            alt="Clima App Logo" 
            className={`h-28 w-28 sm:h-20 sm:w-20 md:h-22 md:w-22 transition-all duration-500 cursor-pointer ${
              theme === 'dark' ? 'invert' : ''
            }`}
            onMouseEnter={() => animateLogo(logoRef.current, true)}
            onMouseLeave={() => animateLogo(logoRef.current, false)}
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Clima App
          </h1>
        </div>

        {/* Botón de tema */}
        <button
          ref={buttonRef}
          onClick={handleThemeToggle}
          className="px-3 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white text-sm sm:text-base font-semibold hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span className="hidden sm:inline">
            {theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
          </span>
          <span className="sm:hidden">
            {theme === 'light' ? '🌙' : '☀️'}
          </span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar