"use client";
import ChecklistCard from "@/components/checklist/ChecklistCard";
import { TextField } from "@mui/material";

export default function Checklist() {
  return (
    <div className="flex flex-col w-full p-10 gap-5">
      <TextField></TextField>
      <h2>Checklist</h2>
      <ChecklistCard />
    </div>
  );
}
