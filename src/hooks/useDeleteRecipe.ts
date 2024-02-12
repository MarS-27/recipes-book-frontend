import { type TError, type TMessage } from "@/types/types";
import { ROUTE } from "@/utils/routes";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const useDeleteRecipe = (recipeId: string) => {
  const { push, refresh } = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteRecipe = async () => {
    setIsDeleting(true);
    const session = await getSession();

    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/delete/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      )
      .then((resp: AxiosResponse<TMessage>) => {
        toast.success(resp.data.message);
        push(ROUTE.RECIPES_START);
        refresh();
        setIsDeleting(false);
      })
      .catch((data: AxiosError<TError>) => {
        toast.error(data.response?.data.message);
        setIsDeleting(false);
      });
  };

  return {
    isDeleting,
    deleteRecipe,
  };
};
