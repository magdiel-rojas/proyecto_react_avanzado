import { useState, useEffect } from 'react';

/**
 * Hook personalizado para sincronizar un estado con localStorage.
 * @param {string} key - La clave bajo la cual se guarda el valor en localStorage.
 * @param {T} initialValue - El valor inicial si no existe nada en localStorage.
 * @returns {[T, (value: T) => void]} - El valor y una función para actualizarlo.
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
   const [storedValue, setStoredValue] = useState<T>(initialValue);

   // Solo leer de localStorage después del montaje
   useEffect(() => {
      try {
         const item = window.localStorage.getItem(key);
         if (item) setStoredValue(JSON.parse(item));
      } catch (error) {
         // Manejar error si es necesario
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [key]);

   useEffect(() => {
      try {
         window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
         // Manejar error si es necesario
      }
   }, [key, storedValue]);

   // Permite usar el mismo API que setState: valor o función
   const setValue = (value: React.SetStateAction<T>) => {
      setStoredValue(value);
   };

   return [storedValue, setValue];
}

export { useLocalStorage };
