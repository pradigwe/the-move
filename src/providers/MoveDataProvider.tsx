"use client";
import {
  defaultChecklist,
  defaultPlan,
  defaultUser,
} from "@/data/defaultOnboarding";
import { createMoveGoal } from "@/lib/moveGoal/calculations";
import {
  ChecklistItem,
  ChecklistItemCategories,
  MoveDataTypes,
  User,
} from "@/types/move";
import { MoveOnboardingContext } from "@/types/onboarding";
import { useOnboarding } from "@onboardjs/react";
import { createContext, useEffect, useState } from "react";

export const MoveDataContext = createContext<MoveDataTypes | undefined>(
  undefined,
);

export function generateUniqueID() {
  return crypto.randomUUID();
}

export default function MoveDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Future: hide other nav items or block user from accessing them
  const { state } = useOnboarding();

  const [user, setUser] = useState<User>(() => {
    // checks if local storage already has a user key saved
    if (typeof window === "undefined") return defaultUser;

    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : defaultUser;
  });

  // updates local storage every time there is a change in user
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    console.log("Local Storage Updated!");
  }, [user]);

  const onboardUser = () => {
    try {
      console.log("Onboarding!");
      const session = createMoveGoal(
        state?.context.flowData as MoveOnboardingContext["flowData"],
      );
      const sessionChecklist = createChecklist() ?? defaultChecklist;

      // set move goal data to moveGoal property
      setUser({
        ...user,
        moveGoal: session,
        movePlan: defaultPlan,
        checklist: sessionChecklist,
      });
      setSavingsGoal("total", session.totalGoal);
      updateSavingsProgress();
    } catch (error) {
      console.log("ONBOARDING ERROR:", error);
    }
  };

  const deleteUser = () => {
    try {
      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
        return;
      }
      console.log(
        "WARNING: User cannot be deleted, because it does not exist.",
      );
    } catch (error) {
      console.log("DELETE USER ERROR:", error);
    }
  };

  const setSavingsGoal = (property: "total", amount: number) => {
    try {
      if (property === "total") {
        setUser((prev) => {
          return {
            ...prev,
            savings: {
              ...prev.savings,
              savingsGoal: amount,
            },
          };
        });
      } else {
      }
    } catch (error) {
      console.log("SET SAVINGS ERROR:", error);
    }
  };

  const updateSavingsProgress = () => {
    try {
      setUser((prev) => {
        const total = prev.savings.savingsGoal;
        const current = prev.savings.currentSaved;
        return {
          ...prev,
          savings: {
            ...prev.savings,
            remainingGoal: total - current,
            progress: Math.round((current / total) * 100),
          },
        };
      });
    } catch (error) {
      console.log("UPDATE SAVINGS ERROR:", error);
    }
  };

  const createChecklist = () => {
    try {
      const { currentFurniture } = state?.context
        .flowData as MoveOnboardingContext["flowData"];

      return defaultChecklist.map((item) => ({
        ...item,
        purchased: currentFurniture?.includes(item.name),
      })) as ChecklistItem[];
    } catch (error) {
      console.log("CREATE CHECKLIST ERROR:", error);
    }
  };

  const updateChecklist = (updatedItem: ChecklistItem) => {
    try {
      setUser((prev) => {
        return {
          ...prev,
          checklist: prev.checklist.map((item) =>
            item.id === updatedItem.id ? updatedItem : item,
          ),
        };
      });
    } catch (error) {
      console.log("UPDATE CHECKLIST ERROR:", error);
    }
  };

  const addChecklistItem = (
    name: string,
    category: ChecklistItemCategories,
    importance: 1 | 2 | 3 | 0,
    purchased: boolean,
    notes: string,
    price?: number,
  ) => {
    try {
      const item: ChecklistItem = {
        id: generateUniqueID(),
        name,
        category,
        importance,
        estimatedPrice: price ?? undefined,
        purchased,
        notes,
      };
      setUser((prev) => {
        return {
          ...prev,
          checklist: [...prev.checklist, item],
        };
      });
    } catch (error) {
      console.log("ADD CHECKLIST ITEM ERROR:", error);
    }
  };

  return (
    <MoveDataContext
      value={{
        user,
        onboardUser,
        deleteUser,
        setSavingsGoal,
        updateChecklist,
        addChecklistItem,
      }}
    >
      {children}
    </MoveDataContext>
  );
}
