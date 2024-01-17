"use client";
import { useEffect, type FC } from "react";
import { getUserProfile } from "@/utils/getUserProfile";
import clsx from "clsx";
import Image from "next/image";

export const UserAccountButton: FC = () => {
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div
      className={clsx(
        "relative hover:scale-125 transition-all duration-200",
        "after:content-['User'] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2  after:text-xs10 after:whitespace-nowrap after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200"
      )}
    >
      <Image
        width={44}
        height={44}
        src="/images/user-icon.svg"
        alt="User"
        className="min-w-11"
      />
    </div>
  );
};
