"use client";
import { useSearch } from "@/hooks/useSearch";
import clsx from "clsx";
import Link from "next/link";
import { type FC } from "react";

export const SearchBar: FC = () => {
  const {
    searchValue,
    setSearchValue,
    debouncedValue,
    isOpenSearch,
    searchedRecipes,
    setToggleSearch,
  } = useSearch();

  return (
    <div className="relative w-full max-w-searchBar">
      <input
        className={clsx(
          "w-full p-2 sm:text-md26 text-md20 font-normal bg-lightYellow rounded-md border-2 placeholder:text-grayStroke-70 placeholder:font-light outline-none",
          isOpenSearch ? "border-mainBLue" : "border-grayStroke-80"
        )}
        type="text"
        placeholder="Search recipe"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setToggleSearch(true)}
        onBlur={() => setTimeout(() => setToggleSearch(false), 300)}
      />
      <img
        src={!isOpenSearch ? "/images/search.svg" : "/images/close.svg"}
        alt="search icon"
        className="w-7 h-7 min-w-[28px] ml-auto cursor-pointer md:absolute md:top-1/2 md:right-2 md:-translate-y-1/2"
        onClick={() => setToggleSearch(!isOpenSearch)}
      />
      <div
        className={clsx(
          "w-full absolute top-[105%] left-0 grid transition-all duration-200 max-h-filterBar",
          debouncedValue && isOpenSearch && searchedRecipes?.length
            ? "p-2 grid-rows-[1fr] bg-pageBg rounded-md border border-grayStroke-80"
            : "grid-rows-[0fr]"
        )}
      >
        <div className="flex flex-col gap-2 overflow-hidden">
          {searchedRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipe/${recipe.id}`}
              onClick={() => setToggleSearch(false)}
              className={
                "pb-2 px-2 relative transition-all duration-200 border-b-2 border-b-grayStroke-80 hover:text-darkBlue"
              }
            >
              {recipe.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
