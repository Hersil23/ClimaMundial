import { useState } from 'react'
import Navbar from './components/Navbar'
import RainEffect from './components/RainEffect'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-300 relative">
      {/* Efecto de lluvia de fondo */}
      <RainEffect />
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Bienvenido a Clima App
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
            La aplicación del clima está en construcción...
          </p>
        </main>
      </div>
    </div>
  )
}

export default App