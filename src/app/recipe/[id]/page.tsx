import { FilterPanel } from "@/components/recipes-page/FilterPanel";
import { WarningMessage } from "@/components/ui/WarningMessage";
import { getRecipeById } from "@/utils/getRecipeById";
import clsx from "clsx";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { type FC } from "react";

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
        <div className="flex gap-5">
          <div className="w-full flex flex-col gap-3">
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
                className="w-full max-h-recipeTitleImage object-cover rounded-md border-2 border-grayStroke-80"
                width={200}
                height={200}
                alt="Recipe title image"
              />
            ) : null}

            <p>{result?.description}</p>

            <div className="flex flex-col gap-2">
              <p className="font-semibold">Stages:</p>
              {result?.stages.map((stage) => (
                <div
                  className="flex gap-3 pb-2 border-b"
                  key={stage.stageNumber}
                >
                  <p className="w-full">
                    <span className="font-semibold">{stage.stageNumber}.</span>{" "}
                    {stage.description}
                  </p>
                  {stage.imgPath ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${stage.imgPath}`}
                      className="w-1/3 max-h-recipeStageImage object-cover rounded-md border-2 border-grayStroke-80"
                      width={200}
                      height={200}
                      alt="Recipe stage image"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <ul className="flex flex-col gap-3 w-1/4 p-2">
            <p className="font-semibold">Ingredients:</p>
            {result?.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Recipe;
