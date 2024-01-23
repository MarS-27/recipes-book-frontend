import { TRecipe } from "@/types/recipe";
import { type FC } from "react";
import {
  useFormContext,
  useFieldArray,
  FieldError,
  FieldValues,
} from "react-hook-form";
import { FormInput } from "../ui/FormInput";

// type TRecipeWithIngredients = TRecipe & { ingredients: { value: string }[] };

export const RecipeIngredients: FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TRecipe>();

  const { fields, remove, append } = useFieldArray({
    control,
    name: "ingredients",
  });
  console.log(fields);

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
