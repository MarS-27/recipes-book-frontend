import { TRecipe } from "@/types/recipe";
import { TError } from "@/types/types";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDebounceValue } from "./useDebounce";

const searchCache: Record<string, TRecipe[]> = {
  "": [],
};

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounceValue(searchValue.trim(), 800);
  const [searchedRecipes, setSearchedRecipes] = useState<TRecipe[]>([]);
  const [isOpenSearch, setToggleSearch] = useState(false);
  const [isLoadingSearch, setLoadingSearch] = useState(false);

  const controller = new AbortController();

  const getSearchedRecipes = async () => {
    setLoadingSearch(true);

    try {
      if (!searchCache[debouncedValue]) {
        const session = await getSession();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/search?q=${debouncedValue}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.token}`,
            },
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          const errorData: TError = await res.json();
          throw new Error(errorData.message);
        }

        const data: TRecipe[] = await res.json();

        searchCache[debouncedValue] = data;
        setSearchedRecipes(data);
      } else {
        setSearchedRecipes(searchCache[debouncedValue]);
      }
    } catch (error: any) {
      toast.error(error);
    }

    setLoadingSearch(false);
  };

  useEffect(() => {
    if (debouncedValue) {
      getSearchedRecipes();
      setToggleSearch(true);
    } else {
      setSearchedRecipes(searchCache[""]);
    }

    return () => controller.abort();
  }, [debouncedValue]);

  return {
    searchValue,
    isLoadingSearch,
    setSearchValue,
    debouncedValue,
    searchedRecipes,
    isOpenSearch,
    setToggleSearch,
  };
};
