import { TGetRecipeInForm } from "@/types/recipe";
import clsx from "clsx";
import { type FC } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

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
    <div className="flex gap-2">
      {/* <p className="text-sm16 text-center text-grayStroke-70 mb-1">
        Drop files here or click here to upload
      </p>
      <p className="text-xs12 text-center text-grayStroke-70">
        Only: png | jpg | jpeg | webp
      </p> */}
      <button type="button" {...getRootProps()}>
        Upload image
      </button>
      <input {...getInputProps()} />
    </div>
  );
};
