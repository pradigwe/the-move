import useMoveData from "@/hooks/useMoveData";
import EditGoalButton from "./EditGoalButton";

export default function MoveGoalCard() {
  const { user } = useMoveData();
  const getFullDate = () => {
    const stringDate = user.movePlan.moveDate;
    const dateArray = new Date(stringDate).toDateString().split(" ");

    return (
      dateArray[0] +
      ", " +
      dateArray[1] +
      " " +
      dateArray[2] +
      ", " +
      dateArray[3]
    );
  };
  return (
    <div>
      <h3>Your Goal</h3>
      <div>
        <p>
          <span>Goal: </span>${user.savings.savingsGoal}
        </p>
        <p>
          <span>Move-In: </span>
          {getFullDate()}
        </p>
        <p>
          <span>Remaining: </span>${user.savings.remainingGoal}
        </p>
      </div>
      <EditGoalButton />
    </div>
  );
}
