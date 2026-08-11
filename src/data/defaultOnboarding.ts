import {
  ChecklistItem,
  ChecklistItemCategories,
  MoveSection,
  MoveTask,
  User,
} from "@/types/move";
import { quotes, sections, tasks } from "./moveSection";
import { title } from "process";
import { furnitureList } from "./furnitureList";
import { householdItems } from "./householdItems";

export const defaultUser: User = {
  savings: {
    savingsGoal: 0,
    currentSaved: 0,
    remainingGoal: 0,
    progress: 0,
  },
  movePlan: [],
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
  id: section.id,
  title: section.title,
  timeframe: section.timeframe,
  tasks: tasks
    .find((task) => task.id === section.id)
    ?.tasks.map((task) => ({ title: task, completed: false })) as MoveTask[],
  quotes: quotes.find((quote) => quote.id === section.id)?.quotes || [],
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
  .map((item, index) => ({
    id: index + 1,
    ...item,
  }));
