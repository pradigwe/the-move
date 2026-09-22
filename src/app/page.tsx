"use client";

import EssentialsCard from "@/components/dashboard/EssentialsCard";
import NextStepsCard from "@/components/dashboard/NextStepsCard";
import SavingsGoalCard from "@/components/dashboard/SavingsGoalCard";
import MoveProgressCard from "@/components/shared/MoveProgressCard";
import useMoveData from "@/hooks/useMoveData";
import { useOnboarding } from "@onboardjs/react";

export default function Dashboard() {
  const { isCompleted } = useOnboarding();
  const { user } = useMoveData();

  return (
    <div className="flex flex-col flex-1">
      {/* If onboarding is not complete */}
      <div hidden={isCompleted} className="flex flex-col flex-1">
        <h3>You dont have an account, Start onboarding!</h3>
      </div>
      {/* If onboarding is complete then... */}
      <div hidden={!isCompleted}>
        <h2>Hi, {user.name}</h2>
        <div>
          <NextStepsCard />
          <MoveProgressCard type="move-in" />
        </div>
        <div>
          <SavingsGoalCard />
          <EssentialsCard />
        </div>
      </div>
    </div>
  );
}
