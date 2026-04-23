import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Card } from '@/shared/ui/molecules';

describe('Card', () => {
  it('renderiza el contenido correctamente', () => {
    render(<Card>Contenido de prueba</Card>);
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });

  it('aplica la clase personalizada', () => {
    const { container } = render(<Card className="mi-clase">Contenido</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('mi-clase');
  });

  it('llama a onClick cuando se hace click', () => {
    const onClick = vi.fn();
    const { container } = render(<Card onClick={onClick}>Click aquí</Card>);
    const card = container.firstChild as HTMLElement;
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalled();
  });

  it('aplica el color de borde izquierdo', () => {
    const { container } = render(<Card color="#123456">Color test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ borderLeft: '4px solid #123456' });
  });
});