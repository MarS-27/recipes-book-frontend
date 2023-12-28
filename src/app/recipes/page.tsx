import { type FC } from "react";
import { getRecipes } from "@/utils/getRecipes";
import { redirect } from "next/navigation";
import { ROUTE } from "@/utils/routes";
import { RecipeCategories } from "@/types/recipe";
import { Pagination } from "@/components/ui/Pagination";

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

  const recipesData = await getRecipes(
    searchParams.category,
    Number(searchParams.page)
  );

  return (
    <>
      {recipesData.error && !recipesData.results.length ? (
        <p>{recipesData.error}</p>
      ) : (
        <p>{recipesData.results[0].title}</p>
      )}

      {recipesData.pagesCount && recipesData.pagesCount > 1 ? (
        <Pagination
          activePageNumber={recipesData.pageNum}
          pagesCount={recipesData.pagesCount}
        />
      ) : null}
    </>
  );
};

export default Recipes;
