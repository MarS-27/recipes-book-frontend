import { TCustomFile, type TGetRecipeInForm } from "@/types/recipe";
import Image from "next/image";
import { useState, type FC, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { IconButton } from "./IconButton";

type TAddFileInputProps = {
  updatedImgPath: string | null | undefined;
  fieldName: "titleImgPath" | `stages.${number}.imgPath`;
};

export const AddFileInput: FC<TAddFileInputProps> = ({
  fieldName,
  updatedImgPath,
}) => {
  const [uploadFilePreview, setUploadFilePreview] =
    useState<TCustomFile | null>(null);

  const { setValue, watch } = useFormContext<TGetRecipeInForm>();

  const { recipeFiles } = watch();

  const onDrop = (acceptedFiles: File[]) => {
    const customFile: TCustomFile = Object.assign(acceptedFiles[0], {
      preview: URL.createObjectURL(acceptedFiles[0]),
      fileId: crypto.randomUUID(),
    });

    setUploadFilePreview(customFile);

    setValue(fieldName, customFile.name);

    if (recipeFiles?.length) {
      setValue("recipeFiles", [...recipeFiles, customFile]);
    } else {
      setValue("recipeFiles", [customFile]);
    }
  };

  const removeImg = () => {
    if (recipeFiles?.length) {
      setValue(
        "recipeFiles",
        recipeFiles.filter((file) => file.fileId !== uploadFilePreview?.fileId)
      );
    } else {
      setValue("recipeFiles", []);
    }

    setUploadFilePreview(null);
    setValue(fieldName, "");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/webp": [".webp"],
    },
  });

  useEffect(() => {
    return () => {
      if (uploadFilePreview) {
        URL.revokeObjectURL(uploadFilePreview.preview);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center gap-2">
      {uploadFilePreview || updatedImgPath ? (
        <div className="relative">
          <Image
            width={112}
            height={112}
            src={
              uploadFilePreview
                ? uploadFilePreview.preview
                : `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${updatedImgPath}`
            }
            alt="Upload image"
            className="w-36 h-28 object-cover rounded-md"
            onLoad={() => {
              if (uploadFilePreview) {
                URL.revokeObjectURL(uploadFilePreview.preview);
              }
            }}
          />

          <IconButton
            iconSrc="/images/delete-icon.svg"
            classNameModificator="w-6 h-6 min-w-5 absolute top-1.5 right-1.5 rounded-full p-1 bg-mainRed bg-opacity-50"
            onClick={() => removeImg()}
          />
        </div>
      ) : (
        <>
          <div>
            <p className="text-s14 text-center text-grayStroke-70 mb-1">
              Upload image
            </p>
            <p className="text-xs10 text-center text-grayStroke-70">
              Only: png | jpg | jpeg | webp
            </p>
          </div>

          <button
            {...getRootProps()}
            className="w-8 h-8 hover:scale-125 transition-all duration-200"
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
