import useMoveData from "@/hooks/useMoveData";
import Button from "@mui/material/Button";
import { GridRowSelectionModel } from "@mui/x-data-grid";

type DeleteButtonProps = {
  selectedRows: GridRowSelectionModel;
};

export default function DeleteButton({ selectedRows }: DeleteButtonProps) {
  const { deleteChecklistItem } = useMoveData();
  const handleDeleteRows = () => {
    selectedRows.ids.forEach((id) => {
      console.log("Deleted Row:", id.toString());
      deleteChecklistItem(id.toString());
    });
  };
  return (
    <div>
      <Button
        variant="outlined"
        disabled={selectedRows.ids.size === 0 ? true : false}
        onClick={handleDeleteRows}
      >
        Delete {selectedRows.ids.size > 1 ? `(${selectedRows.ids.size})` : ""}
      </Button>
    </div>
  );
}
