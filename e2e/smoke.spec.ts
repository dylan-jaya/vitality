import { expect, test } from "@playwright/test";

const TOOLS = [
  { name: "BMI", heading: "BMI calculator" },
  { name: "Calories", heading: "Calorie calculator" },
  { name: "Body fat", heading: "Body fat calculator" },
  { name: "Water", heading: "Water intake" },
];

for (const tool of TOOLS) {
  test(`home → ${tool.name}`, async ({ page }) => {
    await page.goto("/");
    await page.getByRole("main").getByRole("link", { name: tool.name }).click();
    await expect(page.getByRole("heading", { level: 1, name: tool.heading })).toBeVisible();
  });
}

test("BMI end to end", async ({ page }) => {
  await page.goto("/bmi");
  await page.getByLabel("Height").fill("175");
  await page.getByLabel("Weight").fill("70");
  await expect(page.getByTestId("result-value")).toHaveText("22.9");
  await expect(page.getByText("Healthy weight", { exact: true })).toBeVisible();
});
