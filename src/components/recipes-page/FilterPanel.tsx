import { RecipeCategories } from '@/types/recipe';
import { type FC } from 'react';
import { SelectCategory } from './SelectCategory';
import { SearchBar } from './SearchBar';
import { IsVeganHealthyCheckbox } from './IsVeganHealthyCheckbox';

type FilterPanelProps = {
  category?: RecipeCategories;
  isVeganHealthy?: string;
};

export const FilterPanel: FC<FilterPanelProps> = ({
  category,
  isVeganHealthy,
}) => {
  return (
    <div className="flex justify-between gap-5 border-b-2 border-b-mainBlue px-5 pb-5 max-md:flex-col">
      {category && isVeganHealthy ? (
        <>
          <SelectCategory category={category} isVeganHealthy={isVeganHealthy} />
          <IsVeganHealthyCheckbox
            category={category}
            isVeganHealthy={isVeganHealthy}
          />
        </>
      ) : null}

      <SearchBar />
    </div>
  );
};
