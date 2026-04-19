import { Badge } from '@/shared/ui/atoms/Badge';
import { Card } from '@/shared/ui/molecules/Card';
import type { TaskPriority, Task, TaskStatus } from '../utils/mockData';
import { Button } from '@/shared/ui';
import React from 'react';

const priorityColors: Record<TaskPriority, string> = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#22c55e',
};

const statusLabels: Record<TaskStatus, string> = {
    todo: 'Por hacer',
    in_progress: 'En progreso',
    done: 'Completada',
};

interface TaskCardProps {
    task: Task;
    onClick?: () => void;
    onDelete?: () => void;
}

const TaskCard = React.memo(({ task, onClick, onDelete }: TaskCardProps) => {
    const color = priorityColors[task.priority];
    return (
        <Card color={color}>
            <Card.Header
                title={task.title}
                actions={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {onDelete && (
                            <Button
                                variant="danger"
                                size="sm"
                                style={{ fontSize: 12 }}
                                onClick={e => { e.stopPropagation(); onDelete(); }}
                            >
                                Eliminar
                            </Button>
                        )}
                    </div>
                }
            />
            <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0', textAlign: 'center' }} className="text-sm text-gray-600">{task.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }} className="mt-3 flex items-center gap-2">
                <Badge onClick={onClick} label={statusLabels[task.status]} variant="outline" color="#6b7280" />
            </div>
        </Card>
    );
});

export { TaskCard };