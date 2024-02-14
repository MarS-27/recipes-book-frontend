import Link from "next/link";
import Image from "next/image";
import { type FC } from "react";

export const Footer: FC = () => {
  const formatDate = new Intl.DateTimeFormat("uk-Ua", { year: "numeric" });

  return (
    <footer className="py-2 w-full max-w-container mx-auto px-4">
      <div className="flex items-center justify-center gap-5 mb-3">
        <Link
          href="https://www.linkedin.com/in/sergii-marchuk/"
          target="_blank"
          className="hover:scale-125 transition-all duration-200"
        >
          <Image
            src="/images/linkedin.svg"
            alt="linkedin"
            width={30}
            height={30}
          />
        </Link>
        <Link
          href="https://github.com/MarS-27"
          target="_blank"
          className="hover:scale-125 transition-all duration-200"
        >
          <Image src="/images/github.svg" alt="github" width={30} height={30} />
        </Link>
      </div>
      <p className="text-s14 text-grayStroke-70 text-center">{`Created by MarS, ${formatDate.format(
        new Date()
      )}`}</p>
    </footer>
  );
};
