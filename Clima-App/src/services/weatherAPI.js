// weatherAPI.js - Servicio para consumir la API de OpenWeatherMap

const API_KEY = '619a3754b16a069926bf8368c3bb21d3'; // Tu API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Obtiene los datos del clima para una ciudad específica
 * @param {string} cityName - Nombre de la ciudad
 * @returns {Promise<Object>} Datos del clima procesados
 */
export const getWeatherByCity = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=es`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Ciudad no encontrada. Por favor verifica el nombre.');
      }
      if (response.status === 401) {
        throw new Error('Error de autenticación con la API');
      }
      throw new Error('Error al obtener los datos del clima');
    }

    const data = await response.json();
    
    // Procesar y formatear los datos
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convertir m/s a km/h
      pressure: data.main.pressure,
      clouds: data.clouds.all,
      visibility: Math.round(data.visibility / 1000), // Convertir a km
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };
  } catch (error) {
    console.error('Error en getWeatherByCity:', error);
    throw error;
  }
};

/**
 * Obtiene los datos del clima usando coordenadas geográficas
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 * @returns {Promise<Object>} Datos del clima procesados
 */
export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error('Error al obtener los datos del clima');
    }

    const data = await response.json();
    
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      pressure: data.main.pressure,
      clouds: data.clouds.all,
      visibility: Math.round(data.visibility / 1000),
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };
  } catch (error) {
    console.error('Error en getWeatherByCoords:', error);
    throw error;
  }
};

/**
 * Obtiene la ubicación actual del usuario
 * @returns {Promise<Object>} Datos del clima de la ubicación actual
 */
export const getCurrentLocationWeather = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalización no soportada por tu navegador'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoords(latitude, longitude);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(new Error('No se pudo obtener tu ubicación'));
      }
    );
  });
};