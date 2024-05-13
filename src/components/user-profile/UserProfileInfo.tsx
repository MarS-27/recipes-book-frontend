import { type FC } from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { useDeleteUser } from '@/hooks/useDeleteUser';
import { Loader } from '../ui/Loader';
import { type TUserProfile } from '@/types/auth';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

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
    queryKey: ['user-profile'],
  });

  return (
    <div className="mb-3 flex w-full flex-col gap-3">
      <Image
        width={144}
        height={112}
        src={
          userProfile?.imgPath
            ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${userProfile.imgPath}`
            : '/images/user-icon.svg'
        }
        alt="User profile"
        className={clsx(
          'mx-auto h-28 w-36 rounded-md',
          userProfile?.imgPath ? 'object-cover' : 'object-center',
        )}
      />
      <p>
        <span className="font-semibold">Email: </span>
        {userProfile?.email}
      </p>
      <p>
        <span className="font-semibold">User name: </span>
        {userProfile?.userName ? userProfile.userName : '---'}
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
              'absolute left-0 top-[105%] z-10 grid w-full transition-all duration-200',
              isOpenDeletingAccept
                ? 'grid-rows-[1fr] rounded-md border border-grayStroke-80 bg-pageBg p-0.5'
                : 'grid-rows-[0fr]',
            )}
          >
            <div className="flex items-center justify-around gap-1.5 overflow-hidden text-center text-xs12">
              <p
                className="w-full cursor-pointer rounded-md p-0.5 text-mainRed underline hover:bg-lightBlue"
                onClick={deleteUser}
              >
                Yes
              </p>
              <p
                className="w-full cursor-pointer rounded-md p-0.5 text-mainGreen underline hover:bg-lightBlue"
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
