"use client";
import { useDebounceValue } from "@/hooks/useDebounce";
import { useSearch } from "@/hooks/useSearch";
import clsx from "clsx";
import Link from "next/link";
import {
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";

export const SearchBar: FC = () => {
  const { isOpenSearch, searchedRecipes, setDebouncedSearch, setToggleSearch } =
    useSearch();
  //   const { pathname, query } = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounceValue(searchValue.trim(), 500);
  console.log(searchedRecipes);

  useEffect(() => {
    setDebouncedSearch(debouncedValue);
  }, [debouncedValue]);

  //   useEffect(() => {
  //     setSearchValue('');
  //   }, [pathname, query]);

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
      {debouncedValue && isOpenSearch && searchedRecipes?.length ? (
        <div className="w-full p-2 absolute top-[105%] left-0 flex flex-col gap-2 bg-pageBg rounded-md border border-grayStroke-80 max-h-filterBar">
          {searchedRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipe/${recipe.id}`}
              onClick={() => setToggleSearch(false)}
            >
              {recipe.title}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};
