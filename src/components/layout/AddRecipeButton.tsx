"use client";
import { ROUTE } from "@/utils/routes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState, type FC } from "react";

export const AddRecipeButton: FC = () => {
  const [isShowHint, setShowHint] = useState(false);
  return (
    <Link
      href={ROUTE.RECIPE_FORM}
      className="flex items-center gap-2hover:scale-125 transition-all duration-200"
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={() => setShowHint(false)}
    >
      <Image
        width={48}
        height={48}
        src="/images/add-recipe.svg"
        alt="Add recipe"
        className="min-w-12"
      />
      <p
        className={clsx(
          "overflow-hidden transition-all duration-200",
          !isShowHint ? "w-0" : "w-full"
        )}
      >
        Add recipe
      </p>
    </Link>
  );
};
