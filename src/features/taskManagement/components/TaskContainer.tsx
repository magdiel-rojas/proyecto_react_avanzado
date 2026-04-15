import { useState, useMemo } from "react";
import { mockTasks, type Task } from "../utils/mockData";
import { TaskCard } from "./TaskCard";
import { Button } from "@/shared/ui/atoms/Button";
import { Input } from "@/shared/ui/atoms/Input";

type FilterValue = "all" | Task["status"];

export function TaskContainer() {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [filter] = useState<FilterValue>("all");
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDesc, setNewTaskDesc] = useState("");
    const [error, setError] = useState("");

    const filteredTasks = useMemo(() => (filter === "all" ? tasks :
        tasks.filter(task => task.status === filter)), [tasks, filter]);

    const handleAddTask = () => {
        if (!newTaskTitle.trim()) {
            setError("El título es obligatorio");
            return;
        }
        const newTask: Task = {
            id: (tasks.length + 1).toString(),
            title: newTaskTitle,
            description: newTaskDesc,
            status: "todo",
            priority: "medium",
            project: "General",
            createdAt: new Date().toISOString().split('T')[0],
        };
        setTasks([newTask, ...tasks]);
        setNewTaskTitle("");
        setNewTaskDesc("");
        setError("");
    };

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
            }}>
                <h2 style={{ margin: 0, color: '#1c3863', fontSize: '20px' }}>Mis Tareas</h2>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <Input
                    placeholder="Nueva tarea"
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    error={error}
                    style={{ background: "#f5f1f1", color: "#000", minWidth: 180 }}
                />
                <Input
                    placeholder="Descripción"
                    value={newTaskDesc}
                    onChange={e => setNewTaskDesc(e.target.value)}
                    style={{ background: "#f5f1f1", color: "#000", minWidth: 180 }}
                />
                <Button variant="primary" size="md" style={{ margin: "4px" }} onClick={handleAddTask}>
                    Crear Tarea
                </Button>
            </div>
            {filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </>
    );
}