import clsx from 'clsx';
import { type FC } from 'react';

type LoaderProps = {
  classNameModificator?: string;
};

export const Loader: FC<LoaderProps> = ({ classNameModificator }) => {
  return (
    <span
      className={clsx(
        'inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-t-[3px] border-transparent',
        classNameModificator,
      )}
    />
  );
};
