"use client";
import type { TUserLoginInfo } from "@/types/auth";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useState, type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/Button";
import type { TError } from "@/types/types";
import { Loader } from "../ui/Loader";
import { useRouter } from "next/navigation";

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
          <label className="relative">
            <input
              className={clsx(
                "w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20",
                errors.email ? "border-mainRed outline-mainRed" : null
              )}
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required!",
              })}
            />
            {errors.email ? (
              <span className="absolute left-1 -top-3 text-mainRed text-xs10">
                * {errors.email.message}
              </span>
            ) : null}
          </label>
          <label className="relative">
            <input
              className={clsx(
                "w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20",
                errors.password ? "border-mainRed outline-mainRed" : null
              )}
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 chars",
                },
              })}
            />
            {errors.password ? (
              <span className="absolute left-1 -top-3 text-mainRed text-xs10">
                * {errors.password.message}
              </span>
            ) : null}
          </label>
          <Button
            disabled={isSubmitting}
            type="submit"
            classNameModificator="bg-mainBlue text-white text-sm14 hover:bg-darkBlue transition-all duration-200"
          >
            {isSubmitting ? <Loader /> : isLogin ? "Sign In" : "Create account"}
          </Button>
        </div>
      </form>
      <Button
        onClick={() => setIsLogin(!isLogin)}
        classNameModificator="text-xs14 text-mainBLue mt-4 hover:text-darkBlue transition-all duration-20"
      >
        {isLogin ? "You don't have an account?" : "Already have an account?"}
      </Button>
    </section>
  );
};
