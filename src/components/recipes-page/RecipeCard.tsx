import { TRecipe } from "@/types/recipe";
import { type FC } from "react";

type RecipeCardProps = {
  recipe: TRecipe;
};

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="p-3 bg-mainYellow bg-opacity-[0.3] rounded-md border border-grayStroke-8 h-recipeCard">
      {recipe.title}
    </div>
  );
};
