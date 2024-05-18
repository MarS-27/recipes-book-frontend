import { type FC } from 'react';
import { getRecipes } from '@/utils/getRecipes';
import { redirect } from 'next/navigation';
import { ROUTE } from '@/utils/routes';
import { RecipeCategories, type TRecipe } from '@/types/recipe';
import { Pagination } from '@/components/ui/Pagination';
import { WarningMessage } from '@/components/ui/WarningMessage';
import { RecipeCard } from '@/components/recipes-page/RecipeCard';
import { FilterPanel } from '@/components/recipes-page/FilterPanel';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { type TPaginatedResult } from '@/types/types';

type TSearchParams = {
  category: RecipeCategories;
  page: string;
  isVeganHealthy: string;
};

const Recipes: FC<{ searchParams: TSearchParams }> = async ({
  searchParams,
}) => {
  if (Object.keys(searchParams).length === 0) {
    redirect(ROUTE.RECIPES_START);
  }

  const queryClient = new QueryClient();

  const { category, page, isVeganHealthy } = searchParams;

  await queryClient.prefetchQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(category, Number(page), isVeganHealthy),
  });

  const recipesData = queryClient.getQueryData<TPaginatedResult<TRecipe>>([
    'recipes',
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex w-full flex-col justify-between pb-5">
        <FilterPanel category={category} isVeganHealthy={isVeganHealthy} />
        {recipesData?.error && !recipesData.results.length ? (
          <WarningMessage>{recipesData.error}</WarningMessage>
        ) : (
          <div className="grid flex-auto grid-cols-1 gap-5 py-5 min-[460px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recipesData?.results.length ? (
              recipesData.results.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <WarningMessage>Recipes not found!</WarningMessage>
            )}
          </div>
        )}

        {recipesData?.pagesCount && recipesData.pagesCount > 1 ? (
          <Pagination
            activePageNumber={recipesData.pageNum}
            pagesCount={recipesData.pagesCount}
          />
        ) : null}
      </section>
    </HydrationBoundary>
  );
};

export default Recipes;
