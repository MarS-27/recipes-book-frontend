import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TGetRecipeByIdResult, TRecipe } from "@/types/recipe";
import { TError } from "@/types/types";
import { getServerSession } from "next-auth";

export const getRecipeById = async (
  id: number
): Promise<TGetRecipeByIdResult> => {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        cache: "force-cache",
        next: { tags: ["recipe"] },
      }
    );

    if (!res.ok) {
      const errorData: TError = await res.json();
      throw new Error(errorData.message);
    }

    const data: TRecipe = await res.json();

    return {
      result: data,
    };
  } catch (error: any) {
    return {
      result: undefined,
      error: error?.message,
    };
  }
};
