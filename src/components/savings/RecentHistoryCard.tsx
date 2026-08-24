import useMoveData from "@/hooks/useMoveData";
import { useEffect, useState } from "react";

export default function RecentHistoryCard() {
  const { user } = useMoveData();

  const generatePeriods = () => {
    const array = user.activityGoal.filter((item) => item.type === "savings");
    const items = array.map((item) => {
      // find time period of each item
      const date = item.date.split("-").map(Number);
      const timePeriod = new Date(date[0], date[1] - 1, date[2])
        .toDateString()
        .split(" ");
      const timePeriodString = timePeriod[1] + " " + timePeriod[3];
      return {
        id: item.id,
        timePeriod: timePeriodString,
      };
    });

    const timePeriodArray = items.reduce<{ period: string; ids: string[] }[]>(
      (prev, curr) => {
        const period = curr.timePeriod;
        const prevPeriodIndex = prev.findIndex(
          (elem) => elem.period === period,
        );
        if (prevPeriodIndex === -1) {
          return [
            ...prev,
            {
              period: period,
              ids: [curr.id],
            },
          ];
        }

        return prev.map((item, index) => {
          if (index === prevPeriodIndex) {
            return { ...item, ids: [...item.ids, curr.id] };
          }
          return item;
        });
      },
      [],
    );
    return timePeriodArray;
  };

  const [timePeriods, setTimePeriods] =
    useState<{ period: string; ids: string[] }[]>(generatePeriods());

  useEffect(() => {
    setTimePeriods(generatePeriods());
  }, [user.activityGoal]);

  // create component call of MONTH YEAR: $total
  // fetch totalprice from user add it all together using .reduce()
  const PeriodChip = ({
    period,
    idList,
  }: {
    period: string;
    idList: string[];
  }) => {
    const total = user.activityGoal.reduce((prev, curr) => {
      // get current item
      const itemPrice = idList.includes(curr.id) ? (curr.totalPrice ?? 0) : 0;
      return prev + itemPrice;
    }, 0);

    return (
      <div>
        <p>
          {period}: <span>${total}</span>
        </p>
      </div>
    );
  };
  // need to create test object wiht multiple months
  return (
    <div>
      <h3>Recent History</h3>
      <div>
        {timePeriods.map((item) => (
          <PeriodChip
            key={item.period}
            period={item.period}
            idList={item.ids}
          />
        ))}
      </div>
    </div>
  );
}
