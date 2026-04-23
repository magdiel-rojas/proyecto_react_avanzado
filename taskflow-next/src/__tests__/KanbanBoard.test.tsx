import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { KanbanBoard } from '../features/taskManagement/components/KanbanBoard';
import { TASK_STATUSES, mockTasks, Task } from '../features/taskManagement/utils/mockData';

describe('KanbanBoard', () => {
  it('muestra las columnas y tareas correctamente', () => {
    render(
      <KanbanBoard tasks={mockTasks} onStatusChange={vi.fn()} onDelete={vi.fn()} />
    );
    // Verifica que existan los títulos de columna
    expect(screen.getAllByText('Por hacer').length).toBeGreaterThan(0);
    expect(screen.getAllByText('En progreso').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Completada').length).toBeGreaterThan(0);
    // Verifica que una tarea de cada columna esté presente
    expect(screen.getByText('Diseñar wireframes')).toBeInTheDocument();
    expect(screen.getByText('Implementar autenticación')).toBeInTheDocument();
    expect(screen.getByText('Escribir tests unitarios')).toBeInTheDocument();
  });

  it('llama a onStatusChange al hacer click en una tarea', () => {
    const onStatusChange = vi.fn();
    render(
      <KanbanBoard tasks={mockTasks} onStatusChange={onStatusChange} onDelete={vi.fn()} />
    );
    // Buscar el div contenedor de la tarjeta (abuelo del texto)
    const tarea = screen.getByText('Escribir tests unitarios');
    const cardDiv = tarea.parentElement?.parentElement;
    fireEvent.click(cardDiv!);
    expect(onStatusChange).toHaveBeenCalled();
  });

  it('llama a onDelete al hacer click en Eliminar', () => {
    const onDelete = vi.fn();
    render(
      <KanbanBoard tasks={mockTasks} onStatusChange={vi.fn()} onDelete={onDelete} />
    );
    // Buscar el primer botón Eliminar y hacer click
    const eliminarBtn = screen.getAllByText('Eliminar')[0];
    fireEvent.click(eliminarBtn);
    expect(onDelete).toHaveBeenCalled();
  });

  it('muestra mensaje Sin tareas si no hay tareas en una columna', () => {
    const emptyTasks: Task[] = mockTasks.filter(t => t.status !== TASK_STATUSES.DONE);
    render(
      <KanbanBoard tasks={emptyTasks} onStatusChange={vi.fn()} onDelete={vi.fn()} />
    );
    expect(screen.getByText('Sin tareas')).toBeInTheDocument();
  });
});