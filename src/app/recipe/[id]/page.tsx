import { FilterPanel } from "@/components/recipes-page/FilterPanel";
import { ControlRecipeButtons } from "@/components/single-recipe-page/ControlRecipeButtons";
import { IngredientsList } from "@/components/single-recipe-page/IngredientsList";
import { RecipeStagesList } from "@/components/single-recipe-page/RecipeStagesList";
import { WarningMessage } from "@/components/ui/WarningMessage";
import { TGetRecipeByIdResult } from "@/types/recipe";
import { getRecipeById } from "@/utils/getRecipeById";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import clsx from "clsx";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { type FC } from "react";

type TParams = {
  id: string;
};

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

const Recipe: FC<{ params: TParams }> = async ({ params }) => {
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
      <section className="w-full py-5">
        <FilterPanel />
        {error ? (
          <WarningMessage>{error}</WarningMessage>
        ) : (
          <>
            {result?.ingredients ? (
              <IngredientsList ingredients={result.ingredients} />
            ) : null}
            <div className="w-full flex flex-col gap-3 md:pl-64">
              <div className="flex gap-2 items-center justify-between">
                <h3
                  className={clsx(
                    pacifico.className,
                    "w-full text-md26 sm:text-l36 font-medium tracking-wider p-2 text-center"
                  )}
                >
                  {result?.title}
                </h3>
                <ControlRecipeButtons />
              </div>
              {result?.titleImgPath ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${result.titleImgPath}`}
                  className="w-full max-h-recipeTitleImage object-cover rounded-md"
                  width={200}
                  height={200}
                  alt="Recipe title image"
                />
              ) : null}
              <p>{result?.description}</p>
              {result?.stages ? (
                <RecipeStagesList stages={result.stages} />
              ) : null}
            </div>
          </>
        )}
      </section>
    </HydrationBoundary>
  );
};

export default Recipe;
