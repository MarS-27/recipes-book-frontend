"use client";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";
import Image from "next/image";
import { type FC } from "react";
import { FormProvider } from "react-hook-form";
import { ModalWindow } from "../ui/ModalWindow";
import { UpdateUserProfileForm } from "./UpdateUserProfileForm";
import { UserProfileInfo } from "./UserProfileInfo";

type UserProfileModalProps = {
  closeModal: () => void;
};

export const UserProfileModal: FC<UserProfileModalProps> = ({ closeModal }) => {
  const { methods, updateUserProfile, isUpdateProfile, toggleUpdateButton } =
    useUpdateUserProfile();

  return (
    <ModalWindow>
      <div className="relative max-w-userProfile m-auto w-full p-5 bg-grayStroke-80 rounded-md border border-grayStroke-70">
        <Image
          src="/images/close.svg"
          width={28}
          height={28}
          alt="Close user profile"
          className="w-7 h-7 min-w-[28px] cursor-pointer absolute top-3 right-3 hover:scale-125 transition-all duration-200"
          onClick={closeModal}
        />
        <p className="mb-3 pb-2 font-semibold text-sm16 sm:text-md26 text-center border-b-2 border-b-mainBlue">
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
