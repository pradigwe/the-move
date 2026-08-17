import { apartmentInclusionsList } from "@/data/onboarding/furnitureList";
import { Theme } from "@emotion/react";
import {
  Box,
  Chip,
  FormControl,
  ListSubheader,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { BasePayload } from "@onboardjs/core";
import { StepComponentProps, useOnboarding } from "@onboardjs/react";
import { useState } from "react";

export default function MultiSelectStep({
  payload,
}: StepComponentProps<BasePayload>) {
  const { state, updateContext } = useOnboarding();

  // checks if apartmentInclusions have already been selected
  // , if not then defaults to defaultList
  const optionsList = payload.selectList ?? [];
  const selectedList =
    state?.context.flowData[payload.fieldId] ?? payload.defaultList ?? [];

  const handleSelect = (e: SelectChangeEvent<string[]>) => {
    const value =
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value;

    console.log("Selected:", value);

    updateContext({
      flowData: {
        ...state?.context.flowData,
        [payload.fieldId]: value,
      },
    });
  };

  const handleDelete = (value: string) => {
    const updatedList = selectedList.filter((item: string) => item !== value);
    updateContext({
      flowData: {
        ...state?.context.flowData,
        [payload.fieldId]: updatedList,
      },
    });
  };

  const getStyles = (item: string, selectedList: readonly string[]) => {
    return {
      fontWeight: selectedList.includes(item) ? 900 : 400,
    };
  };

  return (
    <div>
      <h3>{payload.question}</h3>
      <FormControl>
        <Select
          multiple
          value={selectedList}
          onChange={handleSelect}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: string) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleDelete(value)}
                  onMouseDown={
                    // prevents clicking chip opening the menu.
                    (e) => e.stopPropagation()
                  }
                />
              ))}
            </Box>
          )}
        >
          {
            // checks if lists are organized by a specific group/header
            payload.groupLists
              ? // returns if list is grouped
                payload.selectList.flatMap(
                  ({ header, items }: { header: string; items: string[] }) => [
                    <ListSubheader key={`header-${header}`}>
                      {header}
                    </ListSubheader>,
                    ...items.map((item) => (
                      <MenuItem
                        key={item}
                        value={item}
                        style={getStyles(item, selectedList)}
                      >
                        {item}
                      </MenuItem>
                    )),
                  ],
                )
              : // returns if list is ungrouped
                optionsList.map((item: string) => (
                  <MenuItem
                    key={item}
                    value={item}
                    style={getStyles(item, selectedList)}
                  >
                    {item}
                  </MenuItem>
                ))
          }
        </Select>
      </FormControl>
    </div>
  );
}

{
  /* <ListSubheader>Defaults</ListSubheader>
          {apartmentInclusionsList.defaultList.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, selectionList)}
            >
              {item}
            </MenuItem>
          ))}
          <ListSubheader>Optional</ListSubheader>
          {apartmentInclusionsList.optionalList.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, selectionList)}
            >
              {item}
            </MenuItem>
          ))} */
}
