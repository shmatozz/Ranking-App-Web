import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeInput } from '@/shared/ui/Input/CodeInput';

const TestWrapper = () => {
  const [code, setCode] = React.useState("");
  return <CodeInput code={code} setCode={setCode} />;
};

describe('CodeInput', () => {
  it('should render six input fields', () => {
    render(<TestWrapper />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('should allow typing a single digit and move to the next input', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);
    const inputs = screen.getAllByRole('textbox');

    await user.type(inputs[0], '5');

    expect(inputs[0]).toHaveValue('5');
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('should not accept letters or symbols', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);
    const inputs = screen.getAllByRole('textbox');

    await user.type(inputs[0], 'a');
    expect(inputs[0]).toHaveValue('');
  });

  it('should focus first empty field on container click', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);
    const inputs = screen.getAllByRole('textbox');

    await user.type(inputs[0], '1');
    await user.type(inputs[1], '2');
    await user.type(inputs[2], '4');

    const container = inputs[0].closest('div')!.parentElement!;
    await user.click(container);

    expect(document.activeElement).toBe(inputs[3]);
  });
});
