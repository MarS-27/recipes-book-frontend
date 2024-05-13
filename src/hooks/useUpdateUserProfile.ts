import { type TUpdatedUserProfile, type TUserProfile } from '@/types/auth';
import { type TError, type TMessage } from '@/types/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useUpdateUserProfile = () => {
  const { data: userProfile } = useQuery<TUserProfile>({
    queryKey: ['user-profile'],
  });

  const [isUpdateProfile, toggleUpdateButton] = useState(false);
  const queryClient = useQueryClient();

  const methods = useForm<TUpdatedUserProfile>({
    defaultValues: userProfile,
  });

  const updateUserProfile: SubmitHandler<TUpdatedUserProfile> = async (
    data,
  ) => {
    const session = await getSession();

    const formData = new FormData();
    formData.append('email', data.email);

    formData.append('userName', data.userName);

    if (data.userImage) {
      formData.append('file', data.userImage);
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
        queryClient.invalidateQueries({ queryKey: ['user-profile'] });
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
