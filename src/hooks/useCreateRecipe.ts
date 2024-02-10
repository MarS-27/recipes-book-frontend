import { type TGetRecipeInForm } from "@/types/recipe";
import { type TError, type TMessage } from "@/types/types";
import { ROUTE } from "@/utils/routes";
import { useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  const createRecipe: SubmitHandler<TGetRecipeInForm> = async (data) => {
    const session = await getSession();

    const {
      title,
      titleImgPath,
      description,
      category,
      ingredients,
      stages,
      recipeFiles,
    } = data;

    const formData = new FormData();
    formData.append("title", title);

    if (titleImgPath !== null) {
      formData.append("titleImgPath", titleImgPath);
    }

    formData.append("description", description);
    formData.append("category", category);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("stages", JSON.stringify(stages));
    recipeFiles?.forEach((file) => formData.append("files", file));

    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/create`, formData, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      })
      .then((resp: AxiosResponse<TMessage>) => {
        queryClient.invalidateQueries({ queryKey: ["recipes"] });
        toast.success(resp.data.message);
        redirect(ROUTE.RECIPES_START);
      })
      .catch((data: AxiosError<TError>) => {
        toast.error(data.response?.data.message);
      });
  };

  return {
    createRecipe,
  };
};
