"use client";
import {
  ActivityItem,
  ChecklistItem,
  MoveDataTypes,
  MoveGoal,
  MoveSection,
} from "@/types/move";
import { createContext, useState } from "react";

export const MoveDataContext = createContext<MoveDataTypes | undefined>(
  undefined,
);

export default function MoveDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // defining onboarding, server checks if set to null, if true then instead of default
  // dashboard, prompt user to enter onboarding
  // Future: hide other nav items or block user from accessing them
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    [] as ChecklistItem[],
  );
  const [movePlan, setMovePlan] = useState<MoveSection[]>([] as MoveSection[]);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>(
    [] as ActivityItem[],
  );
  const [moveGoal, setMoveGoal] = useState<MoveGoal>({
    totalGoal: 0,
    currentSaved: 0,
    breakdown: {
      rentBuffer: 0,
      movingCosts: 0,
      furniture: 0,
      essentials: 0,
    },
  } as MoveGoal);

  const onboardUser = () => {};

  return (
    <MoveDataContext value={{ checklist, movePlan, activityFeed, moveGoal }}>
      {children}
    </MoveDataContext>
  );
}
