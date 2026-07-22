"use client";

import { Button } from "@mui/material";
import { BasePayload, OnboardingContext } from "@onboardjs/core";
import { StepComponentProps, useOnboarding } from "@onboardjs/react";

export default function WelcomeStep({
  payload,
}: StepComponentProps<BasePayload>) {
  return (
    <div>
      <h2>Welcome!</h2>
      <h3>Let's build your move plan</h3>
    </div>
  );
}
