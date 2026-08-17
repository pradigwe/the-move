"use client";

import { buttonLabels } from "@/data/buttonLabels";
import useMoveData from "@/hooks/useMoveData";
import { Button, Chip, Modal, Slider, TextField } from "@mui/material";
import { GridLogicOperator } from "@mui/x-data-grid";
import { GridFilterModel } from "@mui/x-data-grid/models";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type FilterButtonProps = {
  triggerSearchFilter: Dispatch<SetStateAction<GridFilterModel>>;
};

export default function FilterButton({
  triggerSearchFilter,
}: FilterButtonProps) {
  const { user } = useMoveData();
  // modal variables and functions
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // filter control variable
  const [currentFilter, setCurrentFilter] = useState<string>("");

  // Price range slider variables
  const [maxValue, setMaxValue] = useState<number>(500);
  const [priceValue, setPriceValue] = useState<number[]>([0, maxValue]);

  const handlePriceValueChange = (event: Event, newValue: number[]) => {
    setPriceValue(newValue);
    handlePriceFilter();
  };
  const handlePriceValueChangeMin = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    setPriceValue((prev) => [Number(event.target.value), prev[0]]);
  };

  const handlePriceValueChangeMax = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    setPriceValue((prev) => [Number(event.target.value), prev[1]]);
  };

  const findMaxChecklistValue = () => {
    const value = Math.max(
      ...user.checklist.map((item) => item.estimatedPrice ?? 0),
    );
    setMaxValue(value);
  };
  // updates max value of range every time user updates the price of a checklist item
  useEffect(() => {
    findMaxChecklistValue();
  }, [user.checklist]);

  const handlePriceFilter = () => {
    const field = "estimatedPrice";
    setCurrentFilter(field);
    triggerSearchFilter((prev) => ({
      ...prev,
      items: [
        {
          field,
          value: priceValue,
          operator: "between",
        },
      ],
      logicOperator: GridLogicOperator.Or,
    }));
  };

  const resetFilter = () => {
    setCurrentFilter("");
    triggerSearchFilter((prev) => ({
      ...prev,
      items: [],
    }));
  };

  // Filter tag component
  const ItemTag = ({
    label,
    value,
    field,
  }: {
    label: string;
    value: string | number | boolean;
    field: string;
  }) => {
    const itemKey = `${field}-${value}`;
    return (
      <>
        <Chip
          key={`${field}-${value}`}
          label={label}
          onClick={() => {
            if (currentFilter === itemKey) {
              resetFilter();
            } else {
              setCurrentFilter(itemKey);
              triggerSearchFilter((prev) => ({
                ...prev,
                items: [
                  {
                    field,
                    value,
                    operator: "is",
                  },
                ],
              }));
            }
          }}
          variant={currentFilter === itemKey ? "filled" : "outlined"}
        />
      </>
    );
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">Filter</Button>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute bg-(--color-text-nav) w-1/3 h-2/3 top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center ">
          <section>
            <h3>Category</h3>
            <div>
              {buttonLabels.map(
                (category) =>
                  category.field === "category" &&
                  category.labels.map((item) => (
                    <ItemTag
                      key={`${category.field}-${item.value}`}
                      label={item.label}
                      value={item.value}
                      field={category.field}
                    />
                  )),
              )}
            </div>
          </section>
          <section>
            <h3>Priority</h3>
            <div>
              {buttonLabels.map(
                (category) =>
                  category.field === "importance" &&
                  category.labels.map((item) => (
                    <ItemTag
                      key={`${category.field}-${item.value}`}
                      label={item.label}
                      value={item.value}
                      field={category.field}
                    />
                  )),
              )}
            </div>
          </section>
          <section>
            <h3>Purchased</h3>
            <div>
              {buttonLabels.map(
                (category) =>
                  category.field === "purchased" &&
                  category.labels.map((item) => (
                    <ItemTag
                      key={`${category.field}-${item.value}`}
                      label={item.label}
                      value={item.value}
                      field={category.field}
                    />
                  )),
              )}
            </div>
          </section>
          <section>
            <h3>Price Range</h3>
            <div className="flex flex-row gap-10">
              <TextField
                size="small"
                className="flex-1/4"
                value={priceValue[0]}
                onChange={handlePriceValueChangeMin}
                type="number"
              />
              <div className="flex-3/4">
                <div className="flex flex-row justify-between">
                  <p>$0</p>
                  <p>${maxValue}</p>
                </div>

                <Slider
                  value={priceValue}
                  onChange={handlePriceValueChange}
                  valueLabelDisplay="auto"
                  max={maxValue}
                  step={maxValue < 1000 ? 10 : maxValue < 5000 ? 100 : 200}
                />
              </div>
              <TextField
                size="small"
                className="flex-1/4"
                value={priceValue[1]}
                onChange={handlePriceValueChangeMax}
                type="number"
              />
            </div>
          </section>
          <p>You can filter by one field at a time.</p>
          <div>
            <Button
              onClick={() => {
                resetFilter();
                handleClose();
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
