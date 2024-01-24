import { type FC } from "react";
import { FilterPanel } from "@/components/recipes-page/FilterPanel";
import { IngredientsList } from "@/components/single-recipe-page/Ingredients";
import { WarningMessage } from "@/components/ui/WarningMessage";
import { getRecipeById } from "@/utils/getRecipeById";
import clsx from "clsx";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { RecipeStagesList } from "@/components/single-recipe-page/RecipeStagesList";

type TParams = {
  id: string;
};

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

const Recipe: FC<{ params: TParams }> = async ({ params }) => {
  const recipeData = await getRecipeById(Number(params.id));

  const { result, error } = recipeData;

  return (
    <section className="w-full py-5">
      <FilterPanel />
      {error ? (
        <WarningMessage>{error}</WarningMessage>
      ) : (
        <div className="">
          {result?.ingredients ? (
            <IngredientsList ingredients={result.ingredients} />
          ) : null}
          <div className="w-full flex flex-col gap-3 md:pl-64">
            <h3
              className={clsx(
                pacifico.className,
                "text-md26 sm:text-l36 font-medium tracking-wider p-2 text-center"
              )}
            >
              {result?.title}
            </h3>
            {result?.titleImgPath ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${result?.titleImgPath}`}
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
        </div>
      )}
    </section>
  );
};

export default Recipe;
