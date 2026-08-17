"use client";

import { furnitureList } from "@/data/onboarding/furnitureList";
import { MoveGoal } from "@/types/move";
import { MoveOnboardingContext } from "@/types/onboarding";

export const createMoveGoal = (
  flowData: MoveOnboardingContext["flowData"],
): MoveGoal => {
  // true ? calculate with rent type & roomatecount : calculate solo
  const rentBuffer = calculateRentBuffer(flowData) || 0;
  const movingCosts = calculateMovingCosts(flowData) || 0;
  const furnitureTotal = furnitureCosts(flowData);

  const totalGoal = rentBuffer + movingCosts + furnitureTotal;

  return {
    totalGoal,
    breakdown: {
      rentBuffer,
      movingCosts,
      furnitureTotal,
    },
  };
};

const calculateRentBuffer = (flowData: MoveOnboardingContext["flowData"]) => {
  const { rentCost, utilitiesIncluded, livingType, rentType, roommateCount } =
    flowData || {};

  if (rentCost === undefined) {
    console.log("ERROR: rentCost not defined");
    return 0;
  }

  const utilities = utilitiesIncluded ? 0 : 250;
  let rentTotal = 0;
  if (livingType === "solo" || livingType === "first-apartment") {
    // user is living by themselves
    rentTotal = rentCost + utilities;
  } else {
    // user is living with roommates
    if (rentType === "share") {
      rentTotal = rentCost + utilities;
    } else {
      if (roommateCount === undefined) {
        console.log("ERROR: roommateCount not defined");
        return;
      }
      // user needs to calculate their own share of rent
      rentTotal = rentCost / (roommateCount + 1);
      rentTotal += utilities;
    }
  }
  // save 3x the amount of rent for emergencies
  return rentTotal * 3;
};

const calculateMovingCosts = (flowData: MoveOnboardingContext["flowData"]) => {
  const { moveArea, moveDistance } = flowData;

  if (moveDistance === "long-distance") {
    // lower = 750, average = 700, higher = 800
    return moveArea === "lower" ? 750 : moveArea === "average" ? 700 : 800;
  } else if (moveDistance === "local") {
    // lower = 175, average = 150, higher = 200
    return moveArea === "lower" ? 175 : moveArea === "average" ? 150 : 200;
  } else {
    console.log("ERROR: moveDistance is not defined");
    return;
  }
};

const furnitureCosts = (flowData: MoveOnboardingContext["flowData"]) => {
  const { currentFurniture } = flowData;
  if (currentFurniture === undefined) {
    return 0;
  }
  // total count of furniture still needed
  const totalFurniture =
    furnitureList.bathroom.length +
    furnitureList.cleaning.length +
    furnitureList.decor.length +
    furnitureList.furniture.length +
    furnitureList.home_essentials.length +
    furnitureList.kitchen.length;
  const furniture = currentFurniture.length;

  // for general calculation each item is multiplied by $50
  return (totalFurniture - furniture) * 50;
};
