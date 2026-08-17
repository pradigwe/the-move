"use client";
import AddItemButton from "@/components/checklist/AddItemButton";
import ChecklistCard from "@/components/checklist/ChecklistCard";
import DeleteButton from "@/components/checklist/DeleteButton";
import FilterButton from "@/components/checklist/FilterButton";
import SearchBar from "@/components/checklist/SearchBar";
import {
  GridFilterModel,
  GridLogicOperator,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import React from "react";

export default function Checklist() {
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
    logicOperator: GridLogicOperator.Or,
  });
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>({
      type: "include",
      ids: new Set(),
    });
  const debounce = 200;

  return (
    <div className="flex flex-col w-full p-10 gap-5">
      <SearchBar triggerSearchFilter={setFilterModel} />
      <div className="flex flex-row justify-stretch">
        <h2 className="flex-5/8">Checklist</h2>
        <div className="flex flex-row gap-4">
          <FilterButton triggerSearchFilter={setFilterModel} />
          <AddItemButton />
          <DeleteButton selectedRows={rowSelectionModel} />
        </div>
      </div>
      <ChecklistCard
        customFilter={filterModel}
        customSetFilter={setFilterModel}
        customRowSelection={rowSelectionModel}
        customSetRowSelection={setRowSelectionModel}
        debounce={debounce}
      />
    </div>
  );
}
