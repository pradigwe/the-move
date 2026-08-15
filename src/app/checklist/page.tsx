"use client";
import AddItemButton from "@/components/checklist/AddItemButton";
import ChecklistCard from "@/components/checklist/ChecklistCard";
import SearchBar from "@/components/checklist/SearchBar";
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
      <div className="flex flex-row justify-stretch">
        <h2 className="flex-3/4">Checklist</h2>
        <AddItemButton />
      </div>
      <ChecklistCard
        customFilter={filterModel}
        customSetFilter={setFilterModel}
        debounce={debounce}
      />
    </div>
  );
}
