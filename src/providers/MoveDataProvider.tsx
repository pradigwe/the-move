"use client";
import {
  defaultChecklist,
  defaultPlan,
  defaultUser,
} from "@/data/onboarding/defaultOnboarding";
import { createMoveGoal } from "@/lib/moveGoal/calculations";
import {
  ChecklistItem,
  ChecklistItemCategories,
  MoveDataTypes,
  MoveTask,
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
      const { moveDate } = state?.context
        .flowData as MoveOnboardingContext["flowData"];
      const session = createMoveGoal(
        state?.context.flowData as MoveOnboardingContext["flowData"],
      );
      const sessionChecklist = createChecklist() ?? defaultChecklist;

      // set move goal data to moveGoal property
      setUser({
        ...user,
        moveGoal: session,
        movePlan: {
          moveDate: state?.context.flowData.moveDate,
          sections: defaultPlan,
        },
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

  const deleteChecklistItem = (id: string) => {
    try {
      setUser((prev) => {
        return {
          ...prev,
          checklist: prev.checklist.filter((item) => item.id !== id),
        };
      });
    } catch (error) {
      console.log("DELETE CHECKLIST ITEM ERROR:", error);
    }
  };

  const getDaysToMove = () => {
    try {
      // debating between getting count of days vs 1 day 1 month
      const futureDate = new Date(user.movePlan.moveDate);
      const currentDate = new Date();

      if (!futureDate || !currentDate) {
        return 0;
      }

      const millisecondDiff = futureDate.getTime() - currentDate.getTime();
      const days = Math.round(millisecondDiff / (24 * 60 * 60 * 1000));
      return days;
    } catch (error) {
      console.log("GET DAYS TO MOVE IN ERROR:", error);
      return 0;
    }
  };

  const updateMoveTask = (
    sectionId: string,
    taskId: string,
    newTask: MoveTask,
  ) => {
    try {
      console.log("Updating task:", taskId);
      setUser((prev) => {
        return {
          ...prev,
          movePlan: {
            ...prev.movePlan,
            sections: prev.movePlan.sections.map((section) =>
              section.id === sectionId
                ? {
                    ...section,
                    tasks: section.tasks.map((task) =>
                      task.id === taskId ? newTask : task,
                    ),
                  }
                : section,
            ),
          },
        };
      });
    } catch (error) {
      console.log("UPDATE MOVE TASK ERROR:", error);
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
        deleteChecklistItem,
        getDaysToMove,
        updateMoveTask,
      }}
    >
      {children}
    </MoveDataContext>
  );
}

/*const updateMoveTask = (
    sectionId: string,
    taskId: string,
    newTask: MoveTask,
  ) => {
    try {
      const newSection: MoveSection = user.movePlan.sections.find((section) => section.id === sectionId)!
      setUser((prev) => {
        return {
          ...prev,
          movePlan: {
            ...prev.movePlan,
            sections: prev.movePlan.sections.map((section) =>
              section.id === sectionId
                ? section.tasks.map((task) =>
                    
                  )
                : section,
            ),
          },
        };
      });
    } catch (error) {
      console.log("UPDATE MOVE TASK ERROR:", error);
    }
  };*/
