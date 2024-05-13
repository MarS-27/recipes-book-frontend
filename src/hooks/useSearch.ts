import { type TRecipe } from '@/types/recipe';
import { type TError } from '@/types/types';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDebounceValue } from './useDebounce';
import axios, { type AxiosResponse, type AxiosError } from 'axios';

const searchCache: Record<string, TRecipe[]> = {
  '': [],
};

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounceValue(searchValue.trim(), 800);
  const [searchedRecipes, setSearchedRecipes] = useState<TRecipe[]>([]);
  const [isOpenSearch, setToggleSearch] = useState(false);
  const [isLoadingSearch, setLoadingSearch] = useState(false);

  const controller = new AbortController();

  const getSearchedRecipes = async () => {
    setLoadingSearch(true);

    if (!searchCache[debouncedValue]) {
      const session = await getSession();
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/search?q=${debouncedValue}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
            signal: controller.signal,
          },
        )
        .then((resp: AxiosResponse<TRecipe[]>) => {
          searchCache[debouncedValue] = resp.data;
          setSearchedRecipes(resp.data);
        })
        .catch((data: AxiosError<TError>) => {
          toast.error(data.response?.data.message);
        });
    } else {
      setSearchedRecipes(searchCache[debouncedValue]);
    }

    setLoadingSearch(false);
  };

  useEffect(() => {
    if (debouncedValue) {
      getSearchedRecipes();
      setToggleSearch(true);
    } else {
      setSearchedRecipes(searchCache['']);
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
