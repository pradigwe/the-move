"use client";

import useMoveData from "@/hooks/useMoveData";
import { ChecklistItemCategories } from "@/types/move";
import {
  Button,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function AddItemButton() {
  const { addChecklistItem } = useMoveData();

  // modal variables and functions
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // checklist item variables
  const [name, setName] = useState<string>("");
  const [category, setCategory] =
    useState<ChecklistItemCategories>("miscellaneous");
  const [importance, setImportance] = useState<1 | 2 | 3 | 0>(0);
  const [price, setPrice] = useState<string>("");
  const [purchased, setPurchased] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");

  const [error, setError] = useState<string>("");

  // checking if user is setting a valid price (optional)
  const [isValidPrice, setIsValidPrice] = useState<boolean>(true);
  const handlePriceValidation = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    setPrice(e.target.value);
    const decimalRegex = /^-?\d*\.?\d+$/;
    setIsValidPrice(e.target.value.match(decimalRegex) !== null);
    console.log("Is valid:", e.target.value.match(decimalRegex) !== null);
  };

  // handles adding a checklist item to storage
  const handleAddChecklistItem = () => {
    if (!name) {
      setError("Please fill in the name field.");
      return;
    }
    if (!isValidPrice) {
      setError("Please set a valid or empty price for your item.");
      return;
    }
    setError("");
    addChecklistItem(
      name,
      category,
      importance,
      purchased,
      notes,
      Number(price),
    );
    handleClose();
    resetForm();
  };

  // resets form checklist item variables
  const resetForm = () => {
    setName("");
    setCategory("miscellaneous");
    setImportance(0);
    setPrice("");
    setPurchased(false);
    setNotes("");
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Item</Button>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute bg-(--color-text-nav) w-1/3 h-2/3 top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center ">
          <FormGroup>
            <div>
              <h3>Name</h3>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />
            </div>
            <div className="flex flew-row gap-10">
              <div className="flex-5/8">
                <h3>Category</h3>
                <div>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    fullWidth
                  >
                    <MenuItem value="furniture">Furniture</MenuItem>
                    <MenuItem value="kitchen">Kitchen</MenuItem>
                    <MenuItem value="bathroom">Bathroom</MenuItem>
                    <MenuItem value="cleaning">Cleaning</MenuItem>
                    <MenuItem value="home_essentials">Home Essentials</MenuItem>
                    <MenuItem value="decor">Decor</MenuItem>
                    <MenuItem value="miscellaneous">Misc</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="flex-3/8">
                <h3>Priority</h3>
                <Select
                  value={importance}
                  onChange={(e) => setImportance(e.target.value)}
                  required
                  fullWidth
                >
                  <MenuItem value={0}>N/A</MenuItem>
                  <MenuItem value={1}>Low</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>High</MenuItem>
                </Select>
              </div>
            </div>
            <div className="flex gap-12 ">
              <div>
                <h3>
                  Price <span>(optional)</span>{" "}
                </h3>
                <TextField
                  value={price}
                  error={!isValidPrice}
                  onChange={(e) => handlePriceValidation(e)}
                  type="number"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      value={purchased}
                      checked={purchased}
                      onChange={(e) => setPurchased(e.target.checked)}
                    />
                  }
                  label="Purchased"
                />
              </div>
            </div>
            <div>
              <h3>Notes</h3>
              <TextField
                value={notes}
                onChange={(value) => setNotes(value.target.value)}
                fullWidth
              />
            </div>
            <div>
              <div>
                <Button onClick={handleAddChecklistItem}>Add</Button>
                <Button
                  onClick={() => {
                    handleClose();
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
              <p>{error}</p>
            </div>
          </FormGroup>
        </div>
      </Modal>
    </div>
  );
}
