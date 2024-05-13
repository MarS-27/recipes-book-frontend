import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import clsx from 'clsx';
import { getServerSession } from 'next-auth';
import { Pacifico } from 'next/font/google';
import Image from 'next/image';
import { type FC } from 'react';
import { LogoutButton } from './LogoutButton';
import { AddRecipeButton } from './AddRecipeButton';
import { UserProfileButton } from './UserProfileButton';
import Link from 'next/link';
import { ROUTE } from '@/utils/routes';

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

export const Header: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 w-full bg-pageBg px-4 pb-6 pt-5 sm:pt-2">
      <div
        className={clsx(
          'mx-auto flex w-full max-w-container items-center',
          session?.user.token ? 'justify-between' : 'justify-center',
        )}
      >
        <Link
          href={ROUTE.RECIPES_START}
          className={clsx(
            pacifico.className,
            'relative flex items-center gap-5',
            !session?.user.token
              ? 'pointer-events-none'
              : "cursor-pointer max-sm:after:absolute max-sm:after:-top-5 max-sm:after:left-0 max-sm:after:whitespace-nowrap max-sm:after:text-s14 max-sm:after:content-['Personal_Recipe_Book']",
          )}
        >
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="h-10 w-10 min-w-10"
          />
          <h1
            className={clsx(
              'text-md24 font-medium tracking-wider sm:text-l32 md:text-xL40',
              pacifico.className,
              !session?.user.token ? 'block' : 'hidden sm:block',
            )}
          >
            Personal Recipe Book
          </h1>
        </Link>
        {session?.user.token ? (
          <div className="flex items-center gap-3 ">
            <UserProfileButton />
            <AddRecipeButton />
            <LogoutButton />
          </div>
        ) : null}
      </div>
    </header>
  );
};
