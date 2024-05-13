import { type TUserProfile } from '@/types/auth';
import { type TError } from '@/types/types';
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export const useUserProfile = () => {
  const [isProfileShow, toggleProfileButton] = useState(false);

  const getUserProfile = async (): Promise<TUserProfile | undefined> => {
    const session = await getSession();

    const result = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      })
      .then((resp: AxiosResponse<TUserProfile>) => resp.data)
      .catch((data: AxiosError<TError>) => signOut({ redirect: true }));

    return result;
  };

  const openUserProfile = () => toggleProfileButton(true);
  const closeUserProfile = () => toggleProfileButton(false);

  return {
    isProfileShow,
    openUserProfile,
    closeUserProfile,
    getUserProfile,
  };
};
