import { type FC } from "react";
import Image from "next/image";
import clsx from "clsx";

type DeleteButtonProps = {
  classNameModificator?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const DeleteButton: FC<DeleteButtonProps> = ({
  classNameModificator,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={clsx(
        "hover:scale-125 transition-all duration-200",
        classNameModificator
      )}
    >
      <Image
        width={100}
        height={100}
        src="/images/delete-icon.svg"
        alt="Delete image"
      />
    </button>
  );
};
