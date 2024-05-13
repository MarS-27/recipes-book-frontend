'use client';
import { useClosePopupOnClickOutside } from '@/hooks/useClosePopupOnClickOutside';
import clsx from 'clsx';
import Image from 'next/image';
import { type FC } from 'react';

type TIngredientsListProps = {
  ingredients: string[];
};

export const IngredientsList: FC<TIngredientsListProps> = ({ ingredients }) => {
  const { ref, isOpenPopup, toggleOpenPopup } = useClosePopupOnClickOutside();

  return (
    <div ref={ref} className="fixed bottom-7 z-20 md:top-[154px]">
      <Image
        width={40}
        height={40}
        src="/images/ingredients-icon.svg"
        alt="Ingredients"
        className="mb-2 min-w-10 opacity-70 transition-all duration-200 hover:scale-125 hover:opacity-100 md:hidden"
        onClick={() => toggleOpenPopup(!isOpenPopup)}
      />
      <div
        className={clsx(
          'grid w-ingredientsList transition-all duration-200 md:grid-rows-[1fr]',
          isOpenPopup
            ? 'grid-rows-[1fr] rounded-md border-grayStroke-80 max-md:border-2 max-md:bg-lightBlue'
            : 'grid-rows-[0fr]',
        )}
      >
        <ul className="flex max-h-ingredientsList list-image-checkmark flex-col gap-2 overflow-y-auto pl-6 pr-3">
          <p className="pt-2 text-s14 font-semibold sm:text-md20">
            Ingredients:
          </p>
          {ingredients.map((ingredient) => (
            <li key={ingredient} className="last-of-type:pb-2">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
