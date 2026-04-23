import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TaskContainer } from "../features/taskManagement/components/TaskContainer";
import { describe, it, expect } from "vitest";

describe("Integración TaskContainer", () => {
  it("agrega, filtra y elimina tareas correctamente", async () => {
    render(<TaskContainer />);

    // Agregar una nueva tarea
    fireEvent.change(screen.getByPlaceholderText("Título de la tarea"), { target: { value: "Tarea integración" } });
    fireEvent.change(screen.getByPlaceholderText("Detalles de la tarea"), { target: { value: "Descripción integración" } });
    fireEvent.change(screen.getByDisplayValue("Media"), { target: { value: "high" } });
    fireEvent.click(screen.getByText("Agregar Tarea"));

    // Esperar a que aparezca la tarea
    await waitFor(() => {
      expect(screen.getByText("Tarea integración")).toBeInTheDocument();
      expect(screen.getByText("Descripción integración")).toBeInTheDocument();
    });

    // Filtrar por estado 'Por hacer'
    fireEvent.click(screen.getAllByText("Por hacer")[0]);
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
