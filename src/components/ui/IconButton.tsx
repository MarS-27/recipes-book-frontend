import { type FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

type TIconButtonProps = {
  iconSrc: string;
  classNameModificator?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const IconButton: FC<TIconButtonProps> = ({
  iconSrc,
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
        'transition-all duration-200 hover:scale-125',
        disabled ? 'pointer-events-none' : null,
        classNameModificator,
      )}
    >
      <Image width={100} height={100} src={iconSrc} alt="Button image" />
    </button>
  );
};
