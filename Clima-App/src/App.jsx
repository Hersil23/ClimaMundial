import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import RainEffect from './components/RainEffect'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import LocationModal from './components/LocationModal'
import { useTheme } from './hooks/useTheme'
import { getWeatherByCity, getCurrentLocationWeather } from './services/weatherAPI'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showLocationModal, setShowLocationModal] = useState(true)

  // Manejar cuando el usuario PERMITE la ubicación
  const handleAllowLocation = async () => {
    setShowLocationModal(false)
    setLoading(true)
    setError('')
    
    try {
      const data = await getCurrentLocationWeather()
      setWeatherData(data)
    } catch (err) {
      // Si falla la geolocalización, usar Caracas DC por defecto
      console.error('Error al obtener ubicación:', err)
      setError('No se pudo obtener tu ubicación. Mostrando Caracas DC.')
      handleSearch('Caracas DC.')
    } finally {
      setLoading(false)
    }
  }

  // Manejar cuando el usuario NIEGA la ubicación
  const handleDenyLocation = () => {
    setShowLocationModal(false)
    // Cargar Caracas DC por defecto
    handleSearch('Caracas DC')
  }

  const handleSearch = async (cityName) => {
    setLoading(true)
    setError('')
    
    try {
      const data = await getWeatherByCity(cityName)
      setWeatherData(data)
    } catch (err) {
      setError(err.message || 'Error al obtener los datos del clima')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const popularCities = ['Madrid', 'Barcelona', 'Buenos Aires', 'México DF', 'Caracas', 'Lima']

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      
      {/* Modal de ubicación */}
      <LocationModal 
        isOpen={showLocationModal}
        onAllow={handleAllowLocation}
        onDeny={handleDenyLocation}
        theme={theme}
      />
      
      <RainEffect theme={theme} />      
      <Navbar theme={theme} onToggleTheme={toggleTheme} />      
      
      <main className="pt-8 pb-12 px-4">
        <SearchBar onSearch={handleSearch} theme={theme} />
        
        {/* Ciudades populares */}
        <div className="text-center mt-8">
          <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
            Ciudades populares:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularCities.map(city => (
              <button
                key={city}
                onClick={() => handleSearch(city)}
                disabled={loading}
                className={`
                  px-5 py-2 rounded-full font-medium
                  transition-all duration-300 transform
                  ${loading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-105 active:scale-95'
                  }
                  ${theme === 'dark'
                    ? 'bg-gray-700 text-gray-200 hover:bg-blue-600'
                    : 'bg-white text-gray-800 hover:bg-blue-500 hover:text-white shadow-md'
                  }
                `}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
        
        {/* Loading */}
        {loading && (
          <div className="text-center mt-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-700 dark:text-gray-300">Cargando...</p>
          </div>
        )}
        
        {/* Error */}
        {error && (
          <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-center">⚠️ {error}</p>
          </div>
        )}
        
        {/* Weather Card */}
        {weatherData && !loading && (
          <WeatherCard weatherData={weatherData} theme={theme} />
        )}
      </main>
      
    </div>
  )
}

export default App