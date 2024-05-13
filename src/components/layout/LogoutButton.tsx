'use client';
import { ROUTE } from '@/utils/routes';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { type FC } from 'react';
import { toast } from 'react-toastify';

export const LogoutButton: FC = () => {
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: ROUTE.HOME });
    } catch (err) {
      toast.error('Log out error. Try again.');
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className={clsx(
        'relative transition-all duration-200 hover:scale-125',
        "after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:whitespace-nowrap after:text-xs10 after:opacity-0 after:transition-all after:duration-200 after:content-['Sign_Out'] hover:after:opacity-100",
      )}
    >
      <Image
        width={40}
        height={40}
        src="/images/logout-icon.svg"
        alt="logout"
        className="h-7 w-7 min-w-7 sm:h-10 sm:w-10"
      />
    </button>
  );
};
