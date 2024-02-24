"use client";
import { useUserProfile } from "@/hooks/useUserProfile";
import clsx from "clsx";
import Image from "next/image";
import { type FC } from "react";
import { UserProfileModal } from "../user-profile/UserProfileModal";
import { Loader } from "../ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { type TUserProfile } from "@/types/auth";

export const UserProfileButton: FC = () => {
  const { isProfileShow, openUserProfile, closeUserProfile, getUserProfile } =
    useUserProfile();

  const { data: userProfile, isLoading: isLoadingUserProfile } = useQuery<
    TUserProfile | undefined
  >({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  return (
    <>
      {isLoadingUserProfile ? (
        <Loader classNameModificator="border-t-mainBlue" />
      ) : (
        <button
          type="button"
          className={clsx(
            "relative hover:scale-125 transition-all duration-200",
            "after:content-['User_profile'] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:text-xs10 after:whitespace-nowrap after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200"
          )}
          onClick={openUserProfile}
        >
          <Image
            width={44}
            height={44}
            src={
              userProfile?.imgPath
                ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${userProfile.imgPath}`
                : "/images/user-icon.svg"
            }
            alt="User profile"
            className={clsx(
              "w-7 h-7 sm:w-11 sm:h-11 min-w-7",
              userProfile?.imgPath
                ? "rounded-full object-cover border border-grayStroke-70"
                : null
            )}
          />
        </button>
      )}
      {isProfileShow && userProfile ? (
        <UserProfileModal closeModal={closeUserProfile} />
      ) : null}
    </>
  );
};
