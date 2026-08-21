"use client";

import MoveGoalCard from "@/components/savings/MoveGoalCard";
import MoveProgressCard from "@/components/shared/MoveProgressCard";

export default function Savings() {
  return (
    <div>
      <h2>Savings</h2>
      <div className="pt-12">
        <MoveProgressCard type="savings" />
        <MoveGoalCard />
      </div>
      <div>
        

      </div>
    </div>
  );
}
