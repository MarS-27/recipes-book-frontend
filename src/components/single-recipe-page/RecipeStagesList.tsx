import { type FC } from "react";
import Image from "next/image";
import { TRecipeStage } from "@/types/recipe";

type TRecipeStagesListProps = {
  stages: TRecipeStage[];
};

export const RecipeStagesList: FC<TRecipeStagesListProps> = ({ stages }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">Stages:</p>
      {stages.map((stage) => (
        <div
          className="flex items-center max-[900px]:flex-col-reverse gap-3 pb-2 border-b"
          key={stage.stageNumber}
        >
          <p className="w-full">
            <span className="font-semibold">{stage.stageNumber}.</span>{" "}
            {stage.description}
          </p>
          {stage.imgPath ? (
            <Image
              width={240}
              height={240}
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${stage.imgPath}`}
              className="w-5/12 h-auto max-h-recipeStageImage object-cover rounded-md"
              alt="Recipe stage image"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};
