"use client";
import { useRecipeForm } from "@/hooks/useRecipeForm";
import { type TRecipe } from "@/types/recipe";
import { type FC } from "react";
import { FormProvider, type FieldError } from "react-hook-form";
import { Button } from "../ui/Button";
import { FormInput } from "../ui/FormInput";
import { Loader } from "../ui/Loader";
import { TextArea } from "../ui/TextArea";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeStages } from "./RecipeStages";
import { InputCategory } from "./InputCategory";
import { AddRecipeImages } from "./AddRecipeImages";

type TRecipeFormProps = {
  updatedRecipeData?: TRecipe;
};

export const RecipeForm: FC<TRecipeFormProps> = ({ updatedRecipeData }) => {
  const { methods, createRecipe, updateRecipe } =
    useRecipeForm(updatedRecipeData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const { titleImgPath } = watch();

  return (
    <div className="relative w-full p-3 md:p-6 bg-mainYellow bg-opacity-[0.3] rounded-md border border-grayStroke-80">
      <h3 className="font-semibold text-md20 sm:text-md26 pb-2 mb-4 border-b-2 border-b-mainBlue">
        {methods ? "Change recipe" : "Create recipe"}
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={
            !updatedRecipeData
              ? handleSubmit(createRecipe)
              : handleSubmit(updateRecipe)
          }
        >
          <div className="flex flex-col justify-center items-stretch gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-4 w-full">
                <FormInput
                  type="text"
                  placeholder="Recipe title"
                  register={register("title", {
                    required: "Title is required!",
                  })}
                  error={errors.title as FieldError}
                />
                <InputCategory />
                <AddRecipeImages
                  fieldName="titleImgPath"
                  updatedImgPath={titleImgPath}
                />
              </div>
              <TextArea
                placeholder="Recipe description"
                register={register("description", {
                  required: "Description is required!",
                })}
                error={errors.description as FieldError}
                rows={8}
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <RecipeIngredients />
              <RecipeStages />
            </div>
            <div className="flex justify-center gap-3">
              <Button disabled={isSubmitting} type="submit" variant="contained">
                {isSubmitting ? (
                  <Loader classNameModificator="border-t-white" />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button variant="outlined" onClick={() => reset()}>
                Reset
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
