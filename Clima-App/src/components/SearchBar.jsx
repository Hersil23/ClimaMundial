import { useState } from 'react';

const SearchBar = ({ onSearch, theme }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (city.trim() === '') {
      setError('Por favor ingresa el nombre de una ciudad');
      return;
    }
    
    setError('');
    onSearch(city);
    setCity(''); // Limpiar el input después de buscar
  };

  const handleChange = (e) => {
    setCity(e.target.value);
    if (error) setError(''); // Limpiar error cuando el usuario escribe
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Escribe aquí el nombre de una ciudad..."
            className={`
              w-full px-6 py-4 pr-32 rounded-full text-lg
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${theme === 'dark' 
                ? 'bg-gray-800/50 text-white placeholder-gray-400 backdrop-blur-md' 
                : 'bg-white/50 text-gray-900 placeholder-gray-500 backdrop-blur-md'
              }
              shadow-lg hover:shadow-xl
            `}
          />
          
          <button
            type="submit"
            className={`
              absolute right-2 px-6 py-2 rounded-full
              font-medium transition-all duration-300
              flex items-center gap-2
              ${theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }
              transform hover:scale-105 active:scale-95
            `}
          >
            <span className="text-xl">🔍</span>
            <span>Buscar</span>
          </button>
        </div>
        
        {error && (
          <div className="absolute mt-2 text-red-500 text-sm px-4 animate-pulse">
            ⚠️ {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;