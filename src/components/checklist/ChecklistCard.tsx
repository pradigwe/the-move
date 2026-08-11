"use client";
import { checklistCols } from "@/data/checklistSettings";
import useMoveData from "@/hooks/useMoveData";
import { User } from "@/types/move";
import { DataGrid, GridRowId } from "@mui/x-data-grid";

export default function ChecklistCard() {
  const { user, updateChecklist } = useMoveData();
  return (
    <div className="flex flex-col w-full max-w-full">
      <DataGrid
        {...user.checklist}
        columns={checklistCols}
        rows={user.checklist.map((item) => item)}
        getRowId={(row) => row.id}
        processRowUpdate={(newRow) => {
          updateChecklist(newRow.id, newRow);
          return newRow;
        }}
        onProcessRowUpdateError={(error: Error) => {
          console.log("ERROR UPDATING ROW:", error);
        }}
        rowHeight={25}
        disableColumnResize
      />
    </div>
  );
}
