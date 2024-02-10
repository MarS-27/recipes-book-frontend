import clsx from "clsx";
import { type FC } from "react";

type LoaderProps = {
  classNameModificator?: string;
};

export const Loader: FC<LoaderProps> = ({ classNameModificator }) => {
  return (
    <span
      className={clsx(
        "inline-block w-6 h-6 border-[3px] rounded-full border-transparent border-t-[3px] animate-spin",
        classNameModificator
      )}
    />
  );
};
