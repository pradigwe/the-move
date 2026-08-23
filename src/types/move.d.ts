export type MoveDataTypes = {
  user: User;
  onboardUser: () => void;
  deleteUser: () => void;
  setSavingsGoal: (property: "total", amount: number) => void;
  updateSavingsProgress: (amount?: number) => void;
  updateChecklist: (updatedItem: ChecklistItem) => void;
  addChecklistItem: (
    name: string,
    category: ChecklistItemCategories,
    importance: 1 | 2 | 3 | 0,
    purchased: boolean,
    notes: string,
    price?: number,
  ) => void;
  deleteChecklistItem: (id: string) => void;
  updateMoveDate: (updateDate: string) => void;
  getDaysToMove: () => number;
  updateMoveTask: (
    sectionId: string,
    taskId: string,
    newTask: MoveTask,
  ) => void;
  addActivity: (
    type: "purchase" | "goal" | "checklist" | "savings",
    message: string,
    totalPrice?: number,
  ) => void;
};

// a.k.a furniture/item list
export type ChecklistItem = {
  id: string;
  name: string;

  category:
    | "furniture"
    | "kitchen"
    | "bathroom"
    | "cleaning"
    | "home_essentials"
    | "decor"
    | "miscellaneous";
  // 0 is undefined
  importance: 1 | 2 | 3 | 0;

  estimatedPrice: number | undefined;
  purchased: boolean;
  notes: string;
};

export type ChecklistItemCategories =
  | "furniture"
  | "kitchen"
  | "bathroom"
  | "cleaning"
  | "home_essentials"
  | "decor"
  | "miscellaneous";

export type MoveSection = {
  id: string;
  title: string;
  // timeframe is taken in days
  timeframe: number;
  tasks: MoveTask[];
  quotes: string[];
};

export type MoveTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type MoveGoal = {
  totalGoal: number;
  breakdown: {
    rentBuffer: number;
    movingCosts: number;
    furnitureTotal: number;
  };
};

export type ActivityItem = {
  id: string;
  type: "purchase" | "goal" | "checklist" | "savings";
  message: string;
  date: string;
  totalPrice: number | null;
};

export type User = {
  savings: {
    savingsGoal: number;
    currentSaved: number;
    remainingGoal: number;
    progress: number;
  };
  movePlan: {
    moveDate: string;
    sections: MoveSection[];
  };
  checklist: ChecklistItem[];
  activityGoal: ActivityItem[];
  moveGoal: MoveGoal;
};
