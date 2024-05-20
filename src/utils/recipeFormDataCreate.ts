import { type TGetRecipeInForm } from '@/types/recipe';

export const recipeFormDataCreate = (data: TGetRecipeInForm) => {
  const {
    title,
    titleImgPath,
    description,
    isVegan,
    category,
    ingredients,
    stages,
    recipeFiles,
  } = data;

  const formData = new FormData();
  formData.append('title', title);

  if (titleImgPath !== null) {
    formData.append('titleImgPath', titleImgPath);
  }

  formData.append('description', description);
  formData.append('category', category);
  formData.append('isVegan', JSON.stringify(isVegan));
  formData.append('ingredients', JSON.stringify(ingredients));
  formData.append('stages', JSON.stringify(stages));
  recipeFiles?.forEach((file) => formData.append('files', file));

  return formData;
};
