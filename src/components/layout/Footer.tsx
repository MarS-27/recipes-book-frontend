import Link from 'next/link';
import Image from 'next/image';
import { type FC } from 'react';

export const Footer: FC = () => {
  const formatDate = new Intl.DateTimeFormat('uk-Ua', { year: 'numeric' });

  return (
    <footer className="mx-auto w-full max-w-container px-4 py-2">
      <div className="mb-3 flex items-center justify-center gap-5">
        <Link
          href="https://www.linkedin.com/in/sergii-marchuk/"
          target="_blank"
          className="transition-all duration-200 hover:scale-125"
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
          className="transition-all duration-200 hover:scale-125"
        >
          <Image src="/images/github.svg" alt="github" width={30} height={30} />
        </Link>
      </div>
      <p className="text-center text-s14 text-grayStroke-70">{`Created by MarS, ${formatDate.format(
        new Date(),
      )}`}</p>
    </footer>
  );
};
