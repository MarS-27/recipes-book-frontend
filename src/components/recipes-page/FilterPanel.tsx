import { RecipeCategories } from "@/types/recipe";
import { type FC } from "react";
import { SelectCategory } from "./SelectCategory";
import { SearchBar } from "./SearchBar";

type FilterPanelProps = {
  category: RecipeCategories;
};

export const FilterPanel: FC<FilterPanelProps> = ({ category }) => {
  return (
    <div className="px-5 flex gap-5 justify-between pb-5 border-b-2 border-b-mainBLue">
      <SelectCategory category={category} />
      <SearchBar />
    </div>
  );
};
