import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { WaterCalculator } from "./water-calculator";

describe("WaterCalculator", () => {
  it("shows litres and glasses", async () => {
    const user = userEvent.setup();
    render(<WaterCalculator />);
    await user.type(screen.getByLabelText("Weight"), "70");
    expect(screen.getByTestId("result-value")).toHaveTextContent("2.3");
    expect(screen.getByText("9 glasses")).toBeInTheDocument();

    const exercise = screen.getByLabelText("Exercise per day");
    await user.clear(exercise);
    await user.type(exercise, "60");
    expect(screen.getByTestId("result-value")).toHaveTextContent("3.0");
  });
});
