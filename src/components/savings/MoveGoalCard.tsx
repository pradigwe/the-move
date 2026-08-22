import useMoveData from "@/hooks/useMoveData";
import EditGoalButton from "./EditGoalButton";

export default function MoveGoalCard() {
  const { user } = useMoveData();
  const getFullDate = () => {
    const stringDate = user.movePlan.moveDate.split("-");
    const numberDate = stringDate.map(Number);
    const date = new Date(numberDate[0], numberDate[1] - 1, numberDate[2])
      .toDateString()
      .split(" ");
    console.log(date);
    return date[0] + ", " + date[1] + " " + date[2] + ", " + date[3];
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
