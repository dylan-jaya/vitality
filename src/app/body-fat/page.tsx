import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { BodyFatCalculator } from "./body-fat-calculator";

export const metadata: Metadata = { title: "Body fat calculator" };

export default function BodyFatPage() {
  return (
    <>
      <PageIntro
        title="Body fat calculator"
        description="Estimate body fat percentage with the U.S. Navy tape-measure method."
      />
      <BodyFatCalculator />
    </>
  );
}
