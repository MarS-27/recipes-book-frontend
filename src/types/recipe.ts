import { type TCustomFile } from './types';

export type TRecipeStage = {
  stageNumber: string;
  imgPath: string | null;
  description: string;
};

export enum RecipeCategories {
  All = 'All',
  Salads = 'Salads',
  Soups = 'Soups',
  Appetizer = 'Appetizer',
  MainCourse = 'Main course',
  SideDishes = 'Side dishes',
  Beverages = 'Beverages',
  Breakfast = 'Breakfast',
  Baking = 'Baking',
  Desserts = 'Desserts',
  Others = 'Others',
}

export type TRecipeFiles = {
  recipeFiles?: TCustomFile[];
};

export type TRecipe = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  category: RecipeCategories;
  titleImgPath: string | null;
  description: string;
  isVegan: boolean;
  ingredients: string[];
  stages: TRecipeStage[];
};

export type TGetRecipeByIdResult = {
  result: TRecipe | undefined;
  error?: string;
};

export type TGetRecipeInForm = TRecipe & TRecipeFiles;
