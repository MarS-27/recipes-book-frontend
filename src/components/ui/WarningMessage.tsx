import clsx from "clsx";
import type { FC, ReactNode } from "react";

type WarningMessageProps = {
  children: ReactNode;
  classNameModificator?: string;
};

export const WarningMessage: FC<WarningMessageProps> = ({
  children,
  classNameModificator,
}) => {
  return (
    <div className={clsx("text-md24 font-semibold", classNameModificator)}>
      {children}
    </div>
  );
};
