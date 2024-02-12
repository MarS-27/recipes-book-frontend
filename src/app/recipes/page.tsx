import { type FC } from "react";
import { getRecipes } from "@/utils/getRecipes";
import { redirect } from "next/navigation";
import { ROUTE } from "@/utils/routes";
import { RecipeCategories, type TRecipe } from "@/types/recipe";
import { Pagination } from "@/components/ui/Pagination";
import { WarningMessage } from "@/components/ui/WarningMessage";
import { RecipeCard } from "@/components/recipes-page/RecipeCard";
import { FilterPanel } from "@/components/recipes-page/FilterPanel";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { type TPaginatedResult } from "@/types/types";

type TSearchParams = {
  category: RecipeCategories;
  page: string;
};

const Recipes: FC<{ searchParams: TSearchParams }> = async ({
  searchParams,
}) => {
  if (Object.keys(searchParams).length === 0) {
    redirect(ROUTE.RECIPES_START);
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["recipes"],
    queryFn: () => getRecipes(searchParams.category, Number(searchParams.page)),
  });

  const recipesData = queryClient.getQueryData<TPaginatedResult<TRecipe>>([
    "recipes",
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col justify-between w-full py-5">
        <FilterPanel category={searchParams.category} />
        {recipesData?.error && !recipesData.results.length ? (
          <WarningMessage>{recipesData.error}</WarningMessage>
        ) : (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-auto py-5">
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
