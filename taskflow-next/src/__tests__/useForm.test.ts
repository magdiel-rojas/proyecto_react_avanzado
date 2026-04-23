import { renderHook, act } from '@testing-library/react';
import { useForm } from '@/hooks';
import { describe, it, expect, vi } from 'vitest';

describe('useForm', () => {
  it('debe inicializar los valores correctamente', () => {
    const { result } = renderHook(() => useForm({ initialValues: { name: '' } }));
    expect(result.current.values).toEqual({ name: '' });
    expect(result.current.errors).toEqual({});
  });

  it('debe actualizar los valores con handleChange', () => {
    const { result } = renderHook(() => useForm({ initialValues: { name: '' } }));
    act(() => {
      result.current.handleChange('name')('Juan');
    });
    expect(result.current.values).toEqual({ name: 'Juan' });
  });

  it('debe ejecutar onSubmit si no hay errores', () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useForm({ initialValues: { name: '' }, onSubmit }));
    act(() => {
      result.current.handleChange('name')('Juan');
    });
    act(() => {
      result.current.handleSubmit();
    });
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Juan' });
  });

  it('debe validar y establecer errores si existen', () => {
    const validate = (values: { name: string }) => values.name ? {} : { name: 'Requerido' };
    const { result } = renderHook(() => useForm({ initialValues: { name: '' }, validate }));
    act(() => {
      result.current.handleSubmit();
    });
    expect(result.current.errors).toEqual({ name: 'Requerido' });
  });
});