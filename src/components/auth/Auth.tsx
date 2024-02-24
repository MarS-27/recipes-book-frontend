"use client";
import { useAuth } from "@/hooks/useAuth";
import { type FC } from "react";
import { type FieldError } from "react-hook-form";
import { Button } from "../ui/Button";
import { FormInput } from "../ui/FormInput";
import { Loader } from "../ui/Loader";
import { PasswordInput } from "./PasswordInput";

export const Auth: FC = () => {
  const {
    isLogin,
    setIsLogin,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    loginFormSubmit,
  } = useAuth();

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
            {isSubmitting ? (
              <Loader classNameModificator="border-t-white" />
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create account"
            )}
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
