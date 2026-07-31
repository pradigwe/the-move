"use client";

import useMoveData from "@/hooks/useMoveData";
import { Button } from "@mui/material";
import { useOnboarding } from "@onboardjs/react";

export function ResetButton() {
  const { reset } = useOnboarding();
  const { deleteUser } = useMoveData();
  return (
    <Button
      onClick={() => {
        reset();
        deleteUser();
      }}
    >
      Reset Onboarding
    </Button>
  );
}

// DO NOT COMMIT FILE
