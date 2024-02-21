"use client";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";
import { type TUserProfile } from "@/types/auth";
import Image from "next/image";
import { type FC } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "../ui/Button";
import { ModalWindow } from "../ui/ModalWindow";
import { UpdateUserProfileForm } from "./UpdateUserProfileForm";

type UserProfileModalProps = {
  userProfileData: TUserProfile;
  closeModal: () => void;
};

export const UserProfileModal: FC<UserProfileModalProps> = ({
  closeModal,
  userProfileData,
}) => {
  const { methods, updateUserProfile, isUpdateProfile, toggleUpdateButton } =
    useUpdateUserProfile(userProfileData);
  const { userName, imgPath, email } = userProfileData;

  return (
    <ModalWindow>
      <div className="relative max-w-userProfile m-auto w-full p-5 bg-grayStroke-80 rounded-md border border-grayStroke-70">
        <Image
          src="/images/close.svg"
          width={28}
          height={28}
          alt="Close user profile"
          className="w-7 h-7 min-w-[28px] ml-auto cursor-pointer absolute top-3 right-3 hover:scale-125 transition-all duration-200"
          onClick={closeModal}
        />
        <p className="mb-3 pb-2 font-semibold text-sm16 sm:text-md26 text-center border-b-2 border-b-mainBLue">
          User profile
        </p>

        {isUpdateProfile ? (
          <FormProvider {...methods}>
            <UpdateUserProfileForm updateUserProfile={updateUserProfile} />
          </FormProvider>
        ) : (
          <div className="flex flex-col w-full gap-3 mb-3">
            <Image
              width={144}
              height={112}
              src={
                imgPath
                  ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${imgPath}`
                  : "/images/user-icon.svg"
              }
              alt="User profile"
              className="w-36 h-28 object-cover rounded-md mx-auto"
            />
            <p>
              <span className="font-semibold">Email: </span>
              {email}
            </p>
            <p>
              <span className="font-semibold">User name: </span>
              {userName ? userName : "---"}
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="contained"
                type="submit"
                onClick={() => toggleUpdateButton(true)}
              >
                <Image
                  width={24}
                  height={24}
                  src="/images/edit-icon.svg"
                  alt="Edit recipe"
                  className="min-w-6"
                />
                <p className="w-full">Edit</p>
              </Button>

              <Button
                variant="outlined"
                onClick={() => console.log("del")}
                // disabled={isDeleting}
              >
                {/* {isDeleting ? (
              <Loader classNameModificator="border-t-mainBLue" />
            ) : ( */}
                <>
                  <Image
                    width={24}
                    height={24}
                    src="/images/delete-icon.svg"
                    alt="Delete recipe"
                    className="min-w-6"
                  />
                  <p className="w-full">Delete</p>
                </>
                {/* // )} */}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ModalWindow>
  );
};
