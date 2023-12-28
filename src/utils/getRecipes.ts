import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { RecipeCategories, TRecipe } from "@/types/recipe";
import { TError, TPaginatedResponse, TPaginatedResult } from "@/types/types";
import { getServerSession } from "next-auth";

export const getRecipes = async (
  category: RecipeCategories,
  page: number,
  limit: number
): Promise<TPaginatedResult<TRecipe>> => {
  const session = await getServerSession(authOptions);

  try {
    const skip = (page - 1) * limit;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/paginated-recipes?category=${category}&limit=${limit}&skip=${skip}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        next: { tags: ["recipes"] },
      }
    );

    if (!res.ok) {
      const errorData: TError = await res.json();
      throw new Error(errorData.message);
    }

    const data: TPaginatedResponse<TRecipe> = await res.json();
    const pagesCount = Math.ceil(data.total / limit);

    return {
      results: data.results,
      pageNum: page,
      pagesCount,
    };
  } catch (error: any) {
    return {
      results: [],
      pageNum: page,
      error: error?.message,
    };
  }
};
