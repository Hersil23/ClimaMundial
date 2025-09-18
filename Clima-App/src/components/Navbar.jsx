import { useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'
import logo from '../assets/logo.png'
import { 
  animateLogoEntry, 
  setupLogoHover, 
  animateButtonEntry, 
  setupButtonHover 
} from '../utils/animations'

const Navbar = () => {
  const { theme, toggleTheme, isDark } = useTheme()
  const logoRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
  // Animaciones de entrada
  if (logoRef.current) {
    animateLogoEntry(logoRef.current)
    setupLogoHover(logoRef.current)
  }
  
  if (buttonRef.current) {
    animateButtonEntry(buttonRef.current)
    setupButtonHover(buttonRef.current)
  }
}, [])
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center space-x-3">
            <img 
              ref={logoRef}
              src={logo} 
              alt="Clima App Logo" 
              className="h-32 w-32 object-contain cursor-pointer filter drop-shadow-lg"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              CLIMA APP
            </h1>
          </div>

          <button
            ref={buttonRef}
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-gray-700 dark:to-gray-600 shadow-lg transition-all duration-200"
            aria-label="Cambiar tema"
          >
            {isDark ? (
              <svg className="w-7 h-7 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

        </div>
      </div>
    </nav>
  )
}

export default Navbar