import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { BmiCalculator } from "./bmi-calculator";

export const metadata: Metadata = { title: "BMI calculator" };

export default function BmiPage() {
  return (
    <>
      <PageIntro title="BMI calculator" description="Body Mass Index compares your weight to your height." />
      <BmiCalculator />
    </>
  );
}
