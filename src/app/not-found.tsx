import { Button } from "@/components/ui/Button";
import { ROUTE } from "@/utils/routes";
import clsx from "clsx";
import Link from "next/link";
import { type FC } from "react";

const NotFound: FC = async () => {
  return (
    <section className="flex flex-col w-full grow justify-center items-center overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="font-black text-[7rem] sm:text-[15rem] leading-none max-sm:translate-x-8">
          4
        </div>
        <div className="relative w-48 sm:mx-8 self-end mb-2 sm:mb-5 max-sm:scale-50">
          <div className="absolute bottom-0 left-0 w-full h-44 rounded-[50%] bg-mainBlue"></div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 overflow-hidden w-48 h-52 rounded-b-[50%]">
            <div
              className={clsx(
                "absolute -bottom-1 left-1/2 -translate-x-1/2 w-36 h-48 rounded-xl border-2 border-mainBlue bg-pageBg",
                "before:absolute before:-top-[0.36rem] before:-right-[0.6rem] before:w-6 before:h-4 before:bg-pageBg before:border-b-2 before:border-b-mainBlue before:rotate-45"
              )}
            >
              <div className="relative mt-9">
                <div className="absolute top-0 left-10 w-16 h-3">
                  <div className="absolute bottom-0 w-3 h-3 rounded-[50%] bg-mainBlue left-0 eye-animation"></div>
                  <div className="absolute bottom-0 w-3 h-3 rounded-[50%] bg-mainBlue right-0 eye-animation"></div>
                </div>
                <div className="absolute top-6 w-4 h-1 rounded-[50%] bg-mainRed left-6"></div>
                <div className="absolute top-6 w-4 h-1 rounded-[50%] bg-mainRed right-6"></div>
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-8 h-1 rounded-sm bg-mainBlue"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="font-black text-[7rem] sm:text-[15rem] leading-none max-sm:-translate-x-9">
          4
        </div>
      </div>

      <div className="text-center my-3">
        Oops. The page you're looking for doesn't exist!
      </div>
      <Link href={ROUTE.RECIPES_START}>
        <Button variant="contained">Back to recipes</Button>
      </Link>
    </section>
  );
};

export default NotFound;
