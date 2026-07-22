export type MoveDataTypes = {
  checklist: ChecklistItem[];
  movePlan: MoveSection[];
  activityFeed: ActivityItem[];
  moveGoal: MoveGoal;
};

export type ChecklistItem = {
  id: string;
  name: string;

  category: "furniture" | "kitchen" | "bathroom" | "cleaning" | "utilities";
  importance: "low" | "medium" | "high";

  estimatedPrice: number;
  purchased: boolean;
};

export type MoveSection = {
  id: string;
  title: string;
  timeframe: string;
  tasks: MoveTask[];
};

export type MoveTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type MoveGoal = {
  totalGoal: number;
  currentSaved: number;
  breakdown: {
    rentBuffer: number;
    movingCosts: number;
    furniture: number;
    essentials: number;
  };
};

export type ActivityItem = {
  id: string;
  type: "purchase" | "goal" | "checklist";
  message: string;
  date: string;
};
