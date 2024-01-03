import { TRecipe } from "@/types/recipe";
import { type FC } from "react";

type RecipeCardProps = {
  recipe: TRecipe;
};

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="p-3 bg-lightYellow rounded-md border border-grayStroke-8 h-recipeCard">
      {recipe.title}
    </div>
  );
};
