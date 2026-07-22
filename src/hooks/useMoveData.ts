import { MoveDataContext } from "@/providers/MoveDataProvider";
import { useContext } from "react";

export default function useMoveData() {
  const context = useContext(MoveDataContext);

  // narrows down debugging to rule out context not being used
  if (context == undefined) {
    throw new Error("useMoveData must be inside of MoveDataProvider");
  }
  return context;
}
