import { type TGetRecipeInForm, type TRecipe } from '@/types/recipe';
import { type TError, type TMessage } from '@/types/types';
import { recipeFormDataCreate } from '@/utils/recipeFormDataCreate';
import { ROUTE } from '@/utils/routes';
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useRecipeForm = (updatedRecipeData: TRecipe | undefined) => {
  const { push, back, refresh } = useRouter();

  const defaultValues = updatedRecipeData
    ? updatedRecipeData
    : {
        titleImgPath: '',
        ingredients: [''],
        stages: [
          {
            stageNumber: '1',
            description: '',
            imgPath: '',
          },
        ],
      };

  const methods = useForm<TGetRecipeInForm>({ defaultValues });

  const createRecipe: SubmitHandler<TGetRecipeInForm> = async (data) => {
    const session = await getSession();

    const formData = recipeFormDataCreate(data);

    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/create`, formData, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      })
      .then((resp: AxiosResponse<TMessage>) => {
        toast.success(resp.data.message);
        push(ROUTE.RECIPES_START);
        refresh();
      })
      .catch((data: AxiosError<TError>) => {
        toast.error(data.response?.data.message);
      });
  };

  const updateRecipe: SubmitHandler<TGetRecipeInForm> = async (data) => {
    const session = await getSession();

    const formData = recipeFormDataCreate(data);

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/update/${data.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      )
      .then((resp: AxiosResponse<TMessage>) => {
        toast.success(resp.data.message);
        back();
        refresh();
      })
      .catch((data: AxiosError<TError>) => {
        toast.error(data.response?.data.message);
      });
  };

  return {
    methods,
    createRecipe,
    updateRecipe,
  };
};
