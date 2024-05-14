'use client';
import { useState, type FC } from 'react';
import Image from 'next/image';
import { ModalWindow } from '../ui/ModalWindow';
import { IconButton } from '../ui/IconButton';

type TStageImageProps = {
  imgPath: string;
};

export const StageImage: FC<TStageImageProps> = ({ imgPath }) => {
  const [isModalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="relative w-5/12">
        <Image
          width={1920}
          height={1080}
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${imgPath}`}
          className="h-auto max-h-recipeStageImage w-full rounded-md object-cover"
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
            width={1920}
            height={1080}
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${imgPath}`}
            className="mx-auto h-auto w-full rounded-md object-cover sm:w-4/5"
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
