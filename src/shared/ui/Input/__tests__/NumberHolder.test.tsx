import React from "react";
import { render, screen } from "@testing-library/react";
import { NumberHolder } from "@/shared/ui/Input/NumberHolder";

describe("NumberHolder", () => {
  it("renders the number when passed as a prop", () => {
    render(<NumberHolder number={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders the number when passed as a string", () => {
    render(<NumberHolder number="007" />);
    expect(screen.getByText("007")).toBeInTheDocument();
  });

  it("renders default underscore when no number is passed", () => {
    render(<NumberHolder />);
    expect(screen.getByText("_")).toBeInTheDocument();
  });
});
