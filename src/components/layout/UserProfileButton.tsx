'use client';
import { useUserProfile } from '@/hooks/useUserProfile';
import clsx from 'clsx';
import Image from 'next/image';
import { type FC } from 'react';
import { UserProfileModal } from '../user-profile/UserProfileModal';
import { Loader } from '../ui/Loader';
import { useQuery } from '@tanstack/react-query';
import { type TUserProfile } from '@/types/auth';

export const UserProfileButton: FC = () => {
  const { isProfileShow, openUserProfile, closeUserProfile, getUserProfile } =
    useUserProfile();

  const { data: userProfile, isLoading: isLoadingUserProfile } = useQuery<
    TUserProfile | undefined
  >({
    queryKey: ['user-profile'],
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
            'relative transition-all duration-200 hover:scale-125',
            "after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:whitespace-nowrap after:text-xs10 after:opacity-0 after:transition-all after:duration-200 after:content-['User_profile'] hover:after:opacity-100",
          )}
          onClick={openUserProfile}
        >
          <Image
            width={1980}
            height={1080}
            src={
              userProfile?.imgPath
                ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${userProfile.imgPath}`
                : '/images/user-icon.svg'
            }
            alt="User profile"
            className={clsx(
              'h-7 w-7 min-w-7 sm:h-11 sm:w-11',
              userProfile?.imgPath
                ? 'rounded-full border border-grayStroke-70 object-cover'
                : null,
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
