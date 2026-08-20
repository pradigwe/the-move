"use client";
import TimelineSection from "@/components/move-plan/TimelineSection";
import useMoveData from "@/hooks/useMoveData";
import { FormGroup } from "@mui/material";
import { useState } from "react";

export default function Plan() {
  const { user, getDaysToMove } = useMoveData();
  const [currentSection, setCurrentSection] = useState<string>(
    // gets current section id using days until move
    user.movePlan.sections
      .filter((section) => section.timeframe <= getDaysToMove())
      // reduce function compares prev value to current value within an array,
      // eventually returning one object
      .reduce((a, b) => (a.timeframe > b.timeframe ? a : b)).id,
  );
  return (
    <div className="w-full h-auto">
      <h2>Plan</h2>
      <h4>{`${getDaysToMove()} days to move`}</h4>
      <div className="flex">
        <FormGroup>
          {user.movePlan.sections.map((section) => (
            <TimelineSection
              key={`section-${section.id}`}
              id={section.id}
              title={section.title}
              tasks={section.tasks}
              expandedSection={currentSection}
              setExpandedSection={setCurrentSection}
            />
          ))}
        </FormGroup>
      </div>
    </div>
  );
}
