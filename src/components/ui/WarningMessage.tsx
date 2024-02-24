import clsx from "clsx";
import { type FC, type ReactNode } from "react";

type WarningMessageProps = {
  children: ReactNode;
  classNameModificator?: string;
};

export const WarningMessage: FC<WarningMessageProps> = ({
  children,
  classNameModificator,
}) => {
  return (
    <div
      className={clsx(
        "text-sm16 sm:text-md24 font-semibold",
        classNameModificator
      )}
    >
      {children}
    </div>
  );
};
