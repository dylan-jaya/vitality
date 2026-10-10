import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CalorieCalculator } from "./calorie-calculator";

async function fill() {
  const user = userEvent.setup();
  render(<CalorieCalculator />);
  await user.type(screen.getByLabelText("Age"), "30");
  await user.type(screen.getByLabelText("Height"), "175");
  await user.type(screen.getByLabelText("Weight"), "70");
  return user;
}

describe("CalorieCalculator", () => {
  it("shows maintenance, BMR and goal targets (male, moderate)", async () => {
    await fill();
    // BMR 1648.75 × 1.55 = 2555.6
    expect(screen.getByTestId("result-value")).toHaveTextContent("2,556");
    expect(screen.getByText("1,649 kcal")).toBeInTheDocument();
    expect(screen.getByText("2,056 kcal")).toBeInTheDocument();
    expect(screen.getByText("2,856 kcal")).toBeInTheDocument();
  });

  it("updates when sex and activity level change", async () => {
    const user = await fill();
    await user.click(screen.getByRole("radio", { name: "Female" }));
    await user.selectOptions(screen.getByLabelText("Activity level"), "sedentary");
    // (1648.75 − 166) × 1.2 = 1779.3
    expect(screen.getByTestId("result-value")).toHaveTextContent("1,779");
  });

  it("shows a hint when age is out of range", async () => {
    const user = userEvent.setup();
    render(<CalorieCalculator />);
    await user.type(screen.getByLabelText("Age"), "5");
    await user.type(screen.getByLabelText("Height"), "175");
    await user.type(screen.getByLabelText("Weight"), "70");
    expect(screen.queryByTestId("result-value")).not.toBeInTheDocument();
    expect(screen.getByText(/age 15–100/)).toBeInTheDocument();
  });
});
