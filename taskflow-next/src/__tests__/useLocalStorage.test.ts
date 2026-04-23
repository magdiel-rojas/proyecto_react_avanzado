import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks';
import { describe, beforeEach, it, expect } from 'vitest';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('debe inicializar con el valor inicial si no hay nada en localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'valorInicial'));
    expect(result.current[0]).toBe('valorInicial');
  });

  it('debe leer el valor de localStorage si existe', () => {
    window.localStorage.setItem('testKey', JSON.stringify('guardado'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'valorInicial'));
    expect(result.current[0]).toBe('guardado');
  });

  it('debe actualizar el valor y sincronizar con localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'valorInicial'));
    act(() => {
      result.current[1]('nuevoValor');
    });
    expect(result.current[0]).toBe('nuevoValor');
    expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('nuevoValor'));
  });
});