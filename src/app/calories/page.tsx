import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { CalorieCalculator } from "./calorie-calculator";

export const metadata: Metadata = { title: "Calorie calculator" };

export default function CaloriesPage() {
  return (
    <>
      <PageIntro
        title="Calorie calculator"
        description="Estimate how much energy you burn each day, using the Mifflin–St Jeor equation."
      />
      <CalorieCalculator />
    </>
  );
}
