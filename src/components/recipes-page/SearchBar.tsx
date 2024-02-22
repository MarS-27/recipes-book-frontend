"use client";
import { type FC } from "react";
import { useSearch } from "@/hooks/useSearch";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { WarningMessage } from "../ui/WarningMessage";
import { Loader } from "../ui/Loader";

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
          "w-full p-2 md:text-md20 text-s14 font-normal bg-lightYellow rounded-md border-2 placeholder:text-grayStroke-70 placeholder:font-light outline-none",
          isOpenSearch ? "border-mainBlue" : "border-grayStroke-80"
        )}
        type="text"
        placeholder="Search recipe"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setToggleSearch(true)}
        onBlur={() => setTimeout(() => setToggleSearch(false), 300)}
      />
      {!isLoadingSearch ? (
        <img
          src={!isOpenSearch ? "/images/search.svg" : "/images/close.svg"}
          alt="search icon"
          className="w-7 h-7 min-w-[28px] ml-auto cursor-pointer absolute top-1/2 right-2 -translate-y-1/2"
          onClick={() => setToggleSearch(!isOpenSearch)}
        />
      ) : (
        <div className="absolute w-6 h-6 ml-auto top-1/2 right-2 -translate-y-1/2">
          <Loader classNameModificator="border-t-mainBlue" />
        </div>
      )}
      <div
        className={clsx(
          "w-full absolute top-[105%] left-0 grid transition-all duration-200 max-h-filterBar z-10",
          debouncedValue && isOpenSearch
            ? "p-2 grid-rows-[1fr] bg-pageBg rounded-md border border-grayStroke-80"
            : "grid-rows-[0fr]"
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
                  "flex items-center gap-2 pb-2 px-2 transition-all duration-200 border-b-2 border-b-grayStroke-80 hover:text-darkBlue"
                }
              >
                <Image
                  src={
                    recipe.titleImgPath
                      ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${recipe.titleImgPath}`
                      : "/images/meal-icon.svg"
                  }
                  className={clsx(
                    "rounded-md h-searchImg",
                    !recipe.titleImgPath ? "object-center" : "object-cover"
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
