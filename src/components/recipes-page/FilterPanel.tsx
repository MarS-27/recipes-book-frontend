import { RecipeCategories } from '@/types/recipe';
import { type FC } from 'react';
import { SelectCategory } from './SelectCategory';
import { SearchBar } from './SearchBar';

type FilterPanelProps = {
  category?: RecipeCategories;
};

export const FilterPanel: FC<FilterPanelProps> = ({ category }) => {
  return (
    <div className="flex justify-between gap-5 border-b-2 border-b-mainBlue px-5 pb-5 max-md:flex-col">
      {category ? <SelectCategory category={category} /> : null}
      <SearchBar />
    </div>
  );
};
