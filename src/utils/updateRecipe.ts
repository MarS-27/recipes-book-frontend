import { type TGetRecipeInForm } from "@/types/recipe";
import { type TError, type TMessage } from "@/types/types";
import { QueryClient } from "@tanstack/react-query";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { ROUTE } from "./routes";

export const updateRecipe: SubmitHandler<TGetRecipeInForm> = async (data) => {
  const session = await getSession();
  const queryClient = new QueryClient();

  const {
    title,
    titleImgPath,
    description,
    category,
    ingredients,
    stages,
    recipeFiles,
    id,
  } = data;
  console.log(stages);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("titleImgPath", JSON.stringify(titleImgPath));
  formData.append("description", description);
  formData.append("category", category);
  formData.append("ingredients", JSON.stringify(ingredients));
  formData.append("stages", JSON.stringify(stages));
  recipeFiles?.forEach((file) => formData.append("files", file));

  await axios
    .put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/update/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    )
    .then((resp: AxiosResponse<TMessage>) => {
      queryClient.invalidateQueries({ queryKey: ["recipe", `${id}`] });
      toast.success(resp.data.message);
      redirect(`${ROUTE.RECIPE}${id}`);
    })
    .catch((data: AxiosError<TError>) => {
      toast.error(data.response?.data.message);
    });
};
