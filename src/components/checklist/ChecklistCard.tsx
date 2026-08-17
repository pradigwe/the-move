"use client";
import { checklistCols } from "@/data/checklist/checklistSettings";
import useMoveData from "@/hooks/useMoveData";
import {
  DataGrid,
  GridFilterModel,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";

type ChecklistCardProps = {
  customFilter: GridFilterModel;
  customSetFilter: Dispatch<SetStateAction<GridFilterModel>>;
  customRowSelection: GridRowSelectionModel;
  customSetRowSelection: Dispatch<SetStateAction<GridRowSelectionModel>>;
  debounce: number;
};

export default function ChecklistCard({
  customFilter,
  customSetFilter,
  customRowSelection,
  customSetRowSelection,
}: ChecklistCardProps) {
  const { user, updateChecklist } = useMoveData();
  return (
    <div className="flex flex-col w-full max-w-full h-full">
      <DataGrid
        {...user.checklist}
        columns={checklistCols}
        rows={user.checklist.map((item) => item)}
        getRowId={(row) => row.id}
        processRowUpdate={(newRow) => {
          updateChecklist(newRow);
          return newRow;
        }}
        onProcessRowUpdateError={(error: Error) => {
          console.log("ERROR UPDATING ROW:", error);
        }}
        rowHeight={25}
        disableColumnFilter
        disableColumnResize
        disableRowSelectionOnClick
        checkboxSelection
        autoPageSize
        filterModel={customFilter}
        onFilterModelChange={(newFilterModel) =>
          customSetFilter(newFilterModel)
        }
        rowSelectionModel={customRowSelection}
        onRowSelectionModelChange={(newRowSelection) => {
          customSetRowSelection(newRowSelection);
          console.log("Rows:", customRowSelection);
        }}
        filterDebounceMs={200}
      />
    </div>
  );
}
