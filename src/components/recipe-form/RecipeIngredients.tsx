import { TGetRecipeInForm, TRecipe } from "@/types/recipe";
import { type FC } from "react";
import { FieldError, useFieldArray, useFormContext } from "react-hook-form";
import { FormInput } from "../ui/FormInput";

export const RecipeIngredients: FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TGetRecipeInForm>();

  const { fields, remove, append } = useFieldArray<
    TRecipe,
    //@ts-ignore
    "ingredients",
    "id"
  >({
    control,
    name: "ingredients",
  });

  return (
    <>
      <button type="button" onClick={() => append("")}>
        Add ingredient
      </button>
      {fields.map((field, i) => (
        <div className="flex" key={field.id}>
          <FormInput
            type="text"
            placeholder="Ingredient"
            register={register(`ingredients.${i}`, {
              required: "Add or remove ingredient!",
            })}
            error={errors.ingredients?.[i] as FieldError}
          />
          <button type="button" onClick={() => remove(i)}>
            -
          </button>
        </div>
      ))}
    </>
  );
};
