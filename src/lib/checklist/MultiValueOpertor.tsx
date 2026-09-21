"use client";
import Box from "@mui/material/Box";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { GridFilterInputValueProps, useGridRootProps } from "@mui/x-data-grid";
import React, { useEffect, useEffectEvent, useState } from "react";

export default function InputNumberInterval(props: GridFilterInputValueProps) {
  const rootProps = useGridRootProps();
  const { item, applyValue, focusElementRef = null } = props;

  const filterTimeout = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const [filterValueState, setFilterValueState] = React.useState<
    [string, string]
  >(item.value ?? ["", ""]);
  const [applying, setIsApplying] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(filterTimeout.current);
    };
  }, []);

  useEffectEvent(() => {
    const itemValue = item.value ?? [undefined, undefined];
    setFilterValueState(itemValue);
  });

  const updateFilterValue = (lowerBound: string, upperBound: string) => {
    clearTimeout(filterTimeout.current);
    setFilterValueState([lowerBound, upperBound]);

    setIsApplying(true);
    filterTimeout.current = setTimeout(() => {
      setIsApplying(false);
      applyValue({ ...item, value: [lowerBound, upperBound] });
    }, rootProps.filterDebounceMs);
  };
  console.log("Applying value:", applying);

  const handleUpperFilterChange: TextFieldProps["onChange"] = (event) => {
    const newUpperBound = event.target.value;
    updateFilterValue(filterValueState[0], newUpperBound);
  };
  const handleLowerFilterChange: TextFieldProps["onChange"] = (event) => {
    const newLowerBound = event.target.value;
    updateFilterValue(newLowerBound, filterValueState[1]);
  };
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "end",
        height: 48,
        pl: "20px",
      }}
    >
      <TextField
        name="lower-bound-input"
        placeholder="From"
        label="From"
        variant="standard"
        value={Number(filterValueState[0])}
        onChange={handleLowerFilterChange}
        type="number"
        inputRef={focusElementRef}
        sx={{ mr: 2 }}
      />
      <TextField
        name="upper-bound-input"
        placeholder="To"
        label="To"
        variant="standard"
        value={Number(filterValueState[1])}
        onChange={handleUpperFilterChange}
        type="number"
      />
    </Box>
  );
}
