'use client';
import { type TCustomFile } from '@/types/types';
import Image from 'next/image';
import { type FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconButton } from './IconButton';

type TUploadFileInputProps = {
  updatedImgPath: string | null | undefined;
  uploadFilePreview: TCustomFile | null;
  removeImg: () => void;
  onDrop: (acceptedFiles: File[]) => void;
};

export const UploadFileInput: FC<TUploadFileInputProps> = ({
  uploadFilePreview,
  updatedImgPath,
  removeImg,
  onDrop,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
    },
  });

  return (
    <div className="flex items-center justify-center gap-2">
      {uploadFilePreview || updatedImgPath ? (
        <div className="relative">
          <Image
            width={144}
            height={112}
            src={
              uploadFilePreview
                ? uploadFilePreview.preview
                : `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${updatedImgPath}`
            }
            alt="Upload image"
            className="h-28 w-36 rounded-md object-cover"
            onLoad={() => {
              if (uploadFilePreview) {
                URL.revokeObjectURL(uploadFilePreview.preview);
              }
            }}
          />

          <IconButton
            iconSrc="/images/delete-icon.svg"
            classNameModificator="w-6 h-6 min-w-5 absolute top-1.5 right-1.5 rounded-full p-1 bg-mainRed bg-opacity-50"
            onClick={removeImg}
          />
        </div>
      ) : (
        <>
          <div>
            <p className="mb-1 text-center text-s14 text-grayStroke-70">
              Upload image
            </p>
            <p className="text-center text-xs10 text-grayStroke-70">
              Only: png | jpg | jpeg | webp
            </p>
          </div>

          <button
            {...getRootProps()}
            className="h-8 w-8 transition-all duration-200 hover:scale-125"
            type="button"
          >
            <Image
              width={32}
              height={32}
              src="/images/upload-icon.svg"
              alt="Upload image"
              className="min-w-8"
            />
          </button>
          <input {...getInputProps()} />
        </>
      )}
    </div>
  );
};
