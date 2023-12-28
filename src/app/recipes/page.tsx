import { type FC } from "react";
import { getRecipes } from "@/utils/getRecipes";
import { redirect } from "next/navigation";
import { ROUTE } from "@/utils/routes";
import { RecipeCategories } from "@/types/recipe";

type TSearchParams = {
  category: RecipeCategories;
  page: number;
  limit: number;
};

const Recipes: FC<{ searchParams: TSearchParams }> = async ({
  searchParams,
}) => {
  if (Object.keys(searchParams).length === 0) {
    redirect(ROUTE.RECIPES);
  }

  const recipesData = await getRecipes(
    searchParams.category,
    searchParams.page,
    searchParams.limit
  );

  return (
    <>
      {recipesData.error && !recipesData.results.length ? (
        <p>{recipesData.error}</p>
      ) : (
        <p>{recipesData.results[0].title}</p>
      )}
    </>
  );
};

export default Recipes;
