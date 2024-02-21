import { useFilePreview } from "@/hooks/useFilePreview";
import { TUpdatedUserProfile } from "@/types/auth";
import { useEffect, type FC } from "react";
import { useFormContext } from "react-hook-form";
import { UploadFileInput } from "../ui/UploadFileInput";

export const UpdateUserImage: FC = () => {
  const { uploadFilePreview, createCustomFile, setUploadFilePreview } =
    useFilePreview();

  const { setValue, watch } = useFormContext<TUpdatedUserProfile>();

  const { imgPath } = watch();

  const onDrop = (acceptedFiles: File[]) => {
    const customFile = createCustomFile(acceptedFiles[0]);

    setUploadFilePreview(customFile);

    setValue("userImage", customFile);
  };

  const removeImg = () => {
    setUploadFilePreview(null);
    setValue("userImage", undefined);
    setValue("imgPath", "");
  };

  useEffect(() => {
    return () => {
      if (uploadFilePreview) {
        URL.revokeObjectURL(uploadFilePreview.preview);
      }
    };
  }, []);

  return (
    <UploadFileInput
      uploadFilePreview={uploadFilePreview}
      updatedImgPath={imgPath}
      removeImg={removeImg}
      onDrop={onDrop}
    />
  );
};
