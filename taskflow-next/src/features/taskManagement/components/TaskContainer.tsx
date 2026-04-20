// Client Component: contiene 'use client' porque usa hooks y lógica de estado del lado del cliente.
'use client'
import { useTasks, useTaskFilter } from "@/features/taskManagement/hooks";
import { TaskCard } from "./TaskCard";
import { TaskFilters } from "./TaskFilters";
import { TaskForm } from "./TaskForm";
import { mockTasks } from "../utils/mockData";
import { useAsync } from "@/hooks/useAsync";
import { taskService } from "@/services/taskService";

export function TaskContainer() {
    const { data: asyncTasks, loading, error, refetch } = useAsync(
        (signal) => taskService.fetchTasks(signal),
        false
    );
    const { tasks, addTask, deleteTask, updateTask, setTasks, totalTasks, completedTasks, pendingTasks } = useTasks(mockTasks);
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

    return (
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
            }}>
                <h2 style={{ margin: 0, color: '#1c3863', fontSize: '20px' }}>Mis Tareas</h2>
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
            <TaskFilters current={filter} onChange={setFilter} />
            {filteredTasks.length === 0 ? (
                <p style={{ color: '#94a3b8', textAlign: 'center', padding: '32px' }}>No hay tareas para mostrar</p>
            ) : (
                filteredTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => updateTask(task.id, { status: task.status === 'done' ? 'todo' : task.status === 'todo' ? 'in_progress' : 'done' })}
                        onDelete={() => deleteTask(task.id)}
                    />
                ))
            )}
        </div>
    );
}