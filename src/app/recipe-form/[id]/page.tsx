import { RecipeForm } from "@/components/recipe-form/RecipeForm";
import { WarningMessage } from "@/components/ui/WarningMessage";
import { type TGetRecipeByIdResult } from "@/types/recipe";
import { getRecipeById } from "@/utils/getRecipeById";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { type FC } from "react";

type TParams = {
  id: string;
};

const UpdateRecipe: FC<{ params: TParams }> = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["recipe", params.id],
    queryFn: () => getRecipeById(Number(params.id)),
  });

  const recipeData = queryClient.getQueryData<TGetRecipeByIdResult>([
    "recipe",
    params.id,
  ]);

  const error = recipeData?.error;
  const result = recipeData?.result;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="w-full pb-5">
        {error ? (
          <WarningMessage>{error}</WarningMessage>
        ) : (
          <RecipeForm updatedRecipeData={result} />
        )}
      </section>
    </HydrationBoundary>
  );
};

export default UpdateRecipe;
