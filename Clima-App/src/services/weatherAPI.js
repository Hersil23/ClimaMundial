const API_KEY = '401eeeef70e1d5c13b0f9efa997ec276'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const getWeatherByCity = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=es`
    )
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Ciudad no encontrada')
      }
      throw new Error('Error al obtener los datos del clima')
    }
    
    const data = await response.json()
    
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      clouds: data.clouds.all,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone
    }
  } catch (error) {
    console.error('Error en getWeatherByCity:', error)
    throw error
  }
}

export const getForecast = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=es`
    )
    
    if (!response.ok) {
      throw new Error('Error al obtener el pronóstico')
    }
    
    const data = await response.json()
    
    const dailyForecast = data.list.filter(item => 
      item.dt_txt.includes('12:00:00')
    ).map(item => ({
      date: item.dt_txt,
      temperature: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity
    }))
    
    return dailyForecast
  } catch (error) {
    console.error('Error en getForecast:', error)
    throw error
  }
}