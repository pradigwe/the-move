"use client";

import { Option } from "@/types/onboarding";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { BasePayload } from "@onboardjs/core";
import { StepComponentProps, useOnboarding } from "@onboardjs/react";

export default function SelectStep({
  payload,
}: StepComponentProps<BasePayload>) {
  const { state, updateContext } = useOnboarding();

  // finds the current value of the field
  const value = state?.context.flowData[payload.fieldId] ?? "";

  const handleSelection = (value: string) => {
    const selected = payload.options.find(
      (option: Option) => String(option.value) === value,
    );

    updateContext({
      flowData: {
        ...state?.context.flowData,
        [payload.fieldId]: selected.value,
      },
    });
  };

  // handles cases where user fills out a section,
  // but goes back to select a different option that has a different
  // setup route
  // this function resets that connecting field
  const resetConnectedField = () => {
    const connectedField = state?.context.flowData[payload.connectedField];
    const type = typeof connectedField;
    console.log("Connected Field Type", type);
  };

  return (
    <div>
      <h3>{payload.question}</h3>
      <FormControl>
        <RadioGroup
          value={value}
          onChange={(e) => handleSelection(e.target.value)}
          row={payload.isRow}
        >
          {payload.options.map(({ id, label, value }: Option) => {
            return (
              <FormControlLabel
                key={id}
                value={value}
                control={<Radio />}
                label={label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
