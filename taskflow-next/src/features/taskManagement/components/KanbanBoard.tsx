// Client Component: KanbanBoard
'use client'
import React from 'react';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus, TASK_STATUSES } from '../utils/mockData';
import { Card } from '@/shared/ui';

interface KanbanBoardProps {
    tasks: Task[];
    onStatusChange: (id: string, newStatus: TaskStatus) => void;
    onDelete: (id: string) => void;
}

const statusOrder: TaskStatus[] = [
    TASK_STATUSES.TODO,
    TASK_STATUSES.IN_PROGRESS,
    TASK_STATUSES.DONE,
];

const statusLabels: Record<TaskStatus, string> = {
    todo: 'Por hacer',
    in_progress: 'En progreso',
    done: 'Completada',
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onStatusChange, onDelete }) => {
    return (
        <Card>
            <div style={{ display: 'flex', gap: 24, width: '100%' }}>
                {statusOrder.map(status => (
                    <div key={status} style={{ flex: 1, background: '#f8fafc', borderRadius: 12, padding: 12 }}>
                        <h3 style={{ textAlign: 'center', color: '#1c3863', marginBottom: 16 }}>{statusLabels[status]}</h3>
                        {tasks.filter(t => t.status === status).length === 0 ? (
                            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '16px 0' }}>Sin tareas</p>
                        ) : (
                            tasks.filter(t => t.status === status).map(task => (
                                <div key={task.id} style={{ marginBottom: 12 }}>
                                    <TaskCard
                                        task={task}
                                        onClick={() => {
                                            // Avanza el estado: todo -> in_progress -> done -> todo
                                            const nextStatus =
                                                status === TASK_STATUSES.TODO ? TASK_STATUSES.IN_PROGRESS :
                                                    status === TASK_STATUSES.IN_PROGRESS ? TASK_STATUSES.DONE :
                                                        TASK_STATUSES.TODO;
                                            onStatusChange(task.id, nextStatus);
                                        }}
                                        onDelete={() => onDelete(task.id)}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
};
