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

export type TRecipe = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  category: RecipeCategories;
  titleImgPath: string;
  description: string;
  ingredients: string[];
  stages: TRecipeStage[];
};
