"use client";

import useMoveData from "@/hooks/useMoveData";
import { Box, CircularProgress, Typography } from "@mui/material";

type MoveProgressCardProp = {
  type: "savings" | "move-in";
};

export default function MoveProgressCard({ type }: MoveProgressCardProp) {
  const { user } = useMoveData();
  return type === "savings" ? (
    <div className="flex">
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          enableTrackSlot
          variant="determinate"
          value={user.savings.progress}
          size={128}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
          >{`${Math.round(user.savings.progress)}%`}</Typography>
        </Box>
      </Box>

      <div>
        <div>
          <h3>${user.savings.currentSaved}</h3>
          <p>Saved</p>
        </div>
        <div>
          <h3>${user.savings.savingsGoal}</h3>
          <p>Goal</p>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
