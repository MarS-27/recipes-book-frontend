import { TGetRecipeInForm } from "@/types/recipe";
import clsx from "clsx";
import { type FC } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { Button } from "./Button";
import Image from "next/image";

type TAddFileInputProps = {
  fieldName: "titleImgPath" | `stages.${number}.imgPath`;
};

export const AddFileInput: FC<TAddFileInputProps> = ({ fieldName }) => {
  const { setValue, watch } = useFormContext<TGetRecipeInForm>();

  const { recipeFiles } = watch();

  const onDrop = (acceptedFiles: File[]) => {
    if (recipeFiles?.length) {
      setValue(fieldName, acceptedFiles[0].name);
      setValue("recipeFiles", [...recipeFiles, ...acceptedFiles]);
    } else {
      setValue(fieldName, acceptedFiles[0].name);
      setValue("recipeFiles", acceptedFiles);
    }
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

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
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
    </div>
  );
};
