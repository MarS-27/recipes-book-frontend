import { type FC } from "react";
import { ROUTE } from "@/utils/routes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export const AddRecipeButton: FC = () => {
  return (
    <Link
      href={ROUTE.RECIPE_FORM}
      className={clsx(
        "relative hover:scale-125 transition-all duration-200",
        "after:content-['Add_recipe'] after:absolute after:top-full after:left-0 after:text-xs10 after:whitespace-nowrap after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200"
      )}
    >
      <Image
        width={48}
        height={48}
        src="/images/add-recipe.svg"
        alt="Add recipe"
        className="min-w-12"
      />
    </Link>
  );
};
