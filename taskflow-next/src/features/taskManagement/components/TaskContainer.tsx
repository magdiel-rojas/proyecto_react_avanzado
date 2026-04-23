// Client Component: contiene 'use client' porque usa hooks y lógica de estado del lado del cliente.
'use client'
import { useState, useEffect } from "react";
import { useTasks, useTaskFilter } from "@/features/taskManagement/hooks";
import { useAsync, useDebounce } from "@/hooks";
import { KanbanBoard } from "./KanbanBoard";
import { TaskFilters } from "./TaskFilters";
import { TaskForm } from "./TaskForm";
import { mockTasks } from "../utils/mockData";
import { taskService } from "@/services/taskService";

export function TaskContainer() {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const { refetch } = useAsync(
        (signal) => taskService.fetchTasks(signal),
        false
    );
    // Inicializar tareas desde localStorage si existe, si no usar mockTasks
    function getInitialTasks() {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('kanban_tasks');
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch {}
            }
        }
        return mockTasks;
    }
    const { tasks, addTask, deleteTask, updateTask, totalTasks, completedTasks, pendingTasks } = useTasks(getInitialTasks());
    // Guardar en localStorage cada vez que cambian las tareas
    useEffect(() => {
        localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
    }, [tasks]);
    const { filter, setFilter, filteredTasks } = useTaskFilter(tasks);

    // useAsync para simular inserción asíncrona de tarea
    const { loading: loadingInsert, error: errorInsert, refetch: insertTaskAsync } = useAsync(
        async (_signal) => {
            // Aquí puedes adaptar los datos según tu lógica
            // Se usará la última tarea agregada localmente
            const lastTask = tasks[tasks.length - 1];
            await taskService.createTask({
                title: lastTask.title,
                completed: false,
                projectId: 1,
            });
            // Simula recarga tras inserción
            refetch();
            return null;
        },
        false
    );

    // Filtrar tareas por búsqueda
    const searchedTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        task.description.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return (
        <div style={{ maxWidth: '70%', margin: '0 auto', padding: '24px' }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
            }}>
                <h2 style={{ margin: 0, color: '#1c3863', fontSize: '20px' }}>Dashboard de Tareas</h2>
                <div style={{ display: 'flex', gap: 24, marginBottom: 16, color: 'black' }}>
                    <span>Total: <b>{totalTasks}</b></span>
                    <span>Completadas: <b>{completedTasks}</b></span>
                    <span>Pendientes: <b>{pendingTasks}</b></span>
                </div>
            </div>
            <TaskForm
                onSubmit={({ title, description, priority }) => {
                    addTask(title, description, priority);
                    insertTaskAsync(); // Simula inserción asíncrona
                }}
            />
            {loadingInsert && <p style={{ color: '#1c3863', textAlign: 'center' }}>Guardando tarea...</p>}
            {errorInsert && <p style={{ color: 'red', textAlign: 'center' }}>Error al guardar tarea</p>}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "16px 0 0px 0" }}>
                <TaskFilters current={filter} onChange={setFilter} />
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar tarea..."
                    style={{ marginBottom: 16, padding: 8, borderRadius: 8, border: "1px solid #ccc", color: '#000' }}
                />
            </div>
            <KanbanBoard
                tasks={searchedTasks}
                onStatusChange={(id, newStatus) => updateTask(id, { status: newStatus })}
                onDelete={deleteTask}
            />
        </div>
    );
}