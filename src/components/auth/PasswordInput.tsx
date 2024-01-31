import { TUserLoginInfo } from "@/types/auth";
import clsx from "clsx";
import { useState, type FC } from "react";
import {
  useFormContext,
  type FieldError,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { IconButton } from "../ui/IconButton";

type TPasswordInputProps = {
  error?: FieldError;
  register: UseFormRegisterReturn<string>;
};

export const PasswordInput: FC<TPasswordInputProps> = ({ register, error }) => {
  const [isPasswordVisible, togglePasswordVisible] = useState<boolean>(false);

  return (
    <label className="relative w-full">
      <input
        className={clsx(
          "w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20",
          error ? "border-mainRed outline-mainRed" : null
        )}
        type={!isPasswordVisible ? "password" : "text"}
        placeholder="Password"
        {...register}
      />
      {error ? (
        <span className="absolute left-1 -top-3 text-mainRed text-xs10">
          * {error.message}
        </span>
      ) : null}
      <IconButton
        iconSrc={
          !isPasswordVisible ? "/images/eye-open.svg" : "/images/eye-close.svg"
        }
        classNameModificator="w-5 h-5 min-w-5 absolute right-4 top-1/2 -translate-y-1/2"
        onClick={() => togglePasswordVisible(!isPasswordVisible)}
      />
    </label>
  );
};
