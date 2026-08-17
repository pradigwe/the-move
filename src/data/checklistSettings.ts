import InputNumberInterval from "@/lib/checklist/MultiValueOpertor";
import { GridColDef, GridFilterOperator } from "@mui/x-data-grid";

const priceOperator: GridFilterOperator<any, number>[] = [
  {
    label: "Between",
    value: "between",
    getApplyFilterFn: (filterItem) => {
      if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
        return null;
      }
      if (filterItem.value[0] === null || filterItem.value[1] === null) {
        return null;
      }
      return (value) => {
        return (
          value !== null &&
          filterItem.value[0] <= value &&
          value <= filterItem.value[1]
        );
      };
    },
    InputComponent: InputNumberInterval,
  },
];

export const checklistCols: GridColDef[] = [
  {
    field: "purchased",
    headerName: "✔",
    type: "boolean",
    flex: 0.2,
    editable: true,
    resizable: false,
    sortable: false,
    hideable: false,
    filterable: false,
  },
  {
    field: "name",
    headerName: "Name",
    type: "string",
    flex: 1,
    editable: true,
  },
  {
    field: "category",
    headerName: "Type",
    type: "singleSelect",
    valueOptions: [
      { value: "furniture", label: "Furniture" },
      { value: "kitchen", label: "Kitchen" },
      { value: "bathroom", label: "Bathroom" },
      { value: "cleaning", label: "Cleaning" },
      { value: "home_essentials", label: "Essentials" },
      { value: "decor", label: "Decor" },
      { value: "miscellaneous", label: "Misc" },
    ],
    editable: true,
  },
  {
    field: "importance",
    headerName: "Priority",
    type: "singleSelect",
    flex: 0.5,
    valueOptions: [
      { value: 0, label: "N/A" },
      { value: 1, label: "Low" },
      { value: 2, label: "Medium" },
      { value: 3, label: "High" },
    ],

    editable: true,
  },
  {
    field: "estimatedPrice",
    headerName: "Price",
    type: "number",
    flex: 0.3,
    valueFormatter: (value?: number) => {
      if (value == null) {
        return "";
      }
      return `$${value.toLocaleString()}`;
    },
    editable: true,
    filterOperators: priceOperator,
  },

  {
    field: "notes",
    headerName: "Notes",
    type: "longText",
    flex: 2,
    editable: true,
  },
];
