// Client Component: contiene 'use client' porque maneja eventos y hooks de React.
'use client'
import { TaskStatus } from "../utils/mockData";
import React from 'react';

type FilterValue = TaskStatus | "all";

interface FilterOption {
    value: FilterValue;
    label: string;
}

const filters: FilterOption[] = [
    { value: "all", label: "Todas" },
    { value: "todo", label: "Por hacer" },
    { value: "in_progress", label: "En progreso" },
    { value: "done", label: "Completadas" },
];

interface TaskFiltersProps {
    current: FilterValue;
    onChange: (value: FilterValue) => void;
}

const TaskFilters = React.memo(({ current, onChange }: TaskFiltersProps) => {
    return (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {filters.map(f => (
                <button
                    key={f.value}
                    onClick={() => onChange(f.value)}
                    style={{
                        padding: '6px 16px',
                        borderRadius: '20px',
                        border: current === f.value ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                        backgroundColor: current === f.value ? '#eff6ff' : '#fff',
                        color: current === f.value ? '#3b82f6' : '#64748b',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
});

export { TaskFilters };
