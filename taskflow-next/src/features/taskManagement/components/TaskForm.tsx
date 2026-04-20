// Client Component: contiene 'use client' porque utiliza hooks y lógica de formularios.
'use client'
import { Input } from "@/shared/ui/atoms/Input";
import { Button } from "@/shared/ui/atoms/Button";
import { useForm } from "@/hooks/useForm";

interface TaskFormValues {
  title: string;
  description: string;
  priority: string;
}

interface TaskFormProps {
  initialValues?: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
}

export function TaskForm({ initialValues = { title: "", description: "", priority: "medium" }, onSubmit }: TaskFormProps) {
  const { values, errors, handleChange, handleSubmit, resetForm, } = useForm<TaskFormValues>({
    initialValues,
    validate: (vals) => {
      const err: Partial<Record<keyof TaskFormValues, string>> = {};
      if (!vals.title.trim()) err.title = "El título es obligatorio";
      return err;
    },
    onSubmit: (vals) => {
      onSubmit(vals);
      resetForm();
    },
  });

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <Input
        placeholder="Nueva tarea"
        value={values.title}
        onChange={e => handleChange("title")(e.target.value)}
        error={errors.title}
        style={{ background: "#f5f1f1", color: "#000", minWidth: 180 }}
      />
      <Input
        placeholder="Descripción"
        value={values.description}
        onChange={e => handleChange("description")(e.target.value)}
        style={{ background: "#f5f1f1", color: "#000", minWidth: 180 }}
      />
      <select
        value={values.priority}
        onChange={e => handleChange("priority")(e.target.value)}
        style={{ minWidth: 120, padding: '8px', borderRadius: 6, border: '1px solid #ccc', background: '#f5f1f1', color: '#000', height: 42 }}
      >
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
      <Button variant="primary" size="md" style={{ margin: "0", height: 42 }} onClick={handleSubmit}>
        Agregar Tarea
      </Button>
    </div>
  );
}
