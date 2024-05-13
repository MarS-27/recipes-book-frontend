import { type TError, type TMessage } from '@/types/types';
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useDeleteUser = () => {
  const [isDeleting, setDeleting] = useState(false);
  const [isOpenDeletingAccept, setOpenDeletingAccept] = useState(false);

  const deleteUser = async () => {
    setOpenDeletingAccept(false);
    setDeleting(true);
    const session = await getSession();

    await axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/delete`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      })
      .then((resp: AxiosResponse<TMessage>) => {
        toast.success(resp.data.message);
        setDeleting(false);
        signOut({ redirect: true });
      })
      .catch((data: AxiosError<TError>) => {
        toast.error(data.response?.data.message);
        setDeleting(false);
      });
  };

  const openDeleteAccept = () => setOpenDeletingAccept(true);

  const closeDeleteAccept = () => setOpenDeletingAccept(false);

  return {
    isDeleting,
    isOpenDeletingAccept,
    deleteUser,
    openDeleteAccept,
    closeDeleteAccept,
  };
};
