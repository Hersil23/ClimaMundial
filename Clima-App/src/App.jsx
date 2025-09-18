import { useState } from 'react'
import Navbar from './components/Navbar'
import RainEffect from './components/RainEffect'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import { useTheme } from './hooks/useTheme'
import { getWeatherByCity } from './services/weatherAPI'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (cityName) => {
    setLoading(true)
    setError('')
    setWeatherData(null)
    
    try {
      const data = await getWeatherByCity(cityName)
      setWeatherData(data)
    } catch (err) {
      setError(err.message || 'Error al obtener los datos del clima')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      
      <RainEffect theme={theme} />      
      <Navbar theme={theme} onToggleTheme={toggleTheme} />      
      <main className="pt-8 pb-12 px-4">
        <SearchBar onSearch={handleSearch} theme={theme} />
        
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