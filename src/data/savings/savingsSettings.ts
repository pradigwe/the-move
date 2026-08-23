import { ActivityItem } from "@/types/move";
import { GridColDef } from "@mui/x-data-grid";

export const savingsCols: GridColDef[] = [
  {
    field: "activityType",
    headerName: "Type",
    type: "string",
    editable: false,
  },
  {
    field: "message",
    headerName: "Activity",
    type: "string",
    editable: false,
    resizable: false,
    sortable: false,
    filterable: false,
    flex: 0.6,
  },
  {
    field: "totalPrice",
    headerName: "Amount",
    type: "number",
    valueFormatter: (value, item: ActivityItem) => {
      if (value === null || value === undefined) return "N/A";
      if (item.type === "savings") return "+ $" + value;
      return "$" + value;
    },
    editable: false,
    resizable: false,
    sortable: false,
    hideable: false,
    filterable: false,
    flex: 0.2,
  },
  {
    field: "date",
    headerName: "Date",
    type: "string",
    editable: false,
    resizable: false,
    flex: 0.2,
    valueFormatter: (value?: string) => {
      if (value === null || value === undefined) {
        return "ERROR";
      }
      const valueArray = value?.split("-").map(Number);
      const date = new Date(
        valueArray[0],
        valueArray[1] - 1,
        valueArray[2],
      ).toDateString();

      // get todays date and compare to value date
      const currentDate = new Date().toDateString();
      if (currentDate === date) return "Today";
      const dateArray = date.split(" ");
      return dateArray[1] + " " + dateArray[2];
    },
  },
];
