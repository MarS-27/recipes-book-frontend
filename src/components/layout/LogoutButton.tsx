"use client";
import { ROUTE } from "@/utils/routes";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { type FC } from "react";
import { toast } from "react-toastify";

export const LogoutButton: FC = () => {
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: ROUTE.HOME });
    } catch (err) {
      toast.error("Log out error. Try again.");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className={clsx(
        "relative hover:scale-125 transition-all duration-200",
        "after:content-['Sign_Out'] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:text-xs10 after:whitespace-nowrap after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200"
      )}
    >
      <Image
        width={40}
        height={40}
        src="/images/logout-icon.svg"
        alt="logout"
        className="w-7 h-7 sm:w-10 sm:h-10 min-w-7"
      />
    </button>
  );
};
