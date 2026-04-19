'use client'
import { useState } from "react";

export interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit?: (values: T) => void;
}

export function useForm<T extends Record<string, any>>({ initialValues, validate, onSubmit }: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (field: keyof T) => (value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    let validationErrors: Partial<Record<keyof T, string>> = {};
    if (validate) {
      validationErrors = validate(values) || {};
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
    }
    setErrors({});
    onSubmit?.(values);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
