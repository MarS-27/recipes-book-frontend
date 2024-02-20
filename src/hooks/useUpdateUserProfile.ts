import { TUpdatedUserProfile, TUserProfile } from "@/types/auth";
import { type TGetRecipeInForm, type TRecipe } from "@/types/recipe";
import { type TError, type TMessage } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

export const useUpdateUserProfile = (userProfileData: TUserProfile) => {
  const [isUpdateProfile, toggleUpdateButton] = useState(false);
  const queryClient = useQueryClient();
  const { data: session, update } = useSession();
  // const { push, back, refresh } = useRouter();

  const methods = useForm<TUpdatedUserProfile>({
    defaultValues: userProfileData,
  });

  const updateUserProfile: SubmitHandler<TUpdatedUserProfile> = async (
    data
  ) => {
    // const session = await getSession();

    const formData = new FormData();
    formData.append("email", data.email);

    if (data.imgPath !== null) {
      formData.append("imgPath", data.imgPath);
    }

    formData.append("userName", data.userName);

    if (data.userImage) {
      formData.append("file", data.userImage);
    }

    await axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      })
      .then((resp: AxiosResponse<TMessage>) => {
        toast.success(resp.data.message);
        toggleUpdateButton(false);
        update(data);
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      })
      .catch((data: AxiosError<TError>) => {
        toast.error(data.response?.data.message);
      });
  };

  return {
    methods,
    updateUserProfile,
    isUpdateProfile,
    toggleUpdateButton,
  };
};
