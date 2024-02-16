import { type FC } from "react";
import { ModalWindow } from "../ui/ModalWindow";

type UserProfileModalProps = {
  closeModal: () => void;
};

export const UserProfileModal: FC<UserProfileModalProps> = ({ closeModal }) => {
  return (
    <ModalWindow>
      <div className="relative max-w-userProfile m-auto w-full p-5 bg-grayStroke-80 rounded-md border border-grayStroke-70">
        <img
          src="/images/close.svg"
          alt="Close user profile"
          className="w-7 h-7 min-w-[28px] ml-auto cursor-pointer absolute top-3 right-3 hover:scale-125 transition-all duration-200"
          onClick={closeModal}
        />
        <p className="mb-2 pb-2 font-semibold text-sm16 sm:text-md26 text-center border-b-2 border-b-mainBLue">
          User profile
        </p>
        <p>1</p>
        <p>2</p>
      </div>
    </ModalWindow>
  );
};
