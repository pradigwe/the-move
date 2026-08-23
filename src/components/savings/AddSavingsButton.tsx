"use client";
import useMoveData from "@/hooks/useMoveData";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { ChangeEvent, useState } from "react";

export default function AddSavingsButton() {
  const { updateSavingsProgress, addActivity } = useMoveData();
  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    setValue(parseInt(e.target.value));
  };

  const handleAddSavings = () => {
    const savingsMessage = "Added to move savings";
    updateSavingsProgress(value);
    addActivity("savings", savingsMessage, value);
    handleClose();
    resetModal();
  };

  const resetModal = () => {
    setValue(0);
    handleClose();
  };
  return (
    <>
      <Button onClick={handleOpen}>Add Savings</Button>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute bg-(--color-text-nav) w-1/3 h-1/4 top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center">
          <h3>Add Savings</h3>
          <div>
            <p>Amount Saved</p>
            <TextField
              type="number"
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  step: 5,
                },
              }}
              value={value}
              onChange={handleChangeValue}
            />
          </div>
          <div>
            <Button onClick={() => resetModal()}>Cancel</Button>
            <Button onClick={() => handleAddSavings()}>Add Savings</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
