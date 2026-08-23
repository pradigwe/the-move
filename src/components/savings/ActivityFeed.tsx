import { savingsCols } from "@/data/savings/savingsSettings";
import useMoveData from "@/hooks/useMoveData";
import { DataGrid } from "@mui/x-data-grid";

export default function SavingsActivityFeed() {
  const { user } = useMoveData();

  const visibilityModel = {
    activityType: false,
  };

  return (
    <DataGrid
      {...user.activityGoal.filter(
        (item) => item.type === "savings" || item.type === "purchase",
      )}
      columns={savingsCols}
      rows={user.activityGoal
        .filter((item) => item.type === "savings" || item.type === "purchase")
        .reverse()}
      getRowId={(row) => row.id}
      autoHeight
      columnVisibilityModel={visibilityModel}
    />
  );
}
