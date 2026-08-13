"use client";

import { TextField } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";

type SearchBarProps = {
  triggerSearchFilter: Dispatch<SetStateAction<GridFilterModel>>;
};

export default function SearchBar({ triggerSearchFilter }: SearchBarProps) {
  return (
    <TextField
      onChange={(searchValue) => {
        triggerSearchFilter((prev) => ({
          ...prev,
          items: [{ field: "name", value: searchValue.target.value, operator: "contains" }],
        }));
      }}
    />
  );
}
