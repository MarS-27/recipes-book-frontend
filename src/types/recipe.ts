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
  VeganHealthy = 'Vegan/Healthy',
  Cakes = 'Cakes',
  Cookies = 'Cookies',
  PiesAndTarts = 'Pies and tarts',
  Baking = 'Baking',
  Cupcakes = 'Cupcakes',
  OtherDeserts = 'Other deserts',
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
  ingredients: string[];
  stages: TRecipeStage[];
};

export type TGetRecipeByIdResult = {
  error?: string;
  result: TRecipe | undefined;
};

export type TGetRecipeInForm = TRecipe & TRecipeFiles;
