"use client";

import ChecklistStep from "@/components/onboarding/steps/Checklist";
import GoalStep from "@/components/onboarding/steps/Goal";
import InputStep from "@/components/onboarding/steps/Input";
import MultiSelectStep from "@/components/onboarding/steps/MultiSelect";
import SelectStep from "@/components/onboarding/steps/Select";
import WelcomeStep from "@/components/onboarding/steps/Welcome";
import { furnitureList } from "@/data/furnitureList";
import { OnboardingStep, StepComponentProps } from "@onboardjs/react";
import { ComponentType } from "react";

type OnboardingComponent = ComponentType<StepComponentProps<any>>;

// Record allows for X to have a set of properties of OnboardingComponent type
export const componentRegistry: Record<string, OnboardingComponent> = {
  WelcomeStep,
  InputStep,
  SelectStep,
  MultiSelectStep,
  ChecklistStep,
  GoalStep,
};

export const steps: OnboardingStep[] = [
  {
    id: "welcome",
    type: "CUSTOM_COMPONENT",
    payload: {
      componentKey: "WelcomeStep",
      btnText: "Get Started",
    },
    nextStep: "name",
  },
  {
    id: "name",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "name",
      autoCompleteType: "given-name",
      required: true,
      componentKey: "InputStep",
      type: "text",
      title: "What is your first name?",
      textFieldLabel: "Name",
    },
    nextStep: "moveDate",
  },
  {
    id: "moveDate",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "moveDate",
      required: true,
      componentKey: "InputStep",
      type: "date",
      title: "What is your move in date?",
      textFieldLabel: "Date",
    },
    nextStep: "livingType",
  },
  {
    id: "livingType",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "livingType",
      required: true,
      componentKey: "SelectStep",
      question: "What best describes your move?",
      options: [
        {
          id: "first-apartment",
          label: "First Apartment",
          value: "first-apartment",
        },
        {
          id: "roommates",
          label: "Roommates",
          value: "roommates",
        },
        { id: "solo", label: "Solo", value: "solo" },
      ],
    },
    nextStep: "rentCost",
  },
  {
    id: "rentCost",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "rentCost",
      required: true,
      componentKey: "InputStep",
      type: "number",
      title: "What is your monthly rent?",
      textFieldLabel: "Rent",
      placeholderValue: 1200,
      stepValue: 100,
    },
    nextStep: (context) => {
      if (context.flowData.livingType === "roommates") return "rentType";
      return "utilitiesIncluded";
    },
  },
  {
    id: "rentType",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "rentType",
      required: true,
      componentKey: "SelectStep",
      isRow: true,
      question: "Is this your share of the rent or total apartment rent?",
      options: [
        { id: "share", label: "Share", value: "share" },
        { id: "total", label: "Total", value: "total" },
      ],
    },
    nextStep: (context) => {
      if (context.flowData.rentType === "total") return "roommateCount";
      return "utilitiesIncluded";
    },
  },
  {
    id: "roommateCount",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "roommateCount",
      required: true,
      componentKey: "InputStep",
      type: "number",
      numberFieldType: "slider",
      title: "How many roommates do you have?",
      defaultValue: 1,
      minValue: 1,
      maxValue: 7,
      hasMarks: true,
    },
    nextStep: "utilitiesIncluded",
  },
  {
    id: "utilitiesIncluded",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "utilitiesIncluded",
      required: true,
      componentKey: "SelectStep",
      isRow: true,
      question: "Are utilities included in your rent?",
      options: [
        { id: "yes", label: "Yes", value: true },
        { id: "no", label: "No", value: false },
      ],
    },
    nextStep: "furnishedLevel",
  },
  {
    id: "furnishedLevel",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "furnishedLevel",
      required: true,
      componentKey: "SelectStep",
      isRow: true,
      question: "What best describes your new place?",
      options: [
        { id: "furnished", label: "Furnished", value: "full" },
        {
          id: "partially-furnished",
          label: "Partially Furnished",
          value: "partial",
        },
        { id: "unfurnished", label: "Unfurnished", value: "none" },
      ],
    },
    nextStep: "bringingFurniture",
  },
  {
    id: "bringingFurniture",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "bringingFurniture",
      required: true,
      componentKey: "SelectStep",
      isRow: true,
      question: "Do you already own the furniture and items you're bringing?",
      options: [
        { id: "bringFurniture", label: "Yes", value: true },
        { id: "notBringFurniture", label: "No", value: false },
      ],
    },
    nextStep: (context) => {
      if (!context.flowData.bringingFurniture as boolean)
        return "currentFurniture";
      return "moveArea";
    },
  },
  {
    id: "currentFurniture",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "currentFurniture",
      required: false,
      componentKey: "MultiSelectStep",
      question: "Select what you're bringing with you",
      groupLists: true,
      selectList: [
        {
          header: "Furniture",
          items: furnitureList.furniture,
        },
        {
          header: "Kitchen",
          items: furnitureList.kitchen,
        },
        {
          header: "Bathroom",
          items: furnitureList.bathroom,
        },
        {
          header: "Cleaning",
          items: furnitureList.cleaning,
        },
        {
          header: "Home Essentials",
          items: furnitureList.home_essentials,
        },
        {
          header: "Decor",
          items: furnitureList.decor,
        },
      ],
    },
    nextStep: "moveArea",
  },
  {
    id: "moveArea",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "moveArea",
      componentKey: "SelectStep",
      required: true,
      isRow: true,
      question: "How would you describe the cost of the area you're moving to?",
      options: [
        { id: "lower", label: "Lower cost", value: "lower" },
        { id: "average", label: "Average cost", value: "average" },
        { id: "higher", label: "Higher cost", value: "higher" },
      ],
    },
    nextStep: "budgetPreferences",
  },
  {
    id: "budgetPreferences",
    type: "CUSTOM_COMPONENT",
    payload: {
      fieldId: "budgetPreferences",
      componentKey: "ChecklistStep",
      question: "Which of the following apply to you?",
      options: [
        {
          id: "shoppingSecondhand",
          label: "I plan to shop secondhand.",
          value: "shoppingSecondhand",
        },
        {
          id: "needMajorFurniture",
          label: "I need to buy major furniture.",
          value: "needMajorFurniture",
        },
      ],
    },
    nextStep: "moveDistance",
  },
  {
    id: "moveDistance",
    payload: {
      fieldId: "moveDistance",
      componentKey: "SelectStep",
      required: true,
      isRow: true,
      question: "Are you moving locally or long-distance?",
      options: [
        { id: "local", label: "Local", value: "local" },
        { id: "long-distance", label: "Long-Distance", value: "long-distance" },
      ],
    },
    nextStep: "movePriorities",
  },
  {
    id: "movePriorities",
    payload: {
      fieldId: "movePriorities",
      componentKey: "ChecklistStep",
      required: "true",
      btnText: "Done",
      question: "What are your top priorities for this move?",
      helperText: "Select up to 3.",
      maxSelection: 3,
      options: [
        { id: "budget", label: "Staying on budget", value: "budget" },
        {
          id: "organization",
          label: "Staying organized",
          value: "organization",
        },
        { id: "stress", label: "Reducing moving stress", value: "stress" },
        {
          id: "affordableFurnishing",
          label: "Furnishing affordably",
          value: "affordableFurnishing",
        },
        {
          id: "earlyPreparation",
          label: "Preparing early",
          value: "earlyPreparation",
        },
      ],
    },
    nextStep: "moveGoal",
  },
  {
    id: "moveGoal",
    payload: {
      fieldId: "moveGoal",
      disableBackBtn: true,
      componentKey: "GoalStep",
      ctaButtonText: "Let's Go!",
    },
  },
];
