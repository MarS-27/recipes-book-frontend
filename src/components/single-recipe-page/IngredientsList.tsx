"use client";
import { useState, type FC } from "react";
import Image from "next/image";
import clsx from "clsx";

type TIngredientsListProps = {
  ingredients: string[];
};

export const IngredientsList: FC<TIngredientsListProps> = ({ ingredients }) => {
  const [isOpenMobileIngredients, toggleMobileIngredients] = useState(false);

  return (
    <div className="fixed bottom-7 md:top-[154px]">
      <Image
        width={40}
        height={40}
        src="/images/ingredients-icon.svg"
        alt="Ingredients"
        className="min-w-10 md:hidden opacity-70 hover:scale-125 hover:opacity-100 transition-all duration-200 mb-2"
        onClick={() => toggleMobileIngredients(!isOpenMobileIngredients)}
      />
      <div
        className={clsx(
          "grid md:grid-rows-[1fr] w-ingredientsList transition-all duration-200",
          isOpenMobileIngredients
            ? "grid-rows-[1fr] max-md:bg-lightBlue rounded-md max-md:border-2 border-grayStroke-80"
            : "grid-rows-[0fr]"
        )}
      >
        <ul className="flex flex-col gap-2 pl-6 pr-3 list-image-checkmark max-h-ingredientsList overflow-y-auto">
          <p className="text-s14 sm:text-md20 font-semibold pt-2">
            Ingredients:
          </p>
          {ingredients.map((ingredient) => (
            <li key={ingredient} className="last-of-type:pb-2">
              {ingredient};
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
