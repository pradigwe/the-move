"use client";
import ChecklistCard from "@/components/checklist/ChecklistCard";
import SearchBar from "@/components/checklist/SearchBar";
import { TextField } from "@mui/material";
import { GridContextProvider } from "@mui/x-data-grid";
import {
  GridFilterModel,
  GridLogicOperator,
  useGridApiRef,
} from "@mui/x-data-grid";
import React from "react";

export default function Checklist() {
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
    logicOperator: GridLogicOperator.Or,
  });

  const debounce = 200;

  return (
    <div className="flex flex-col w-full p-10 gap-5">
      <SearchBar triggerSearchFilter={setFilterModel} />
      <h2>Checklist</h2>
      <ChecklistCard
        customFilter={filterModel}
        customSetFilter={setFilterModel}
        debounce={debounce}
      />
    </div>
  );
}
