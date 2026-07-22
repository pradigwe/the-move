"use client";

import { componentRegistry } from "@/lib/onboarding";
import { useOnboarding } from "@onboardjs/react";
import { Box, Button, Fade, Modal } from "@mui/material";
import { BasePayload } from "@onboardjs/core";
import { ResetButton } from "./ResetButton";

export default function OnboardingUI() {
  const { currentStep, state, previous, next, isCompleted } = useOnboarding();

  // checks if onboarding has already been completed
  if (state?.isCompleted) return <></>;

  // displays the component of the current step
  const Component =
    componentRegistry[
      currentStep?.payload?.componentKey ?? currentStep?.type ?? currentStep?.id
    ];

  if (!Component) return <p>Unknown Step</p>;

  // checks if current step has a valid value
  const isCurrentStepValid = () => {
    if (!currentStep?.payload?.required) return true;

    const value = state?.context.flowData[currentStep.payload.fieldId];

    /* checks if the current field has a value, if true then checks if it
    is a Checklist Step, and checks if it has maxSelection set
    if true then checks that the length of this list is 
    less than max selection */
    if (
      value !== undefined &&
      currentStep.payload.componentKey === "ChecklistStep" &&
      currentStep.payload.maxSelection !== undefined
    ) {
      console.log("Current Step Completion:", currentStep.payload.maxSelection);
      return (
        value.length >= 1 && value.length < currentStep.payload.maxSelection + 1
      );
    }

    return value !== undefined && value !== null && String(value).trim() !== "";
  };

  return (
    <>
      <Modal
        open={isCompleted ? false : true}
        className="min-h-full min-w-full"
      >
        <Box className="absolute top-1/2 transform- left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full md:h-3/4 md:w-1/2  lg:w-5/6 lg:h-5/6 p-10-translate-0.5 flex flex-col gap-4 justify-around text-center md:outline-2 md:outline-(--color-background-nav) shadow-24 md:rounded-2xl bg-(--color-background-primary) text-(--color-text-primary) ">
          <div id="onboarding-branding">
            <ResetButton />
            <h1 className="text-5xl ">The Move</h1>
          </div>
          <div className="">
            <Component
              payload={currentStep?.payload}
              context={state?.context!}
              coreContext={state?.context!}
              onDataChange={() => {}}
            />

            <div>
              <Button
                onClick={() => previous()}
                hidden={
                  currentStep?.id === "welcome" ||
                  currentStep?.payload?.disableBackBtn
                }
                disabled={!state?.canGoPrevious}
              >
                Back
              </Button>

              <Button onClick={() => next()} disabled={!isCurrentStepValid()}>
                {currentStep?.payload?.btnText
                  ? currentStep?.payload?.btnText
                  : // otherwise next will be displayed
                    currentStep?.nextStep
                    ? // if current step is welcome then will display Call To Action Text
                      "Next"
                    : // if there is no nextStep assigned to the current step then it will display finish
                      "Finish"}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
