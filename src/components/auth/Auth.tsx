"use client";
import type { TUserLoginInfo } from "@/types/auth";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useState, type FC } from "react";
import { type SubmitHandler, useForm, FieldError } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/Button";
import type { TError } from "@/types/types";
import { Loader } from "../ui/Loader";
import { useRouter } from "next/navigation";
import { FormInput } from "../ui/FormInput";
import { PasswordInput } from "./PasswordInput";

export const Auth: FC = () => {
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

  return (
    <section className="relative max-w-loginContainer m-auto w-full px-6 py-10 bg-mainYellow bg-opacity-[0.3] rounded-md border border-grayStroke-80">
      <div className="text-center border-b border-grayStroke-100 border-opacity-20 pb-5 mb-7">
        <h3 className="mb-2 font-semibold text-md26">
          {isLogin ? "Sign In" : "Create account"}
        </h3>
        <p className="text-sm16 text-grayStroke-70">
          Start creating your recipe book
        </p>
      </div>
      <form onSubmit={handleSubmit(loginFormSubmit)}>
        <div className="flex flex-col justify-center items-stretch gap-6">
          <FormInput
            type="email"
            placeholder="Email Address"
            register={register("email", {
              required: "Email is required!",
            })}
            error={errors.email as FieldError}
          />
          <PasswordInput
            register={register("password", {
              required: "Password is required!",
              minLength: {
                value: 6,
                message: "Password should be at least 6 chars",
              },
            })}
            error={errors.password as FieldError}
          />
          <Button disabled={isSubmitting} type="submit" variant="contained">
            {isSubmitting ? <Loader /> : isLogin ? "Sign In" : "Create account"}
          </Button>
        </div>
      </form>
      <Button
        onClick={() => setIsLogin(!isLogin)}
        variant="text"
        classNameModificator="mt-4"
      >
        {isLogin ? "You don't have an account?" : "Already have an account?"}
      </Button>
    </section>
  );
};
