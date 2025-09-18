import { useState, useEffect } from 'react'

export const useTheme = () => {
  // Obtener tema inicial del localStorage o usar preferencia del sistema
  const getInitialTheme = () => {
    // Primero revisar si hay tema guardado
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    
    // Si no hay tema guardado, usar preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    return 'light'
  }

  const [theme, setTheme] = useState(getInitialTheme)

  // Aplicar el tema al HTML cuando cambie
  useEffect(() => {
    const root = window.document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // Retornar valores útiles
  return {
    theme,           // 'light' o 'dark'
    toggleTheme,     // Función para cambiar tema
    isDark: theme === 'dark'  // Boolean para saber si es modo oscuro
  }
}