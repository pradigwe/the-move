export type OnboardingPayload = {
  name: string;
  moveDate: string;
  livingType: "first-apartment" | "roommates" | "solo";

  rentCost: number;
  rentType?: "share" | "total";
  roommateCount?: number;
  utilitiesIncluded: boolean;

  furnishedLevel: "full" | "partial" | "none";
  apartmentInclusions?: string[];

  bringingFurniture: boolean;
  currentFurniture?: string[];

  moveArea: "lower" | "average" | "higher";

  budgetPreferences?: string[];

  moveDistance: "long-distance" | "local";
  movePriorities: string[];
};
