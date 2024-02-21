import { type FC } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { Loader } from "../ui/Loader";
import { TUserProfile } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

type TUserProfileInfoProps = {
  openUpdateUserProfile: () => void;
};

export const UserProfileInfo: FC<TUserProfileInfoProps> = ({
  openUpdateUserProfile,
}) => {
  const { userDeletingState, deleteUser, openDeleteAccept, closeDeleteAccept } =
    useDeleteUser();
  const { data: userProfile } = useQuery<TUserProfile>({
    queryKey: ["user-profile"],
  });

  const { isLoading, isOpenAccept } = userDeletingState;

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
        className="w-36 h-28 object-cover rounded-md mx-auto"
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

        {!isOpenAccept ? (
          <Button
            variant="outlined"
            onClick={openDeleteAccept}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader classNameModificator="border-t-mainBLue" />
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
        ) : (
          <div className="flex justify-center gap-3 w-full">
            <Button
              variant="outlined"
              classNameModificator="bg-mainRed"
              onClick={() => {
                closeDeleteAccept();
                deleteUser();
              }}
              disabled={isLoading}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              onClick={closeDeleteAccept}
              classNameModificator="bg-mainGreen"
            >
              No
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
