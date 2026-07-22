import { Option } from "@/types/onboarding";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { BasePayload } from "@onboardjs/core";
import { StepComponentProps, useOnboarding } from "@onboardjs/react";

export default function ChecklistStep({
  payload,
}: StepComponentProps<BasePayload>) {
  const { state, updateContext, } = useOnboarding();

  const selected = state?.context.flowData[payload.fieldId] ?? [];

  // check if box has been selected or not
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    const updatedList = [...selected];

    console.log("UpdateList:", updatedList);

    // check if current option has been selected
    if (checked && !updatedList.includes(value)) {
      // if list doesnt not include option then option is added
      updatedList.push(value);
      console.log("UpdateList Add Item:", updatedList);
    } else if (!checked) {
      // check ic current option has been switched off
      // , if true then removes from list
      const index = updatedList.indexOf(value);
      updatedList.splice(index, 1);
      console.log("UpdateList Remove Item:", updatedList);
    }

    updateContext({
      flowData: {
        [payload.fieldId]: updatedList,
      },
    });
  };

  // if there is a maxSelection, m
  const error = () => {
    console.log("Max Selection:", payload.maxSelection);
    console.log("Error:", selected.length > payload.maxSelection);

    return payload.maxSelection
      ? selected.length > payload.maxSelection
      : undefined;
  };

  return (
    <div>
      <h3>{payload.question}</h3>
      <FormControl
        error={error()}
        component="fieldset"
        required={payload.required}
      >
        <FormGroup>
          {payload.helperText ? (
            <FormLabel component="legend">{payload.helperText}</FormLabel>
          ) : null}
          {payload.options.map((option: Option) => (
            <FormControlLabel
              key={option.id}
              control={
                <Checkbox
                  checked={selected.includes(option.value)}
                  value={option.value as string}
                  onChange={handleChange}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
