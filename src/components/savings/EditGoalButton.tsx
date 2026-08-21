import useMoveData from "@/hooks/useMoveData";
import { Button, Modal, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function EditGoalButton() {
  const { user, setSavingsGoal, updateMoveDate } = useMoveData();

  const [moveDate, setMoveDate] = useState<string>(user.movePlan.moveDate);
  const [goal, setGoal] = useState<number>(user.savings.savingsGoal);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    // sets modal values back to saved values in user object
    setMoveDate(user.movePlan.moveDate);
    setGoal(user.savings.savingsGoal);
  };
  const handleSetMoveDate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    setMoveDate(e.target.value);
  };
  const handleSetGoal = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    setGoal(Number(e.target.value));
  };
  const handleUpdateGoal = () => {
    updateMoveDate(moveDate);
    setSavingsGoal("total", goal);
  };
  return (
    <>
      <Button onClick={handleOpen}>Edit Goal</Button>
      <Modal open={isOpen} onClose={handleClose}>
        <div className="absolute bg-(--color-text-nav) w-1/3 h-2/3 top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center">
          <h3>Move Details</h3>
          <div>
            <p>Move-in Date</p>
            <TextField
              type="date"
              slotProps={{
                htmlInput: {
                  min: new Date().toISOString().split("T")[0],
                },
              }}
              value={moveDate}
              onChange={handleSetMoveDate}
            />
          </div>
          <div>
            <p>Savings Goal</p>
            <TextField
              type="number"
              value={goal}
              onChange={handleSetGoal}
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  step: 100,
                },
              }}
            />
          </div>
          <Button
            onClick={(value) => {
              handleUpdateGoal();
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </div>
      </Modal>
    </>
  );
}
