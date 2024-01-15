import { TRecipe } from "@/types/recipe";
import Link from "next/link";
import Image from "next/image";
import { type FC } from "react";
import clsx from "clsx";
import { Pacifico } from "next/font/google";

type RecipeCardProps = {
  recipe: TRecipe;
};

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const { title, titleImgPath } = recipe;
  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="rounded-md border-2 border-grayStroke-80 h-recipeCard shadow-lg hover:scale-105 transition-all duration-200"
    >
      <div
        className={clsx(
          "max-h-40",
          !titleImgPath ? "p-2 bg-lightYellow" : "p-0"
        )}
      >
        <Image
          src={
            titleImgPath
              ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${titleImgPath}`
              : "/images/meal-icon.svg"
          }
          className={clsx(
            "w-full h-auto",
            !titleImgPath ? "object-center max-h-36" : "object-cover max-h-40"
          )}
          width={300}
          height={300}
          alt="Recipe title image"
        />
      </div>
      <p
        className={clsx(
          pacifico.className,
          "text-md20 sm:text-md26 font-medium tracking-wider p-2"
        )}
      >
        {title}
      </p>
    </Link>
  );
};
