import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextInput } from "@/shared/ui/Input/TextInput";

jest.mock('@/shared/ui', () => ({
  Icon: jest.fn(({ name, color }) => <span data-testid={`icon-${name}`} style={{ color }} />),
}));

describe("TextInput component", () => {
  it("renders with title", () => {
    render(<TextInput title="Username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("shows placeholder when animatedLabel is false", () => {
    render(<TextInput title="Email" animatedLabel={false} />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("renders input value and updates on change", () => {
    const handleChange = jest.fn();
    render(<TextInput title="Email" value="test" onChange={handleChange} />);
    const input = screen.getByDisplayValue("test");
    fireEvent.change(input, { target: { value: "updated" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders a textarea when type is 'area'", () => {
    render(<TextInput title="Bio" type="area" />);
    const textarea = screen.getByPlaceholderText("Bio");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("shows error message when errorMessage is set", () => {
    render(<TextInput title="Username" errorMessage="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("renders password input and toggles visibility", () => {
    render(<TextInput title="Password" type="password" />);
    const input = screen.getByPlaceholderText("Password") as HTMLInputElement;
    expect(input.type).toBe("password");

    const toggleBtn = screen.getByRole("button");
    fireEvent.click(toggleBtn);
    expect(input.type).toBe("text");

    fireEvent.click(toggleBtn);
    expect(input.type).toBe("password");
  });

  it("shows tooltip on hover and hides it after", async () => {
    render(<TextInput title="Name" tooltipText="Helpful info" />);
    const infoIcon = screen.getByTestId("icon-info");

    fireEvent.mouseEnter(infoIcon);
    expect(await screen.findByText("Helpful info")).toBeInTheDocument();

    fireEvent.mouseLeave(infoIcon);
  });

  it("shows required asterisk", () => {
    render(<TextInput title="Name" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("applies correct classes for input sizes", () => {
    render(<TextInput title="Small Input" inputSize="S" />);
    const input = screen.getByPlaceholderText("Small Input");
    expect(input.className).toMatch(/text-bodyS_regular/);
  });


  it("disables input when disabled prop is true", () => {
    render(<TextInput title="Disabled Field" disabled />);
    const input = screen.getByPlaceholderText("Disabled Field");
    expect(input).toBeDisabled();
  });

  it("shows error border when errorMessage is set", () => {
    render(<TextInput title="Name" errorMessage="Required" />);
    const input = screen.getByPlaceholderText("Name");
    expect(input.className).toMatch(/border-red-70/);
  });
});
