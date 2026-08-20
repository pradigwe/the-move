import {
  ChecklistItem,
  ChecklistItemCategories,
  MoveSection,
  MoveTask,
  User,
} from "@/types/move";
import { quotes, sections, tasks } from "./moveSection";
import { householdItems } from "./householdItems";
import { generateUniqueID } from "@/providers/MoveDataProvider";

export const defaultUser: User = {
  savings: {
    savingsGoal: 0,
    currentSaved: 0,
    remainingGoal: 0,
    progress: 0,
  },
  movePlan: {
    moveDate: "01/01/2000",
    sections: [],
  },
  checklist: [],
  activityGoal: [],
  moveGoal: {
    totalGoal: 0,
    breakdown: {
      rentBuffer: 0,
      movingCosts: 0,
      furnitureTotal: 0,
    },
  },
};

export const defaultPlan: MoveSection[] = sections.map((section) => ({
  id: generateUniqueID(),
  title: section.title,
  timeframe: section.timeframe,
  tasks: tasks
    .find((task) => task.timeframe === section.timeframe)
    ?.tasks.map((task) => ({
      id: generateUniqueID(),
      title: task,
      completed: false,
    })) as MoveTask[],
  quotes:
    quotes.find((quote) => quote.timeframe === section.timeframe)?.quotes || [],
}));

export const defaultChecklist: ChecklistItem[] = householdItems
  .map((category) =>
    category.items.map((item) => ({
      name: item.name,
      category: category.category as ChecklistItemCategories,
      importance: item.importance as 1 | 2 | 3 | 0,
      estimatedPrice: undefined,
      purchased: false,
      notes: "",
    })),
  )
  .flat()
  .map((item) => ({
    id: generateUniqueID(),
    ...item,
  }));
