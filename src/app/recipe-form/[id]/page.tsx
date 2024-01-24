import { RecipeForm } from "@/components/recipe-form/RecipeForm";
import { getRecipeById } from "@/utils/getRecipeById";
import { type FC } from "react";

type TParams = {
  id: string;
};

const UpdateRecipe: FC<{ params: TParams }> = async ({ params }) => {
  const recipeData = await getRecipeById(Number(params.id));

  const { result, error } = recipeData;

  return (
    <section className="w-full py-5">
      <RecipeForm updatedRecipe={result} />
    </section>
  );
};

export default UpdateRecipe;
