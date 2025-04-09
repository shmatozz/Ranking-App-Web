import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "@/shared/ui/Button/IconButton";

jest.mock("@/shared/ui", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <div data-testid="icon">{name}-{size}</div>
  ),
  icons: {
    plus: {},
    trash: {},
    edit: {},
  }
}));

describe("IconButton", () => {
  it("renders with default props and icon", () => {
    render(<IconButton icon="plus" />);
    expect(screen.getByTestId("icon")).toHaveTextContent("plus-32");
  });

  it("renders small icon if size=S", () => {
    render(<IconButton icon="plus" size="S" />);
    expect(screen.getByTestId("icon")).toHaveTextContent("plus-24");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<IconButton icon="edit" onClick={handleClick} />);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("doesn't call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<IconButton icon="edit" onClick={handleClick} disabled />);
    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows spinner when isLoading is true", () => {
    render(<IconButton icon="edit" isLoading />);
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    expect(screen.getByRole("button").firstChild).toHaveClass("animate-spin");
  });
});
