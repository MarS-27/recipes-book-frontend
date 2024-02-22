import { type FC } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { Loader } from "../ui/Loader";
import { TUserProfile } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

type TUserProfileInfoProps = {
  openUpdateUserProfile: () => void;
};

export const UserProfileInfo: FC<TUserProfileInfoProps> = ({
  openUpdateUserProfile,
}) => {
  const {
    isDeleting,
    isOpenDeletingAccept,
    deleteUser,
    openDeleteAccept,
    closeDeleteAccept,
  } = useDeleteUser();

  const { data: userProfile } = useQuery<TUserProfile>({
    queryKey: ["user-profile"],
  });

  return (
    <div className="flex flex-col w-full gap-3 mb-3">
      <Image
        width={144}
        height={112}
        src={
          userProfile?.imgPath
            ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${userProfile.imgPath}`
            : "/images/user-icon.svg"
        }
        alt="User profile"
        className={clsx(
          "w-36 h-28 rounded-md mx-auto",
          userProfile?.imgPath ? "object-cover" : "object-center"
        )}
      />
      <p>
        <span className="font-semibold">Email: </span>
        {userProfile?.email}
      </p>
      <p>
        <span className="font-semibold">User name: </span>
        {userProfile?.userName ? userProfile.userName : "---"}
      </p>
      <div className="flex justify-center gap-3">
        <Button
          variant="contained"
          type="submit"
          onClick={openUpdateUserProfile}
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
        <div className="relative w-full">
          <Button
            variant="outlined"
            onClick={openDeleteAccept}
            disabled={isDeleting || isOpenDeletingAccept}
          >
            {isDeleting ? (
              <Loader classNameModificator="border-t-mainBlue" />
            ) : (
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
            )}
          </Button>
          <div
            className={clsx(
              "w-full absolute top-[105%] left-0 grid transition-all duration-200 z-10",
              isOpenDeletingAccept
                ? "p-0.5 grid-rows-[1fr] bg-pageBg rounded-md border border-grayStroke-80"
                : "grid-rows-[0fr]"
            )}
          >
            <div className="flex items-center justify-around gap-1.5 text-xs12 text-center overflow-hidden">
              <p
                className="w-full p-0.5 underline text-mainRed hover:bg-lightBlue cursor-pointer rounded-md"
                onClick={deleteUser}
              >
                Yes
              </p>
              <p
                className="w-full p-0.5 underline text-mainGreen hover:bg-lightBlue cursor-pointer rounded-md"
                onClick={closeDeleteAccept}
              >
                No
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
