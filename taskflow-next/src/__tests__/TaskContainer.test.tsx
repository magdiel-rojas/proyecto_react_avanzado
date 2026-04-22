import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TaskContainer } from "../features/taskManagement/components/TaskContainer";

// describe duplicado eliminado
describe("TaskContainer", () => {
  it("debe coincidir con el snapshot", () => {
    const { asFragment } = render(<TaskContainer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("agrega una nueva tarea y la muestra en la lista", async () => {
    render(<TaskContainer />);
    // Completar campos
    fireEvent.change(screen.getByPlaceholderText("Título de la tarea"), { target: { value: "Tarea de prueba" } });
    fireEvent.change(screen.getByPlaceholderText("Detalles de la tarea"), { target: { value: "Descripción de prueba" } });
    fireEvent.change(screen.getByDisplayValue("Media"), { target: { value: "high" } });
    // Click en agregar
    fireEvent.click(screen.getByText("Agregar Tarea"));
    // Esperar a que aparezca la tarea
    await waitFor(() => {
      expect(screen.getByText("Tarea de prueba")).toBeInTheDocument();
      expect(screen.getByText("Descripción de prueba")).toBeInTheDocument();
    });
  });

  it("filtra tareas por estado", async () => {
    render(<TaskContainer />);
    // Por defecto muestra todas
    expect(screen.getByText("Diseñar wireframes")).toBeInTheDocument();
    // Filtrar por 'Por hacer'
    fireEvent.click(screen.getAllByText("Por hacer")[0]);
    await waitFor(() => {
      expect(screen.getByText("Escribir tests unitarios")).toBeInTheDocument();
      expect(screen.queryByText("Diseñar wireframes")).not.toBeInTheDocument();
    });
  });

  it("elimina una tarea de la lista", async () => {
    render(<TaskContainer />);
    // Filtrar por 'Por hacer' para asegurar que la tarea esté visible
    fireEvent.click(screen.getAllByText("Por hacer")[0]);
    // Buscar tarea existente
    const eliminarBtn = screen.getAllByText("Eliminar")[0];
    fireEvent.click(eliminarBtn);
    // Esperar a que desaparezca de cualquier columna
    await waitFor(() => {
      expect(screen.queryByText("Diseñar wireframes")).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });
});