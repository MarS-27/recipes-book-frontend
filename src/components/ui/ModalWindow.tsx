import { type FC, type ReactNode } from "react";

type ModalWindowProps = {
  children: string | ReactNode;
};

export const ModalWindow: FC<ModalWindowProps> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-full z-50 bg-darkBlue bg-opacity-80 flex place-items-center">
      {children}
    </div>
  );
};
