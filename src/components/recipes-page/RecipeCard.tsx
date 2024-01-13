import { TRecipe } from "@/types/recipe";
import Link from "next/link";
import { type FC } from "react";

type RecipeCardProps = {
  recipe: TRecipe;
};

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="p-3 bg-lightYellow rounded-md border border-grayStroke-8 h-recipeCard"
    >
      {recipe.title}
    </Link>
  );
};
