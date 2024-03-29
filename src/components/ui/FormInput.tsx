import clsx from "clsx";
import { type FC, KeyboardEvent } from "react";
import { type FieldError, UseFormRegisterReturn } from "react-hook-form";

type TFormInputProps = {
  error?: FieldError;
  register: UseFormRegisterReturn<string>;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  onEnterKeyDown?: () => void;
};

export const FormInput: FC<TFormInputProps> = ({
  error,
  register,
  type,
  placeholder,
  disabled = false,
  onEnterKeyDown,
}) => {
  const handleEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (onEnterKeyDown) onEnterKeyDown();
    }
  };

  return (
    <label className="relative w-full">
      <input
        className={clsx(
          "w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20",
          error ? "border-mainRed outline-mainRed" : null
        )}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={handleEnterDown}
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
