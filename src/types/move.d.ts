export type MoveDataTypes = {
  user: User;
  onboardUser: () => void;
  deleteUser: () => void;
  setSavingsGoal: (property: "total", amount: number) => void;
};

// a.k.a furniture/item list
export type ChecklistItem = {
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
  id: number;
  title: string;
  // timeframe is taken in days
  timeframe: number;
  tasks: MoveTask[];
  quotes: string[];
};

export type MoveTask = {
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
  type: "purchase" | "goal" | "checklist";
  message: string;
  date: string;
};

export type User = {
  savings: {
    savingsGoal: number;
    currentSaved: number;
    remainingGoal: number;
    progress: number;
  };
  movePlan: MoveSection[];
  checklist: ChecklistItem[];
  activityGoal: ActivityItem[];
  moveGoal: MoveGoal;
};
