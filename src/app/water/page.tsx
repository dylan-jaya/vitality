import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { WaterCalculator } from "./water-calculator";

export const metadata: Metadata = { title: "Water intake calculator" };

export default function WaterPage() {
  return (
    <>
      <PageIntro title="Water intake" description="A rough daily target based on your weight and exercise." />
      <WaterCalculator />
    </>
  );
}
