import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const SearchBar = ({ onSearch, theme }) => {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const searchBarRef = useRef(null)
  const buttonRef = useRef(null)

  // Animación de entrada al montar el componente
  useEffect(() => {
    gsap.from(searchBarRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.2)',
      delay: 0.3
    })
  }, [])

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validación básica
    if (city.trim() === '') {
      setError('Por favor ingresa el nombre de una ciudad')
      
      // Animación de error (shake)
      gsap.to(searchBarRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: 'power2.inOut'
      })
      return
    }

    // Limpiar error y buscar
    setError('')
    onSearch(city.trim())
    
    // Animación del botón al hacer click
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
  }

  // Manejar cambios en el input
  const handleInputChange = (e) => {
    setCity(e.target.value)
    if (error) setError('') // Limpiar error al escribir
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <form 
        ref={searchBarRef}
        onSubmit={handleSubmit}
        className="relative"
      >
        {/* Contenedor principal del search bar */}
        <div className="flex gap-3">
          
          {/* Input */}
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Buscar ciudad... (ej: Madrid, Londres)"
            className={`
              flex-1 px-6 py-4 rounded-2xl text-lg
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              border-2 
              ${error 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              transition-all duration-300
              shadow-lg hover:shadow-xl
            `}
          />

          {/* Botón de búsqueda */}
          <button
            ref={buttonRef}
            type="submit"
            className="
              px-8 py-4 rounded-2xl
              bg-gradient-to-r from-blue-500 to-blue-600 
              dark:from-blue-600 dark:to-blue-700
              text-white font-semibold text-lg
              hover:from-blue-600 hover:to-blue-700
              dark:hover:from-blue-500 dark:hover:to-blue-600
              transition-all duration-300
              shadow-lg hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-blue-400
              active:scale-95
            "
          >
            <span className="flex items-center gap-2">
              🔍 Buscar
            </span>
          </button>
        </div>

        {/* Mensaje de error */}
        {error && (
          <p className="mt-3 text-red-500 dark:text-red-400 text-sm font-medium px-2">
            ⚠️ {error}
          </p>
        )}
      </form>

      {/* Sugerencias de ciudades populares */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-800 dark:text-gray-200 mb-2 font-medium">
          Ciudades populares:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Madrid', 'Barcelona', 'Buenos Aires', 'México DF', 'Lima'].map((cityName) => (
            <button
              key={cityName}
              onClick={() => {
                setCity(cityName)
                onSearch(cityName)
              }}
              className="
                px-4 py-2 rounded-full text-sm font-medium
                bg-gray-200 dark:bg-gray-600
                text-gray-900 dark:text-white
                hover:bg-gray-300 dark:hover:bg-gray-500
                transition-all duration-200
                hover:scale-105
              "
            >
              {cityName}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBar