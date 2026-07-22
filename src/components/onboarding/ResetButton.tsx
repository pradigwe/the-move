"use client";

import { Button } from "@mui/material";
import { useOnboarding } from "@onboardjs/react";

export function ResetButton() {
  const { reset } = useOnboarding();
  return <Button onClick={() => reset()}>Reset Onboarding</Button>;
}

// DO NOT COMMIT FILE
