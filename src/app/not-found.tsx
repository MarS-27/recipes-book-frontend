import { Button } from '@/components/ui/Button';
import { ROUTE } from '@/utils/routes';
import clsx from 'clsx';
import Link from 'next/link';
import { type FC } from 'react';

const NotFound: FC = async () => {
  return (
    <section className="flex w-full grow flex-col items-center justify-center overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="text-[7rem] font-black leading-none max-sm:translate-x-8 sm:text-[15rem]">
          4
        </div>
        <div className="relative mb-2 w-48 self-end max-sm:scale-50 sm:mx-8 sm:mb-5">
          <div className="absolute bottom-0 left-0 h-44 w-full rounded-[50%] bg-mainBlue"></div>
          <div className="absolute bottom-2 left-1/2 h-52 w-48 -translate-x-1/2 overflow-hidden rounded-b-[50%]">
            <div
              className={clsx(
                'absolute -bottom-1 left-1/2 h-48 w-36 -translate-x-1/2 rounded-xl border-2 border-mainBlue bg-pageBg',
                'before:absolute before:-right-[0.6rem] before:-top-[0.36rem] before:h-4 before:w-6 before:rotate-45 before:border-b-2 before:border-b-mainBlue before:bg-pageBg',
              )}
            >
              <div className="relative mt-9">
                <div className="absolute left-10 top-0 h-3 w-16">
                  <div className="eye-animation absolute bottom-0 left-0 h-3 w-3 rounded-[50%] bg-mainBlue"></div>
                  <div className="eye-animation absolute bottom-0 right-0 h-3 w-3 rounded-[50%] bg-mainBlue"></div>
                </div>
                <div className="absolute left-6 top-6 h-1 w-4 rounded-[50%] bg-mainRed"></div>
                <div className="absolute right-6 top-6 h-1 w-4 rounded-[50%] bg-mainRed"></div>
                <div className="absolute left-1/2 top-12 h-1 w-8 -translate-x-1/2 rounded-sm bg-mainBlue"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[7rem] font-black leading-none max-sm:-translate-x-9 sm:text-[15rem]">
          4
        </div>
      </div>

      <div className="my-3 text-center">
        Oops. The page you're looking for doesn't exist!
      </div>
      <Link href={ROUTE.RECIPES_START}>
        <Button variant="contained">Back to recipes</Button>
      </Link>
    </section>
  );
};

export default NotFound;
