"use client";
import OnboardingUI from "@/components/onboarding/OnboardingUI";
import useMoveData from "@/hooks/useMoveData";
import { useOnboarding } from "@onboardjs/react";

export default function Dashboard() {

  const { isCompleted } = useOnboarding();

  return (
    <div className="flex flex-col flex-1">
      <h2>Dashboard</h2>
      {/* If onboarding is not complete */}
      <div hidden={isCompleted} className="flex flex-col flex-1">
        <h3>You dont have an account, Start onboarding!</h3>
      </div>
      {/* If onboarding is complete then... */}
      <div hidden={!isCompleted}></div>
    </div>
  );
}
