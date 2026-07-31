import { OnboardingContext } from "@onboardjs/core";
import { EngineState } from "@onboardjs/core";

export interface MoveOnboardingContext extends OnboardingContext {
  version: string;
  flowData: {
    name: string | undefined;
    moveDate: string | undefined;
    livingType: "first-apartment" | "roommates" | "solo" | undefined;

    rentCost: number | undefined;
    rentType?: "share" | "total" | undefined;
    roommateCount?: number;
    utilitiesIncluded: boolean | undefined;

    furnishedLevel: "full" | "partial" | "none" | undefined;
    apartmentInclusions?: string[];

    bringingFurniture: boolean | undefined;
    currentFurniture?: string[];

    moveArea: "lower" | "average" | "higher" | undefined;

    budgetPreferences?: string[];

    moveDistance: "long-distance" | "local" | undefined;
    movePriorities: string[] | undefined;
  };
  appSettings: {
    theme: "light" | "dark";
  };
}
