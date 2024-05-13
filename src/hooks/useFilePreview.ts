import { type TCustomFile } from '@/types/types';
import { useState, useEffect } from 'react';

export const useFilePreview = () => {
  const [uploadFilePreview, setUploadFilePreview] =
    useState<TCustomFile | null>(null);

  const createCustomFile = (file: File) =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
      fileId: crypto.randomUUID(),
    });

  useEffect(() => {
    return () => {
      if (uploadFilePreview) {
        URL.revokeObjectURL(uploadFilePreview.preview);
      }
    };
  }, []);

  return {
    uploadFilePreview,
    setUploadFilePreview,
    createCustomFile,
  };
};
