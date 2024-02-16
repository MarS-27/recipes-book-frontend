import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { RecipeCategories, TRecipe } from "@/types/recipe";
import { TError, TPaginatedResponse, TPaginatedResult } from "@/types/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getServerSession } from "next-auth";

export const getRecipes = async (
  category: RecipeCategories,
  page: number
): Promise<TPaginatedResult<TRecipe>> => {
  const session = await getServerSession(authOptions);
  const limit = 6;
  const skip = (page - 1) * limit;

  const result = await axios
    .get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/paginated-recipes?category=${category}&limit=${limit}&skip=${skip}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    )
    .then((resp: AxiosResponse<TPaginatedResponse<TRecipe>>) => {
      const pagesCount = Math.ceil(resp.data.total / limit);

      return {
        results: resp.data.results,
        pageNum: page,
        pagesCount,
      };
    })
    .catch((data: AxiosError<TError>) => {
      return {
        results: [],
        pageNum: page,
        error: data.response?.data.message,
      };
    });

  return result;
};
