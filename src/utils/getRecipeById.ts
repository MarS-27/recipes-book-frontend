import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TGetRecipeByIdResult, TRecipe } from "@/types/recipe";
import { TError } from "@/types/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getServerSession } from "next-auth";

export const getRecipeById = async (
  id: number
): Promise<TGetRecipeByIdResult> => {
  const session = await getServerSession(authOptions);

  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    })
    .then((resp: AxiosResponse<TRecipe>) => {
      return {
        result: resp.data,
      };
    })
    .catch((data: AxiosError<TError>) => {
      return {
        result: undefined,
        error: data.response?.data.message,
      };
    });

  return result;
};
