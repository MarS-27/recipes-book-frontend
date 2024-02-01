import { TGetRecipeInForm } from "@/types/recipe";
import { TError, TMessage } from "@/types/types";
import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

export const createRecipe: SubmitHandler<TGetRecipeInForm> = async (data) => {
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
  formData.append("titleImgPath", JSON.stringify(titleImgPath));
  formData.append("description", description);
  formData.append("category", category);
  formData.append("ingredients", JSON.stringify(ingredients));
  formData.append("stages", JSON.stringify(stages));
  recipeFiles?.forEach((file) => formData.append("files", file));

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const errorData: TError = await res.json();
      throw new Error(errorData.message);
    }

    const data: TMessage = await res.json();

    toast.success(data.message);
  } catch (error: any) {
    toast.error(error.message);
  }
};
