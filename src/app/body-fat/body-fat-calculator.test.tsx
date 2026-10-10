import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BodyFatCalculator } from "./body-fat-calculator";

describe("BodyFatCalculator", () => {
  it("estimates male body fat", async () => {
    const user = userEvent.setup();
    render(<BodyFatCalculator />);
    expect(screen.queryByLabelText("Hip")).not.toBeInTheDocument();
    await user.type(screen.getByLabelText("Height"), "180");
    await user.type(screen.getByLabelText("Neck"), "38");
    await user.type(screen.getByLabelText("Waist"), "85");
    expect(screen.getByTestId("result-value")).toHaveTextContent("16.1");
    expect(screen.getByText("Fitness")).toBeInTheDocument();
  });

  it("requires a hip measurement for females", async () => {
    const user = userEvent.setup();
    render(<BodyFatCalculator />);
    await user.click(screen.getByRole("radio", { name: "Female" }));
    await user.type(screen.getByLabelText("Height"), "165");
    await user.type(screen.getByLabelText("Neck"), "34");
    await user.type(screen.getByLabelText("Waist"), "75");
    expect(screen.queryByTestId("result-value")).not.toBeInTheDocument();
    await user.type(screen.getByLabelText("Hip"), "100");
    expect(screen.getByTestId("result-value")).toHaveTextContent("28.9");
  });

  it("flags implausible measurements instead of showing a number", async () => {
    const user = userEvent.setup();
    render(<BodyFatCalculator />);
    await user.type(screen.getByLabelText("Height"), "180");
    await user.type(screen.getByLabelText("Neck"), "60");
    await user.type(screen.getByLabelText("Waist"), "50");
    expect(screen.queryByTestId("result-value")).not.toBeInTheDocument();
    expect(screen.getByText(/double-check/)).toBeInTheDocument();
  });
});
