"use client";

import SavingsActivityFeed from "@/components/savings/ActivityFeed";
import AddSavingsButton from "@/components/savings/AddSavingsButton";
import MoveGoalCard from "@/components/savings/MoveGoalCard";
import RecentHistoryCard from "@/components/savings/RecentHistoryCard";
import MoveProgressCard from "@/components/shared/MoveProgressCard";

export default function Savings() {
  return (
    <div className="w-full">
      <h2>Savings</h2>
      <div className="flex w-full">
        <div className="flex-1/2 pt-12">
          <MoveProgressCard type="savings" />
          <MoveGoalCard />
        </div>
        <div className="flex-1/2">
          <AddSavingsButton />
          <SavingsActivityFeed />
          <RecentHistoryCard />
        </div>
      </div>
    </div>
  );
}
