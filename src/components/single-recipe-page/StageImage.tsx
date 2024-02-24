"use client";
import { useState, type FC } from "react";
import Image from "next/image";
import { ModalWindow } from "../ui/ModalWindow";
import { IconButton } from "../ui/IconButton";

type TStageImageProps = {
  imgPath: string;
};

export const StageImage: FC<TStageImageProps> = ({ imgPath }) => {
  const [isModalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="w-5/12 relative">
        <Image
          width={240}
          height={240}
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${imgPath}`}
          className="w-full h-auto max-h-recipeStageImage object-cover rounded-md"
          alt="Recipe stage image"
        />
        <IconButton
          iconSrc="/images/zoom.svg"
          onClick={() => setModalShow(true)}
          classNameModificator="w-7 h-7 min-w-[28px] absolute bottom-2 right-2 p-1 bg-pageBg border border-grayStroke-70 rounded-md"
        />
      </div>

      {isModalShow ? (
        <ModalWindow>
          <Image
            width={1280}
            height={720}
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${imgPath}`}
            className="w-full sm:w-4/5 h-auto object-cover mx-auto rounded-md"
            alt="Recipe stage image"
          />
          <IconButton
            iconSrc="/images/close.svg"
            onClick={() => setModalShow(false)}
            classNameModificator="w-7 h-7 min-w-[28px] absolute top-4 right-4 bg-pageBg border border-grayStroke-70 rounded-md"
          />
        </ModalWindow>
      ) : null}
    </>
  );
};
