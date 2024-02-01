import { TRecipe } from "@/types/recipe";
import Link from "next/link";
import Image from "next/image";
import { type FC } from "react";
import clsx from "clsx";
import { Pacifico } from "next/font/google";
import { ROUTE } from "@/utils/routes";

type RecipeCardProps = {
  recipe: TRecipe;
};

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const { title, titleImgPath } = recipe;

  return (
    <Link
      href={`${ROUTE.RECIPE}/${recipe.id}`}
      className={clsx(
        "relative rounded-md h-recipeCard shadow-lg hover:scale-105 transition-all duration-200",
        !titleImgPath ? "p-2 bg-lightBlue" : "p-0"
      )}
    >
      <Image
        src={
          titleImgPath
            ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${titleImgPath}`
            : "/images/meal-icon.svg"
        }
        className={clsx(
          "w-full rounded-md",
          !titleImgPath ? "h-40 object-center" : "object-cover h-recipeCard"
        )}
        width={300}
        height={300}
        alt="Recipe title image"
      />
      <p
        className={clsx(
          pacifico.className,
          "absolute bottom-0 left-0 w-full bg-lightYellow bg-opacity-70 text-md20 md:text-md26 font-medium p-2 leading-[34px] md:leading-[44px] line-clamp-1 hover:line-clamp-none"
        )}
      >
        {title}
      </p>
    </Link>
  );
};
