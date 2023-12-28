"use client";
import { ROUTE } from "@/utils/routes";
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
      className="hover:scale-125 transition-all duration-200"
    >
      <Image
        width={40}
        height={40}
        src="/images/logout-icon.svg"
        alt="logout"
      />
    </button>
  );
};
