
# TaskFlow Next

## Información del Curso

**Curso:** React Avanzado  

## Descripción del Proyecto

TaskFlow Next es una aplicación web para la gestión de tareas y proyectos, desarrollada con Next.js, React y TailwindCSS. Permite crear, listar, filtrar y organizar tareas y proyectos de manera eficiente, utilizando una arquitectura modular y escalable.

## Arquitectura y Estructura del Proyecto

El proyecto sigue una arquitectura basada en features y componentes reutilizables. Las principales carpetas son:

- **/src/app/**: Páginas principales de la aplicación (Next.js App Router).
- **/src/features/**: Lógica de negocio agrupada por dominio (taskManagement, projectsManagement).
- **/src/contexts/**: Contextos globales de React para manejo de estado y temas.
- **/src/hooks/**: Custom hooks reutilizables.
- **/src/services/**: Servicios para acceso a datos y lógica externa.
- **/src/shared/**: Componentes UI reutilizables (atoms, molecules, components).
- **/public/**: Recursos estáticos.

### Tecnologías principales
- Next.js
- React
- TailwindCSS
- TypeScript

## Estructura de Carpetas
src/
	app/                # Páginas principales (Next.js)
		projects/         # Página de proyectos
		tasks/            # Página de tareas
	features/
		projectsManagement/   # Lógica de proyectos
		taskManagement/       # Lógica de tareas
	contexts/           # Contextos globales
	hooks/              # Custom hooks
	services/           # Servicios de datos
	shared/
		components/       # Componentes compartidos
		ui/               # Átomos y moléculas UI
public/               # Recursos estáticos

## Instalación y Ejecución

1. Clona el repositorio:
	 ```bash
	 git clone [URL_DEL_REPOSITORIO]
	 cd taskflow-next
	 ```
2. Instala las dependencias:
	 ```bash
	 npm install  # o  yarn install
	 ```
3. Inicia el servidor de desarrollo:
	 ```bash
	 npm run dev # o yarn dev
	 ```
4. Abre (http://localhost:3000) en tu navegador.
