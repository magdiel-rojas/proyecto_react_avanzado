// Client Component: contiene 'use client' porque utiliza hooks y lógica de formularios.
'use client'
import { Input, Button, Card, TextArea } from "@/shared/ui";
import { useForm } from "@/hooks/useForm";

interface TaskFormValues extends Record<string, unknown> {
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
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <Input
          label="Título *"
          error={errors.title}
          name="title"
          value={values.title}
          onChange={e => handleChange("title")(e.target.value)}
          placeholder="Título de la tarea"
          type="text"
          style={{ background: "#f5f1f1", color: "#000", minWidth: 180 }}
        />
        <TextArea
          label="Descripción"
          name="description"
          value={values.description}
          onChange={e => handleChange("description")(e.target.value)}
          placeholder="Detalles de la tarea"
          rows={3}
          style={{ background: "#f5f1f1", color: "#000", minWidth: 180 }}
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="mb-1 block text-sm font-medium text-gray-700" style={{ margin: "4px" }}>
            Prioridad
          </label>
          <select
            value={values.priority}
            onChange={e => handleChange("priority")(e.target.value)}
            style={{ minWidth: 120, padding: '8px', borderRadius: 6, border: '1px solid #ccc', background: '#f5f1f1', color: '#000', height: 42 }}
            id="priority"
            name="priority"
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>
        <Button type="submit" variant="primary" size="sm" style={{ marginTop: "8px" }}>
          Agregar Tarea
        </Button>
      </form>
    </Card>
  );
}