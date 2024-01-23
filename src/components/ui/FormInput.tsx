import clsx from "clsx";
import { type FC } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TFormInputProps = {
  error?: FieldError;
  register: UseFormRegisterReturn<string>;
  type: string;
  placeholder?: string;
  disabled?: boolean;
};

export const FormInput: FC<TFormInputProps> = ({
  error,
  register,
  type,
  placeholder,
  disabled = false,
}) => {
  return (
    <label className="relative">
      <input
        className={clsx(
          "w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20",
          error ? "border-mainRed outline-mainRed" : null
        )}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register}
      />
      {error ? (
        <span className="absolute left-1 -top-3 text-mainRed text-xs10">
          * {error.message}
        </span>
      ) : null}
    </label>
  );
};
