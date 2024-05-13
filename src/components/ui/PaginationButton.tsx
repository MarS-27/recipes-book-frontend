import { ROUTE } from '@/utils/routes';
import clsx from 'clsx';
import Link from 'next/link';
import { type FC } from 'react';

type BtnProps = {
  variant: 'next' | 'prev';
  activePageNumber: number;
  disabled: boolean;
};

export const PaginationButton: FC<BtnProps> = ({
  variant,
  activePageNumber,
  disabled,
}) => {
  const page = variant === 'prev' ? activePageNumber - 1 : activePageNumber + 1;

  return (
    <Link
      href={`${ROUTE.RECIPES}?category=All&page=${page}`}
      className={clsx(
        'flex h-8 w-8 items-center justify-center rounded transition-all duration-300',
        disabled ? 'pointer-events-none' : 'hover:bg-mainBlue',
      )}
    >
      <p
        className={clsx(
          'text-md24 font-semibold',
          disabled ? 'text-grayStroke-60' : 'text-black',
        )}
      >
        {variant === 'prev' ? '<' : '>'}
      </p>
    </Link>
  );
};
