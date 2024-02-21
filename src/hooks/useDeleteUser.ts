import { type TError, type TMessage } from "@/types/types";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const useDeleteUser = () => {
  const [userDeletingState, setUserDeletingState] = useState({
    isLoading: false,
    isOpenAccept: false,
  });

  const deleteUser = async () => {
    setUserDeletingState({ ...userDeletingState, isLoading: true });
    const session = await getSession();

    await axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/delete`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      })
      .then((resp: AxiosResponse<TMessage>) => {
        toast.success(resp.data.message);
        setUserDeletingState({ ...userDeletingState, isLoading: false });
        signOut({ redirect: true });
      })
      .catch((data: AxiosError<TError>) => {
        toast.error(data.response?.data.message);
        setUserDeletingState({ ...userDeletingState, isLoading: false });
      });
  };

  const openDeleteAccept = () =>
    setUserDeletingState({ ...userDeletingState, isOpenAccept: true });

  const closeDeleteAccept = () =>
    setUserDeletingState({ ...userDeletingState, isOpenAccept: false });

  return {
    userDeletingState,
    deleteUser,
    openDeleteAccept,
    closeDeleteAccept,
  };
};
