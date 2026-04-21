import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TaskContainer } from "../features/taskManagement/components/TaskContainer";

describe("Integración TaskContainer", () => {
  it("agrega, filtra y elimina tareas correctamente", async () => {
    render(<TaskContainer />);

    // Agregar una nueva tarea
    fireEvent.change(screen.getByPlaceholderText("Nueva tarea"), { target: { value: "Tarea integración" } });
    fireEvent.change(screen.getByPlaceholderText("Descripción"), { target: { value: "Descripción integración" } });
    fireEvent.change(screen.getByDisplayValue("Media"), { target: { value: "high" } });
    fireEvent.click(screen.getByText("Agregar Tarea"));

    // Esperar a que aparezca la tarea
    await waitFor(() => {
      expect(screen.getByText("Tarea integración")).toBeInTheDocument();
      expect(screen.getByText("Descripción integración")).toBeInTheDocument();
    });

    // Filtrar por estado 'Por hacer'
    fireEvent.click(screen.getByText("Por hacer"));
    await waitFor(() => {
      expect(screen.getByText("Tarea integración")).toBeInTheDocument();
    });

    // Eliminar la tarea
    const eliminarBtn = screen.getAllByText("Eliminar")[0];
    fireEvent.click(eliminarBtn);
    await waitFor(() => {
      expect(screen.queryByText("Tarea integración")).not.toBeInTheDocument();
    });
  });
});
