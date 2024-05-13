'use client';
import { useUpdateUserProfile } from '@/hooks/useUpdateUserProfile';
import Image from 'next/image';
import { type FC } from 'react';
import { FormProvider } from 'react-hook-form';
import { ModalWindow } from '../ui/ModalWindow';
import { UpdateUserProfileForm } from './UpdateUserProfileForm';
import { UserProfileInfo } from './UserProfileInfo';

type UserProfileModalProps = {
  closeModal: () => void;
};

export const UserProfileModal: FC<UserProfileModalProps> = ({ closeModal }) => {
  const { methods, updateUserProfile, isUpdateProfile, toggleUpdateButton } =
    useUpdateUserProfile();

  return (
    <ModalWindow>
      <div className="relative m-auto w-full max-w-userProfile rounded-md border border-grayStroke-70 bg-grayStroke-80 p-5">
        <Image
          src="/images/close.svg"
          width={28}
          height={28}
          alt="Close user profile"
          className="absolute right-3 top-3 h-7 w-7 min-w-[28px] cursor-pointer transition-all duration-200 hover:scale-125"
          onClick={closeModal}
        />
        <p className="mb-3 border-b-2 border-b-mainBlue pb-2 text-center text-sm16 font-semibold sm:text-md26">
          User profile
        </p>

        {isUpdateProfile ? (
          <FormProvider {...methods}>
            <UpdateUserProfileForm
              updateUserProfile={updateUserProfile}
              cancelUpdateUserProfile={() => toggleUpdateButton(false)}
            />
          </FormProvider>
        ) : (
          <UserProfileInfo
            openUpdateUserProfile={() => toggleUpdateButton(true)}
          />
        )}
      </div>
    </ModalWindow>
  );
};
