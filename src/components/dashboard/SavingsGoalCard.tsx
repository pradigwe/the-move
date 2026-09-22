import useMoveData from "@/hooks/useMoveData";
import Link from "next/link";

export default function SavingsGoalCard() {
  const { user } = useMoveData();
  return (
    <Link href="/savings">
      <div>
        <h3>Saved</h3>
        <p>
          ${user.savings.currentSaved} out of {user.savings.savingsGoal}
        </p>
      </div>
    </Link>
  );
}
