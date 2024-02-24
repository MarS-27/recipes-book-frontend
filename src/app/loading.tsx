import clsx from "clsx";
import { type FC } from "react";

const Loading: FC = async () => {
  return (
    <div className="flex w-full grow justify-center items-center">
      <p
        className={clsx(
          "w-[98px] h-[90px] relative bg-mainBlue rounded-t-[15%] rounded-b-[35%]",
          "after:absolute after:-right-6 after:top-4 after:border-[6px] after:border-mainBlue after:w-9 after:h-10 after:rounded-r-md",
          "before:absolute before:w-1.5 before:h-9 before:bg-transparent before:-top-10 before:left-6",
          "loader-animation"
        )}
      ></p>
    </div>
  );
};

export default Loading;
