'use client';
import { useClosePopupOnClickOutside } from '@/hooks/useClosePopupOnClickOutside';
import { RecipeCategories } from '@/types/recipe';
import { ROUTE } from '@/utils/routes';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

type SelectCategoryProps = {
  category: RecipeCategories;
  isVegan: string;
};

export const SelectCategory: FC<SelectCategoryProps> = ({
  category,
  isVegan,
}) => {
  const { ref, isOpenPopup, toggleOpenPopup } = useClosePopupOnClickOutside();
  const categories = Object.values(RecipeCategories);

  return (
    <div
      ref={ref}
      className="relative w-full cursor-pointer md:max-w-filterBar"
    >
      <div
        className={clsx(
          'flex items-center justify-between gap-2 rounded-md border-2 bg-lightYellow p-2 transition-all duration-200',
          isOpenPopup
            ? 'border-mainBlue'
            : 'border-grayStroke-80 hover:border-mainBlue',
        )}
        onClick={() => {
          toggleOpenPopup(!isOpenPopup);
        }}
      >
        <h3 className="text-s14 font-semibold md:text-md20">{category}</h3>
        <Image
          width={24}
          height={24}
          className={clsx(
            'min-w-6 transition-all duration-200',
            isOpenPopup ? 'rotate-180' : null,
          )}
          src="/images/select-arrow.svg"
          alt="Open select categories"
        />
      </div>
      <div
        className={clsx(
          'absolute left-0 top-[105%] z-10 grid max-h-filterBar w-full transition-all duration-200',
          isOpenPopup
            ? 'grid-rows-[1fr] rounded-md border border-grayStroke-80 bg-pageBg p-2'
            : 'grid-rows-[0fr]',
        )}
      >
        <div
          className={clsx(
            'flex flex-col gap-1.5',
            isOpenPopup ? 'overflow-auto' : 'overflow-hidden',
          )}
        >
          {categories.map((item) => (
            <Link
              href={`${ROUTE.RECIPES}?category=${item}&page=1&isVegan=${isVegan}`}
              key={item}
              className={clsx(
                'relative mb-0.5 px-2 pb-1 transition-all duration-200 after:absolute after:left-0 after:top-full after:h-px after:w-0 after:bg-darkBlue after:transition-all after:duration-200',
                category === item
                  ? 'pointer-events-none text-darkBlue after:w-full'
                  : 'hover:text-darkBlue hover:after:w-full',
              )}
              onClick={() => {
                toggleOpenPopup(!isOpenPopup);
              }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
