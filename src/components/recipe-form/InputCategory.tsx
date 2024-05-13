import { type TGetRecipeInForm, RecipeCategories } from '@/types/recipe';
import clsx from 'clsx';
import { useState, type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

export const InputCategory: FC = () => {
  const [isOpenSelect, setOpenSelect] = useState(false);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TGetRecipeInForm>();

  const { category } = watch();

  const categories = Object.values(RecipeCategories).filter(
    (value) => value !== RecipeCategories.All,
  );
  return (
    <div className="relative w-full text-s14 font-medium">
      <div
        className={clsx(
          'flex items-center justify-between rounded-md bg-white px-3.5 py-1.5',
          !errors.category && isOpenSelect
            ? 'border-2 border-grayStroke-70'
            : null,
          !errors.category && !isOpenSelect
            ? 'border border-grayStroke-100 border-opacity-20'
            : null,
          errors.category && isOpenSelect ? 'border-2 border-mainRed' : null,
        )}
        onClick={() => {
          setOpenSelect(!isOpenSelect);
        }}
      >
        <p className={clsx(category ? 'text-black' : 'text-grayStroke-70')}>
          {category ? category : 'Recipe category'}
        </p>
        <Image
          width={20}
          height={20}
          className={clsx(
            'min-w-5 transition-all duration-200',
            isOpenSelect ? 'rotate-180' : null,
          )}
          src="/images/select-arrow.svg"
          alt="Open select categories"
        />
      </div>
      {errors.category && !category ? (
        <span className="absolute -top-3 left-1 text-xs10 text-mainRed">
          * {errors.category.message}
        </span>
      ) : null}
      <input
        className="hidden"
        {...register('category', {
          required: 'Category is required!',
        })}
      />
      <div
        className={clsx(
          'absolute left-0 top-[105%] z-10 grid max-h-52 w-full transition-all duration-200',
          isOpenSelect
            ? 'grid-rows-[1fr] rounded-md border border-grayStroke-80 bg-pageBg p-2'
            : 'grid-rows-[0fr]',
        )}
      >
        <ul
          className={clsx(
            'flex flex-col gap-1',
            isOpenSelect ? 'overflow-auto' : 'overflow-hidden',
          )}
        >
          {categories.map((item) => (
            <li
              key={item}
              className={clsx(
                'relative px-2 py-1 transition-all duration-200 ',
                category === item
                  ? 'pointer-events-none bg-lightBlue text-darkBlue'
                  : 'cursor-pointer hover:bg-lightBlue hover:text-darkBlue',
              )}
              onClick={() => {
                setValue('category', item);
                setOpenSelect(!isOpenSelect);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
