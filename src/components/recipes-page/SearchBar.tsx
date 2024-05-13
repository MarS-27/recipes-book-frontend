'use client';
import { type FC } from 'react';
import { useSearch } from '@/hooks/useSearch';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { WarningMessage } from '../ui/WarningMessage';
import { Loader } from '../ui/Loader';
import { IconButton } from '../ui/IconButton';

export const SearchBar: FC = () => {
  const {
    searchValue,
    isLoadingSearch,
    setSearchValue,
    debouncedValue,
    isOpenSearch,
    searchedRecipes,
    setToggleSearch,
  } = useSearch();

  return (
    <div className="relative w-full md:max-w-searchBar">
      <input
        className={clsx(
          'w-full rounded-md border-2 bg-lightYellow p-2 text-s14 font-normal outline-none placeholder:font-light placeholder:text-grayStroke-70 md:text-md20',
          isOpenSearch ? 'border-mainBlue' : 'border-grayStroke-80',
        )}
        type="text"
        placeholder="Search recipe"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setToggleSearch(true)}
        onBlur={() => setTimeout(() => setToggleSearch(false), 300)}
      />
      {!isLoadingSearch ? (
        <IconButton
          iconSrc={!isOpenSearch ? '/images/search.svg' : '/images/close.svg'}
          onClick={() => setToggleSearch(!isOpenSearch)}
          classNameModificator="w-6 h-6 min-w-[24px] absolute top-1/2 right-3 -translate-y-1/2"
        />
      ) : (
        <div className="absolute right-2 top-1/2 ml-auto h-6 w-6 -translate-y-1/2">
          <Loader classNameModificator="border-t-mainBlue" />
        </div>
      )}
      <div
        className={clsx(
          'absolute left-0 top-[105%] z-50 grid max-h-filterBar w-full transition-all duration-200',
          debouncedValue && isOpenSearch
            ? 'grid-rows-[1fr] rounded-md border border-grayStroke-80 bg-pageBg p-2'
            : 'grid-rows-[0fr]',
        )}
      >
        {searchedRecipes.length ? (
          <div className="flex flex-col gap-2 overflow-auto">
            {searchedRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipe/${recipe.id}`}
                onClick={() => setToggleSearch(false)}
                className={
                  'flex items-center gap-2 border-b-2 border-b-grayStroke-80 px-2 pb-2 transition-all duration-200 hover:text-darkBlue'
                }
              >
                <Image
                  src={
                    recipe.titleImgPath
                      ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${recipe.titleImgPath}`
                      : '/images/meal-icon.svg'
                  }
                  className={clsx(
                    'h-searchImg rounded-md',
                    !recipe.titleImgPath ? 'object-center' : 'object-cover',
                  )}
                  width={80}
                  height={60}
                  alt="Recipe title image"
                />
                <p>{recipe.title}</p>
              </Link>
            ))}
          </div>
        ) : (
          <WarningMessage classNameModificator="overflow-hidden">
            Recipes not found!
          </WarningMessage>
        )}
      </div>
    </div>
  );
};
