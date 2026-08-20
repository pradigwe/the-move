"use client";

import useMoveData from "@/hooks/useMoveData";
import { generateUniqueID } from "@/providers/MoveDataProvider";
import { MoveTask } from "@/types/move";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type TimelineSectionProps = {
  id: string;
  title: string;
  tasks: MoveTask[];
  expandedSection: string;
  setExpandedSection: Dispatch<SetStateAction<string>>;
};

export default function TimelineSection({
  id,
  title,
  tasks,
  expandedSection,
  setExpandedSection,
}: TimelineSectionProps) {
  const { updateMoveTask } = useMoveData();
  const handleUpdateMoveTask = (
    e: ChangeEvent<HTMLInputElement, Element>,
    taskId: string,
    taskTitle: string,
  ) => {
    updateMoveTask(id, taskId, {
      id: taskId,
      title: taskTitle,
      completed: e.target.checked,
    });
  };
  return (
    <div>
      <Button onClick={() => setExpandedSection(id)}>{title}</Button>
      <div hidden={expandedSection !== id}>
        {tasks.map((task) => (
          <FormControlLabel
            key={generateUniqueID()}
            control={
              <Checkbox
                checked={task.completed}
                onChange={(value) =>
                  handleUpdateMoveTask(value, task.id, task.title)
                }
              />
            }
            label={task.title}
          />
        ))}
      </div>
    </div>
  );
}
