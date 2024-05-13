import clsx from 'clsx';
import { type FC } from 'react';

const Loading: FC = async () => {
  return (
    <section className="flex w-full grow items-center justify-center">
      <p
        className={clsx(
          'relative h-[90px] w-[98px] rounded-b-[35%] rounded-t-[15%] bg-mainBlue',
          'after:absolute after:-right-6 after:top-4 after:h-10 after:w-9 after:rounded-r-md after:border-[6px] after:border-mainBlue',
          'before:absolute before:-top-10 before:left-6 before:h-9 before:w-1.5 before:bg-transparent',
          'loader-animation',
        )}
      ></p>
    </section>
  );
};

export default Loading;
