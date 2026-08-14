"use client";
import { checklistCols } from "@/data/checklistSettings";
import useMoveData from "@/hooks/useMoveData";
import { DataGrid, GridFilterModel } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";

type ChecklistCardProps = {
  customFilter: GridFilterModel;
  customSetFilter: Dispatch<SetStateAction<GridFilterModel>>;
  debounce: number;
};

export default function ChecklistCard({
  customFilter,
  customSetFilter,
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
        autoPageSize
        filterModel={customFilter}
        onFilterModelChange={(newFilterModel) =>
          customSetFilter(newFilterModel)
        }
        filterDebounceMs={200}
      />
    </div>
  );
}
