import { type TGetRecipeInForm } from "@/types/recipe";
import Image from "next/image";
import { useState, type FC } from "react";
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
  const [uploadFilePreview, setUploadFilePreview] = useState<
    (File & { preview: string }) | null
  >(null);
  const { setValue, watch } = useFormContext<TGetRecipeInForm>();
  console.log(updatedImgPath);

  const { recipeFiles } = watch();

  const onDrop = (acceptedFiles: File[]) => {
    setUploadFilePreview(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );

    setValue(fieldName, acceptedFiles[0].name);

    if (recipeFiles?.length) {
      setValue("recipeFiles", [...recipeFiles, ...acceptedFiles]);
    } else {
      setValue("recipeFiles", acceptedFiles);
    }
  };

  const removeImg = () => {
    if (recipeFiles?.length) {
      setValue(
        "recipeFiles",
        recipeFiles.filter((file) => file.name !== uploadFilePreview?.name)
      );
    } else {
      setValue("recipeFiles", []);
    }

    setUploadFilePreview(null);
    setValue(fieldName, null);
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
          />

          <IconButton
            iconSrc="/images/delete-icon.svg"
            classNameModificator="w-6 h-6 min-w-5 absolute top-1.5 right-1.5 rounded-full p-1 bg-mainRed bg-opacity-50"
            onClick={() => removeImg()}
          />
        </div>
      ) : null}
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
