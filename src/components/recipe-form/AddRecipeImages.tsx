'use client';
import { useFilePreview } from '@/hooks/useFilePreview';
import { type TGetRecipeInForm } from '@/types/recipe';
import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { UploadFileInput } from '../ui/UploadFileInput';

type TAddRecipeImagesProps = {
  updatedImgPath: string | null | undefined;
  fieldName: 'titleImgPath' | `stages.${number}.imgPath`;
};

export const AddRecipeImages: FC<TAddRecipeImagesProps> = ({
  fieldName,
  updatedImgPath,
}) => {
  const { uploadFilePreview, createCustomFile, setUploadFilePreview } =
    useFilePreview();

  const { setValue, watch } = useFormContext<TGetRecipeInForm>();

  const { recipeFiles } = watch();

  const onDrop = (acceptedFiles: File[]) => {
    const customFile = createCustomFile(acceptedFiles[0]);

    setUploadFilePreview(customFile);
    setValue(fieldName, customFile.name);

    if (recipeFiles?.length) {
      setValue('recipeFiles', [...recipeFiles, customFile]);
    } else {
      setValue('recipeFiles', [customFile]);
    }
  };

  const removeImg = () => {
    if (recipeFiles?.length) {
      setValue(
        'recipeFiles',
        recipeFiles.filter((file) => file.fileId !== uploadFilePreview?.fileId),
      );
    } else {
      setValue('recipeFiles', []);
    }

    setUploadFilePreview(null);
    setValue(fieldName, '');
  };

  return (
    <UploadFileInput
      uploadFilePreview={uploadFilePreview}
      updatedImgPath={updatedImgPath}
      removeImg={removeImg}
      onDrop={onDrop}
    />
  );
};
