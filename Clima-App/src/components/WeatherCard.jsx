import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const WeatherCard = ({ weatherData }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.2)'
        }
      )
    }
  }, [weatherData])

  if (!weatherData) return null

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`

  return (
    <div 
      ref={cardRef}
      className="max-w-lg mx-auto mt-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {weatherData.city}, {weatherData.country}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 capitalize mt-1">
          {weatherData.description}
        </p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <img 
          src={iconUrl} 
          alt={weatherData.description}
          className="w-24 h-24 drop-shadow-lg"
        />
        <div className="text-6xl font-bold text-gray-900 dark:text-gray-100 ml-3">
          {weatherData.temperature}°C
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        
        <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold tracking-wide">SENSACIÓN</p>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {weatherData.feelsLike}°C
          </p>
        </div>

        <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold tracking-wide">HUMEDAD</p>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {weatherData.humidity}%
          </p>
        </div>

        <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold tracking-wide">VIENTO</p>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {weatherData.windSpeed} m/s
          </p>
        </div>

        <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold tracking-wide">PRESIÓN</p>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {weatherData.pressure} hPa
          </p>
        </div>

      </div>
    </div>
  )
}

export default WeatherCard