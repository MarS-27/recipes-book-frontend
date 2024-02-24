"use client";
import clsx from "clsx";
import { type FC, type ReactNode } from "react";

type ButtonProps = {
  classNameModificator?: string;
  children: string | ReactNode;
  variant: "outlined" | "contained" | "text";
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  variant,
  onClick,
  classNameModificator,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={clsx(
        "flex justify-center items-center w-full font-semibold rounded-[0.25rem] py-1.5 px-4 transition-all duration-200",
        variant === "contained"
          ? "bg-mainBlue text-sm16 text-white hover:bg-darkBlue"
          : null,
        variant === "outlined"
          ? "border-2 border-mainBlue text-grayStroke-70 text-sm16 hover:bg-lightBlue hover:border-darkBlue"
          : null,
        variant === "text"
          ? "text-s14 text-mainBlue hover:text-darkBlue"
          : null,
        disabled ? "pointer-events-none" : null,
        classNameModificator
      )}
    >
      {children}
    </button>
  );
};
