import { renderHook, act } from '@testing-library/react';
import { useTaskFilter } from '../features/taskManagement/hooks/useTaskFilter';
import { Task } from '../features/taskManagement/utils/mockData';
import { describe, it, expect } from 'vitest';

describe('useTaskFilter', () => {
  const tasks: Task[] = [
    {
       id: '1', title: 'Tarea 1', description: '', status: 'todo', priority: 'high',
       project: '',
       createdAt: ''
    },
    {
       id: '2', title: 'Tarea 2', description: '', status: 'in_progress', priority: 'low',
       project: '',
       createdAt: ''
    },
    {
       id: '3', title: 'Tarea 3', description: '', status: 'done', priority: 'medium',
       project: '',
       createdAt: ''
    },
  ];

  it('devuelve todas las tareas por defecto', () => {
    const { result } = renderHook(() => useTaskFilter(tasks));
    expect(result.current.filteredTasks).toHaveLength(3);
  });

  it('filtra tareas por estado', () => {
    const { result } = renderHook(() => useTaskFilter(tasks));
    act(() => {
      result.current.setFilter('todo');
    });
    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].status).toBe('todo');
  });

  it('cambia el filtro correctamente', () => {
    const { result } = renderHook(() => useTaskFilter(tasks));
    act(() => {
      result.current.setFilter('done');
    });
    expect(result.current.filter).toBe('done');
    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].status).toBe('done');
  });
});