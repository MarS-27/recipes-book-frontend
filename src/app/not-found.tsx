import clsx from "clsx";
import Link from "next/link";
import { type FC } from "react";

const NotFound: FC = async () => {
  return (
    <section className="flex flex-col w-full grow justify-center items-center">
      <div className="flex justify-between items-center">
        <div className="font-black text-[7rem] sm:text-[15rem] leading-none">
          4
        </div>
        <div className="relative w-24 sm:w-48 mx-8 self-end mb-5">
          <div className="absolute bottom-0 left-0 w-full h-20 sm:h-44 rounded-[50%] bg-mainBlue"></div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 overflow-hidden w-24 sm:w-48 h-28 sm:h-52 rounded-b-[50%]">
            <div
              className={clsx(
                "absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 sm:w-36 h-24 sm:h-48 rounded-xl border-2 border-mainBlue bg-pageBg",
                "before:absolute before:-top-[0.36rem] before:-right-[0.6rem] before:w-6 before:h-4 before:bg-pageBg before:border-b-2 before:border-b-mainBlue before:rotate-45"
              )}
            >
              <div className="relative mt-5 sm:mt-9">
                <div className="absolute top-0 left-5 sm:left-10 w-8 sm:w-16 h-1.5 sm:h-3">
                  <div className="absolute bottom-0 w-1.5 sm:w-3 h-1.5 sm:h-3 rounded-[50%] bg-mainBlue left-0 eye-animation"></div>
                  <div className="absolute bottom-0 w-1.5 sm:w-3 h-1.5 sm:h-3 rounded-[50%] bg-mainBlue right-0 eye-animation"></div>
                </div>
                <div className="absolute top-6 w-4 h-1 rounded-[50%] bg-mainRed left-6"></div>
                <div className="absolute top-6 w-4 h-1 rounded-[50%] bg-mainRed right-6"></div>
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-8 h-1 rounded-sm bg-mainBlue"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="font-black text-[7rem] sm:text-[15rem] leading-none">
          4
        </div>
      </div>

      <div className="text">
        Oops. The page you're looking for doesn't exist.
      </div>
      <a className="button" href="#">
        Back Home
      </a>
    </section>
  );
};

export default NotFound;
