import useMoveData from "@/hooks/useMoveData";
import { generateUniqueID } from "@/providers/MoveDataProvider";
import { MoveSection, MoveTask } from "@/types/move";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function NextStepsCard() {
  const { user, getDaysToMove, updateMoveTask } = useMoveData();

  const [currentSection] = useState<MoveSection>(
    // gets current section id using days until move
    user.movePlan.sections
      .filter((section) => section.timeframe <= getDaysToMove())
      // reduce function compares prev value to current value within an array,
      // eventually returning one object
      .reduce((a, b) => (a.timeframe > b.timeframe ? a : b)),
  );

  const getTasks = () => {
    const tasksArray = currentSection.tasks.filter((task) => !task.completed);
    if (tasksArray.length < 2) {
      if (tasksArray.length == 0) {
        return null;
      }
      return tasksArray;
    }
    const indexOne = Math.floor(Math.random() * (tasksArray?.length ?? 0));
    let indexTwo = Math.floor(Math.random() * (tasksArray?.length ?? 0));
    console.log("Tasks Array:", tasksArray);

    // checks to make sure both tasks have not been completed
    while (indexTwo === indexOne) {
      indexTwo = Math.floor(Math.random() * (tasksArray?.length ?? 0));
    }

    return [tasksArray[indexOne], tasksArray[indexTwo]];
  };

  // not updating on change, need to updatemovetask to be pushed to repplace item in task array
  const [tasks, setTasks] = useState<MoveTask[] | null>(() => getTasks());

  // error with check handling
  const handleUpdateMoveTask = (
    e: ChangeEvent<HTMLInputElement, Element>,
    taskId: string,
    taskTitle: string,
  ) => {
    updateMoveTask(currentSection.id, taskId, {
      id: taskId,
      title: taskTitle,
      completed: e.target.checked,
    });

    setTasks((prev) => {
      if (prev === null) {
        return null;
      }
      return prev.map((task) => ({
        id: task.id,
        title: task.title,
        completed: taskId === task.id ? e.target.checked : task.completed,
      }));
    });
  };

  return (
    <div>
      <h3>Next Steps</h3>
      <div>
        {tasks ? (
          tasks.map((task) => (
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
          ))
        ) : (
          <p>All done!</p>
        )}
      </div>
      <div>
        <p>{currentSection.title}</p>
        <Link href="/plan">
          <Button variant="contained">Navigate</Button>
        </Link>
      </div>
    </div>
  );
}
