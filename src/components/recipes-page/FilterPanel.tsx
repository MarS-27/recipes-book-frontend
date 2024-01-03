import { RecipeCategories } from "@/types/recipe";
import { type FC } from "react";
import { SelectCategory } from "./SelectCategory";

type FilterPanelProps = {
  category: RecipeCategories;
};

export const FilterPanel: FC<FilterPanelProps> = ({ category }) => {
  return (
    <div className="px-5">
      <SelectCategory category={category} />
    </div>
  );
};
