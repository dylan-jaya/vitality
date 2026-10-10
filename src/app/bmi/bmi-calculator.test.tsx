import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BmiCalculator } from "./bmi-calculator";

async function fill(height: string, weight: string) {
  const user = userEvent.setup();
  render(<BmiCalculator />);
  await user.type(screen.getByLabelText("Height"), height);
  await user.type(screen.getByLabelText("Weight"), weight);
  return user;
}

describe("BmiCalculator", () => {
  it("shows a hint until both fields are filled", async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);
    expect(screen.getByText(/enter your height and weight/i)).toBeInTheDocument();
    await user.type(screen.getByLabelText("Height"), "175");
    expect(screen.queryByTestId("result-value")).not.toBeInTheDocument();
  });

  it("computes BMI, category and healthy range", async () => {
    await fill("175", "70");
    expect(screen.getByTestId("result-value")).toHaveTextContent("22.9");
    expect(screen.getByText("Healthy weight")).toBeInTheDocument();
    expect(screen.getByText("56.7–76.6 kg")).toBeInTheDocument();
  });

  it("re-categorises a borderline BMI under Asia-Pacific cut-offs", async () => {
    const user = await fill("170", "69.4"); // BMI ≈ 24.0
    expect(screen.getByText("Healthy weight")).toBeInTheDocument();
    await user.click(screen.getByRole("radio", { name: "Asia-Pacific" }));
    expect(screen.getByRole("radio", { name: "Asia-Pacific" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText("Overweight")).toBeInTheDocument();
  });

  it("never renders NaN for out-of-range input", async () => {
    await fill("5", "70");
    expect(screen.queryByTestId("result-value")).not.toBeInTheDocument();
    expect(document.body).not.toHaveTextContent("NaN");
  });
});
