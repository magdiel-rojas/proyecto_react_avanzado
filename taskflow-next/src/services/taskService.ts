// Simulación de tareas en "base de datos"
interface TaskData {
   id: number;
   title: string;
   completed: boolean;
   projectId: number;
}
const mockTasks: TaskData[] = [
   {
      id: 1, title: 'Aprender Context API', completed: false, projectId:
         1
   },
   {
      id: 2, title: 'Entender useEffect', completed: true, projectId: 1
   },
   {
      id: 3, title: 'Manejar estado async', completed: false, projectId:
         2
   },
];
// Simular delay de red
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
export const taskService = {
   /**
   * Obtener todas las tareas
   * Simula: GET /api/tasks
   */
   async fetchTasks(signal?: AbortSignal) {
      await delay(1500); // Simular latencia de red
      if (signal?.aborted) {
         throw new DOMException('Aborted', 'AbortError');
      }
      return mockTasks;
   },
   /**
   * Obtener tareas por proyecto
   * Simula: GET /api/projects/:projectId/tasks
   */
   async fetchTasksByProject(projectId: number, signal?: AbortSignal) {
      await delay(1200);
      if (signal?.aborted) {
         throw new DOMException('Aborted', 'AbortError');
      }
      return mockTasks.filter(t => t.projectId === projectId);
   },
   /**
   * Crear nueva tarea
   * Simula: POST /api/tasks
   */
   async createTask(taskData: Omit<TaskData, 'id'>, signal?: AbortSignal) {
      await delay(800);
      if (signal?.aborted) {
         throw new DOMException('Aborted', 'AbortError');
      }
      const newTask = {
         id: Date.now(),
         ...taskData,
         completed: false
      };
      mockTasks.push(newTask);
      return newTask;
   },
   /**
   * Actualizar tarea
   * Simula: PATCH /api/tasks/:id
   */
   async updateTask(id: number, updates: Partial<TaskData>, signal?: AbortSignal) {
      await delay(600);
      if (signal?.aborted) {
         throw new DOMException('Aborted', 'AbortError');
      }
      const task = mockTasks.find(t => t.id === id);
      if (!task) throw new Error('Task not found');

      Object.assign(task, updates);
      return task;
   }
};