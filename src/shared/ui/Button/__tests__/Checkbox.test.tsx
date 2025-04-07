import React from 'react';
import { render, screen } from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import { Checkbox } from '../Checkbox';

describe('Checkbox Component', () => {
  // 1. Базовый рендеринг
  it('should render correctly with default props', () => {
    render(<Checkbox text="Test Checkbox" />);

    expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  // 2. Проверка состояния checked
  it('should reflect checked state', () => {
    render(<Checkbox text="Test" checked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  // 3. Проверка переключения состояния
  it('should toggle when clicked', async () => {
    const user = userEvent.setup();
    render(<Checkbox text="Test" />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  // 4. Проверка вызова onClick
  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Checkbox text="Test" onClick={handleClick} />);

    await user.click(screen.getByText('Test'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 5. Проверка disabled состояния
  it('should not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<Checkbox text="Test" disabled={true} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  // 6. Проверка tooltip
  it('should show tooltip on hover', async () => {
    const user = userEvent.setup();
    render(<Checkbox text="Test" tooltipText="Tooltip content" />);

    const infoIcon = screen.getByRole('img', { name: 'info' });
    await user.hover(infoIcon);

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    await user.unhover(infoIcon);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  // 7. Проверка цветов для разных тем
  it('should apply correct colors for blue theme', () => {
    render(<Checkbox text="Test" theme="blue" checked={true} />);
    const icon = screen.getByRole('img', { name: 'checkboxChecked' });
    expect(icon).toHaveAttribute('color', '#5884DD');
  });

  it('should apply correct colors for orange theme', () => {
    render(<Checkbox text="Test" theme="orange" checked={true} />);
    const icon = screen.getByRole('img', { name: 'checkboxChecked' });
    expect(icon).toHaveAttribute('color', '#DB6300');
  });

  // 8. Проверка синхронизации с props.checked
  it('should update when props.checked changes', () => {
    const { rerender } = render(<Checkbox text="Test" checked={false} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<Checkbox text="Test" checked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  // 9. Проверка className
  it('should apply custom className', () => {
    render(<Checkbox text="Test" className="custom-class" />);
    expect(screen.getByTestId('checkbox-wrapper')).toHaveClass('custom-class');
  });
});
