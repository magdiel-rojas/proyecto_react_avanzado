// Client Component: contiene 'use client' porque maneja eventos y estado en el cliente.
'use client'
import { Task } from "../utils/mockData";

interface TaskListProps {
    tasks: Task[];
    filter: string;
    onAddTask: (taskData: Omit<Task, "createdAt" | "id">) => void;
    onDeleteTask: (id: string) => void;
    onFilterChange: (filter: string) => void;
}

export function TaskList({
    tasks,
    filter,
    onAddTask,
    onDeleteTask,
    onFilterChange,
}: TaskListProps) {
    return (
        <div className="task-list">
            <div className="filters">
                <button
                    onClick={() => onFilterChange('all')}
                    className={filter === 'all' ? 'active' : ''}
                >
                    Todas
                </button>
                <button
                    onClick={() => onFilterChange('pending')}
                    className={filter === 'pending' ? 'active' : ''}
                >
                    Pendientes
                </button>
                <button
                    onClick={() => onFilterChange('completed')}
                    className={filter === 'completed' ? 'active' : ''}
                >
                    Completadas
                </button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.status === 'done'}
                            readOnly
                        />
                        <span className={task.status === 'done' ? 'completed' : ''}>
                            {task.title}
                        </span>
                        <button onClick={() => onDeleteTask(task.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => onAddTask({
                title: 'Nueva tarea',
                description: '',
                status: 'todo',
                priority: 'high',
                project: '',
            })}>
                Añadir tarea
            </button>
        </div>
    );
}