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
import { Loader } from "../ui/Loader";

type TRecipeFormProps = {
  updatedRecipe?: TRecipe;
};

export const RecipeForm: FC<TRecipeFormProps> = ({ updatedRecipe }) => {
  const defaultValues = updatedRecipe
    ? updatedRecipe
    : {
        ingredients: [""],
        stages: [
          {
            stageNumber: "1",
            description: "",
            imgPath: null,
          },
        ],
      };

  const methods = useForm<TGetRecipeInForm>({ defaultValues });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const { titleImgPath } = watch();

  const categories = Object.values(RecipeCategories).filter(
    (value) => value !== RecipeCategories.All
  );

  return (
    <section className="relative w-full p-6 bg-mainYellow bg-opacity-[0.3] rounded-md border border-grayStroke-80">
      <h3 className="font-semibold text-md26 pb-2 mb-4 border-b-2 border-b-mainBLue">
        {updatedRecipe ? "Change recipe" : "Create recipe"}
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(recipeFormSubmit)}>
          <div className="flex flex-col justify-center items-stretch gap-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-4 w-full">
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
                <AddFileInput
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

            <div className="flex justify-between gap-3">
              <RecipeIngredients />
              <RecipeStages />
            </div>
            <div className="flex justify-center gap-3">
              <Button disabled={isSubmitting} type="submit" variant="contained">
                {isSubmitting ? <Loader /> : "Submit"}
              </Button>
              <Button variant="outlined" onClick={() => reset()}>
                Reset
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
