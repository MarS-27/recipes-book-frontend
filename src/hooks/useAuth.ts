import { type TUserLoginInfo } from "@/types/auth";
import { type TError } from "@/types/types";
import axios, { type AxiosResponse, type AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TUserLoginInfo>();

  const { refresh } = useRouter();

  const loginFormSubmit: SubmitHandler<TUserLoginInfo> = async (
    credentials
  ) => {
    if (isLogin) {
      const res = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });

      if (res?.ok) {
        reset();
        refresh();
      } else {
        toast.error("Wrong credentials");
      }
    } else {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/registration`,
          credentials
        )
        .then((resp: AxiosResponse<{ token: string }>) => {
          if (resp.data.token) {
            toast.success("Registration success.");
            setIsLogin(!isLogin);
          }
        })
        .catch((data: AxiosError<TError>) =>
          toast.error(data.response?.data?.message)
        );
    }
  };

  return {
    isLogin,
    setIsLogin,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    loginFormSubmit,
  };
};
