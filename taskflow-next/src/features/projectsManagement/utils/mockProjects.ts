export interface Project {
  name: string;
  description: string;
  openTasks: number;
  progress: number; // porcentaje entre 0 y 100
}

export const mockProjects: Project[] = [
  {
    name: 'TaskFlow UI',
    description: 'Interfaz de usuario para la gestión de tareas.',
    openTasks: 2, // tareas con status distinto de DONE
    progress: 33, // 1 de 3 tareas completadas
  },
  {
    name: 'TaskFlow Backend',
    description: 'Servicios y lógica de negocio para autenticación y tareas.',
    openTasks: 1,
    progress: 0, // 0 de 1 tareas completadas
  },
  {
    name: 'TaskFlow DevOps',
    description: 'Automatización y despliegue continuo del proyecto.',
    openTasks: 1,
    progress: 0, // 0 de 1 tareas completadas
  },
];
