import useMoveData from "@/hooks/useMoveData";
import { ChecklistItem, ChecklistItemCategories } from "@/types/move";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useState } from "react";

const categoryLabels = {
  furniture: "Furniture",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  cleaning: "Cleaning",
  home_essentials: "Essentials",
  decor: "Decor",
  miscellaneous: "Misc",
};

export default function EssentialsCard() {
  const { user } = useMoveData();
  const [categories] = useState<
    {
      category: ChecklistItemCategories;
      items: ChecklistItem[];
    }[]
  >(
    user.checklist.reduce<
      { category: ChecklistItemCategories; items: ChecklistItem[] }[]
    >((prev, curr) => {
      const category = curr.category;
      const prevCategoryIndex = prev.findIndex(
        (elem) => elem.category === category,
      );
      if (prevCategoryIndex === -1) {
        return [
          ...prev,
          {
            category,
            items: [curr],
          },
        ];
      }
      return prev.map((item, index) => {
        if (index === prevCategoryIndex) {
          return { ...item, items: [...item.items, curr] };
        }
        return item;
      });
    }, []),
  );

  const CategoryTick = ({
    category,
    items,
  }: {
    category: ChecklistItemCategories;
    items: ChecklistItem[];
  }) => {
    const title = category in categoryLabels ? categoryLabels[category] : "";
    const total = items.length;
    const currentNum = items.filter((item) => item.purchased).length;
    return (
      <div>
        <p>{title}</p>
        <p>
          {currentNum} / {total}
        </p>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h3>Essentials</h3>
        <Link href="/checklist">
          <Button variant="contained">--&gt;</Button>
        </Link>
      </div>
      <div>
        {categories.map((category) => (
          <CategoryTick
            key={`tick-${category.category}`}
            category={category.category}
            items={category.items}
          />
        ))}
      </div>
    </div>
  );
}
