// Custom hook de tipo CLIENT: requiere 'use client' porque utiliza hooks de React (useReducer, useState, useMemo).
'use client'
import { useReducer, useState, useMemo } from "react";
import { Task } from "@/features/taskManagement/utils/mockData";

type Action =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'SET_TASKS'; payload: Task[] };

function tasksReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [action.payload, ...state];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload.id);
    case 'UPDATE_TASK':
      return state.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
      );
    case 'SET_TASKS':
      return action.payload;
    default:
      return state;
  }
}

export function useTasks(initialTasks: Task[]) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const addTask = (title: string, description: string, priority: string) => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title,
      description,
      status: "todo",
      priority: priority as Task["priority"],
      project: "General",
      createdAt: new Date().toISOString().split('T')[0],
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: { id } });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const setTasks = (tasks: Task[]) => {
    dispatch({ type: 'SET_TASKS', payload: tasks });
  };

  const totalTasks = useMemo(() => tasks.length, [tasks]);
  const completedTasks = useMemo(() => tasks.filter(t => t.status === 'done').length, [tasks]);
  const pendingTasks = useMemo(() => tasks.filter(t => t.status !== 'done').length, [tasks]);

  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    setTasks,
    totalTasks,
    completedTasks,
    pendingTasks,
  };
}
