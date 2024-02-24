import { type TCustomFile } from "./types";

export type TRecipeStage = {
  stageNumber: string;
  imgPath: string | null;
  description: string;
};

export enum RecipeCategories {
  All = "All",
  Deserts = "Deserts",
  Salads = "Salads",
  Soups = "Soups",
  Appetizer = "Appetizer",
  Others = "Others",
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
