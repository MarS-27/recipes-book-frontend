"use client";
import { RecipeCategories, TGetRecipeInForm, TRecipe } from "@/types/recipe";
import { type FC } from "react";
import { FieldError, FormProvider, useForm } from "react-hook-form";
import { AddFileInput } from "../ui/AddFileInput";
import { Button } from "../ui/Button";
import { FormInput } from "../ui/FormInput";
import { TextArea } from "../ui/TextArea";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeStages } from "./RecipeStages";
import { recipeFormSubmit } from "@/utils/recipeFormSubmit";

type TRecipeFormProps = {
  updatedRecipe?: TRecipe;
};

export const RecipeForm: FC<TRecipeFormProps> = ({ updatedRecipe }) => {
  const methods = useForm<TGetRecipeInForm>({ defaultValues: updatedRecipe });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const categories = Object.values(RecipeCategories).filter(
    (value) => value !== RecipeCategories.All
  );

  return (
    <section className="relative max-w-loginContainer m-auto w-full px-6 py-10 bg-mainYellow bg-opacity-[0.3] rounded-md border border-grayStroke-80">
      <h3 className="mb-2 font-semibold text-md26">Recipe Form</h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(recipeFormSubmit)}>
          <div className="flex flex-col justify-center items-stretch gap-6">
            <FormInput
              type="text"
              placeholder="Recipe title"
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title as FieldError}
            />
            <select {...register("category")}>
              {categories.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <AddFileInput fieldName="titleImgPath" />
            <TextArea
              placeholder="Recipe description"
              register={register("description", {
                required: "Description is required!",
              })}
              error={errors.description as FieldError}
            />
            <RecipeIngredients />
            <RecipeStages />
            <Button
              disabled={isSubmitting}
              type="submit"
              classNameModificator="bg-mainBlue text-white text-sm14 hover:bg-darkBlue transition-all duration-200"
            >
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
