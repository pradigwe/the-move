"use client";
import { Slider, TextField } from "@mui/material";
import { BasePayload } from "@onboardjs/core";
import { StepComponentProps, useOnboarding } from "@onboardjs/react";

export default function InputStep({
  payload,
}: StepComponentProps<BasePayload>) {
  const { state, updateContext, next } = useOnboarding();

  // finds the current value of the field
  const value = state?.context.flowData[payload.fieldId] ?? "";

  // creates date input for requiring user to select future date
  const date = new Date().toISOString().split("T")[0];

  // handles context updates for string values
  const handleInput = (value: string) => {
    updateContext({
      flowData: { ...state?.context.flowData, [payload.fieldId]: value },
    });
  };

  const numberValue =
    state?.context.flowData[payload.fieldId] === undefined
      ? (payload.defaultValue ?? "")
      : Number(state?.context.flowData[payload.fieldId]);
  0;
  // handles context updates for number values
  const handleNumberInput = (value: number) => {
    updateContext({
      flowData: { ...state?.context.flowData, [payload.fieldId]: value },
    });
  };

  const handleSliderInput = (_: Event, newValue: number | number[]) => {
    if (typeof newValue != "number") return;

    updateContext({
      flowData: {
        ...state?.context.flowData,
        [payload.fieldId]: newValue,
      },
    });
  };

  return (
    <div>
      <h3>{payload.title}</h3>
      {
        // Returns input for specific type of input field

        // Returns request for date input
        payload.type === "date" ? (
          <TextField
            onChange={(e) => handleInput(e.target.value)}
            type="date"
            value={value}
            autoFocus
            slotProps={{
              htmlInput: {
                min: date,
              },
            }}
          />
        ) : // Returns request for number input
        payload.type === "number" ? (
          // Returns request for a slider input
          payload.numberFieldType === "slider" ? (
            <Slider
              onChange={handleSliderInput}
              value={numberValue}
              defaultValue={payload.defaultValue ?? 1}
              valueLabelDisplay="auto"
              step={payload.stepValue ?? 1}
              marks={payload.hasMarks ?? false}
              min={payload.minValue ?? 0}
              max={payload.maxValue ?? 25}
            />
          ) : (
            // Returns request for a regular number input
            <TextField
              onChange={(e) => {
                const value = e.target.value;
                // turns string input into number
                handleNumberInput(value === "" ? 0 : Number(value));
              }}
              type="number"
              value={numberValue}
              placeholder={payload.placeholderValue ?? 0}
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: payload.minValue ?? 0,
                  max: payload.maxValue ?? 100000,
                  step: payload.stepValue ?? 1,
                },
              }}
              autoComplete="off"
            />
          )
        ) : (
          // Returns request for text input
          <TextField
            placeholder={payload.textFieldLabel}
            onChange={(e) => handleInput(e.target.value)}
            value={value}
            required={payload.required || true}
            onKeyDown={(e) => {
              if (value && e.key.toLowerCase() === "enter") {
                next();
              }
            }}
            autoComplete={payload.autoCompleteType ?? false}
            autoFocus
          />
        )
      }
    </div>
  );
}
