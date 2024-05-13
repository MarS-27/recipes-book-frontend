import { type FC, type ReactNode } from 'react';

type ModalWindowProps = {
  children: string | ReactNode;
};

export const ModalWindow: FC<ModalWindowProps> = ({ children }) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full place-items-center bg-darkBlue bg-opacity-80 p-4">
      {children}
    </div>
  );
};
