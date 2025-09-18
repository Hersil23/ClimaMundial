import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LocationModal = ({ isOpen, onAllow, onDeny, theme }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current && overlayRef.current) {
      // Animación de entrada
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: 'back.out(1.7)' 
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div 
        ref={modalRef}
        className={`
          relative max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl
          ${theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
          }
        `}
      >
        {/* Ícono de ubicación */}
        <div className="text-center mb-6">
          <div className="inline-block text-6xl mb-4 animate-bounce">
            📍
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            ¿Compartir tu ubicación?
          </h2>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Permitenos acceder a tu ubicación para mostrarte el clima de tu zona
          </p>
        </div>

        {/* Información adicional */}
        <div className={`
          mb-6 p-4 rounded-lg
          ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}
        `}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌍</span>
            <div className="flex-1">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Detectaremos tu ubicación actual para mostrarte información meteorológica precisa de tu zona
              </p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onAllow}
            className={`
              flex-1 py-3 px-6 rounded-lg font-medium
              transition-all duration-300 transform
              hover:scale-105 active:scale-95
              ${theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }
              shadow-lg hover:shadow-xl
            `}
          >
            ✓ Permitir
          </button>
          
          <button
            onClick={onDeny}
            className={`
              flex-1 py-3 px-6 rounded-lg font-medium
              transition-all duration-300 transform
              hover:scale-105 active:scale-95
              ${theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }
              shadow-md hover:shadow-lg
            `}
          >
            ✗ No permitir
          </button>
        </div>

        {/* Nota de privacidad */}
        <p className={`
          text-xs text-center mt-4
          ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}
        `}>
          🔒 Tu ubicación no será almacenada ni compartida
        </p>
      </div>
    </div>
  );
};

export default LocationModal;