"use client";
import { useState, type FC } from "react";
import Image from "next/image";
import { ModalWindow } from "../ui/ModalWindow";

type TStageImageProps = {
  imgPath: string;
};

export const StageImage: FC<TStageImageProps> = ({ imgPath }) => {
  const [isModalShow, setModalShow] = useState(false);

  return (
    <>
      <Image
        width={240}
        height={240}
        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${imgPath}`}
        className="w-5/12 h-auto max-h-recipeStageImage object-cover rounded-md"
        alt="Recipe stage image"
        onClick={() => setModalShow(true)}
      />
      {isModalShow ? (
        <ModalWindow>
          <Image
            width={1280}
            height={720}
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${imgPath}`}
            className="w-full sm:w-4/5 h-auto object-fill mx-auto rounded-md"
            alt="Recipe stage image"
          />
          <Image
            src="/images/close.svg"
            width={28}
            height={28}
            alt="Close image"
            className="w-7 h-7 min-w-[28px] cursor-pointer absolute top-4 right-4 bg-pageBg rounded-md hover:scale-125 transition-all duration-200"
            onClick={() => setModalShow(false)}
          />
        </ModalWindow>
      ) : null}
    </>
  );
};
