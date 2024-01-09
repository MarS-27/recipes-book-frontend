import { TRecipe } from "@/types/recipe";
import { TError } from "@/types/types";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useSearch = () => {
  const [searchedRecipes, setSearchedRecipes] = useState<TRecipe[]>([]);
  const [debouncedValue, setDebouncedSearch] = useState("");
  const [isOpenSearch, setToggleSearch] = useState(false);

  const getSearchedRecipes = async () => {
    const session = await getSession();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/search?q=${debouncedValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          next: { tags: ["searched-recipes"] },
        }
      );

      if (!res.ok) {
        const errorData: TError = await res.json();
        throw new Error(errorData.message);
      }

      const data: TRecipe[] = await res.json();

      setSearchedRecipes(data);
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      getSearchedRecipes();
      setToggleSearch(true);
    }
  }, [debouncedValue]);

  return {
    searchedRecipes,
    debouncedValue,
    isOpenSearch,
    setToggleSearch,
    setDebouncedSearch,
    getSearchedRecipes,
  };
};
