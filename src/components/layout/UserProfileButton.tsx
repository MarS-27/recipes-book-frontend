"use client";
import { useEffect, type FC, useState } from "react";
import { getUserProfile } from "@/utils/getUserProfile";
import clsx from "clsx";
import Image from "next/image";
import { UserProfileModal } from "../user-profile/UserProfileModal";

type TUserProfileButton = {
  userImgPath: string | undefined;
};

export const UserProfileButton: FC<TUserProfileButton> = ({ userImgPath }) => {
  const [isProfileShow, toggleProfileButton] = useState(false);

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <button
        type="button"
        className={clsx(
          "relative hover:scale-125 transition-all duration-200",
          "after:content-['User_profile'] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:text-xs10 after:whitespace-nowrap after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200"
        )}
        onClick={() => toggleProfileButton(true)}
      >
        <Image
          width={44}
          height={44}
          src={
            userImgPath
              ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${userImgPath}`
              : "/images/user-icon.svg"
          }
          alt="User profile"
          className={clsx(
            "w-7 h-7 sm:w-11 sm:h-11 min-w-7",
            userImgPath
              ? "rounded-full object-cover border border-grayStroke-70"
              : null
          )}
        />
      </button>
      {isProfileShow ? (
        <UserProfileModal closeModal={() => toggleProfileButton(false)} />
      ) : null}
    </>
  );
};
