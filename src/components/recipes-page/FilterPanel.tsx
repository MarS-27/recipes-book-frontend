import { RecipeCategories } from '@/types/recipe';
import { type FC } from 'react';
import { SelectCategory } from './SelectCategory';
import { SearchBar } from './SearchBar';
import { IsVeganFilter } from './IsVeganFilter';

type FilterPanelProps = {
  category?: RecipeCategories;
  isVegan?: string;
};

export const FilterPanel: FC<FilterPanelProps> = ({ category, isVegan }) => {
  return (
    <div className="flex justify-between gap-5 border-b-2 border-b-mainBlue px-5 pb-5 max-md:flex-col">
      {category && isVegan ? (
        <>
          <SelectCategory category={category} isVegan={isVegan} />
          <IsVeganFilter category={category} isVegan={isVegan} />
        </>
      ) : null}

      <SearchBar />
    </div>
  );
};
