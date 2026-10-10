import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Home from "./page";

it("links to every tool", () => {
  render(<Home />);
  for (const [name, href] of [
    ["BMI", "/bmi"],
    ["Calories", "/calories"],
    ["Body fat", "/body-fat"],
    ["Water", "/water"],
  ]) {
    expect(screen.getByRole("link", { name: new RegExp(name) })).toHaveAttribute("href", href);
  }
});
