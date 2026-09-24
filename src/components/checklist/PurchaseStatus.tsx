import useMoveData from "@/hooks/useMoveData";
import { ChecklistItem } from "@/types/move";
import { Chip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

export default function RenderPurchaseStatus(
  params: GridRenderCellParams<ChecklistItem>,
) {
  const { updateChecklist } = useMoveData();
  var newItem: ChecklistItem = { ...params.value };

  const handleUpdateChecklistItem = () => {
    newItem.purchased = !newItem.purchased;
    updateChecklist(newItem);
  };

  return (
    <div
      className="flex items-center justify-center  m-auto h-full cursor-pointer select-none"
      onClick={handleUpdateChecklistItem}
    >
      <Chip
        label={newItem.purchased ? "Purchased" : "Not Purchased"}
        size="small"
      />
    </div>
  );
}
