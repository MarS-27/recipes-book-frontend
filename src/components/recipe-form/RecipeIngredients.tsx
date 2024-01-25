import { TGetRecipeInForm, TRecipe } from "@/types/recipe";
import { type FC } from "react";
import { FieldError, useFieldArray, useFormContext } from "react-hook-form";
import { FormInput } from "../ui/FormInput";
import { DeleteButton } from "../ui/DeleteButton";
import { Button } from "../ui/Button";

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
    <div className="w-full flex flex-col gap-4">
      <p>Ingredients:</p>
      {fields.map((field, i) => (
        <div className="flex items-center gap-2" key={field.id}>
          <FormInput
            type="text"
            placeholder="Ingredient"
            register={register(`ingredients.${i}`, {
              required: "Add or remove ingredient!",
            })}
            error={errors.ingredients?.[i] as FieldError}
          />
          <DeleteButton
            classNameModificator="w-7 h-7 min-w-7"
            onClick={() => remove(i)}
          />
        </div>
      ))}
      <Button
        onClick={() => append("")}
        variant="outlined"
        classNameModificator="w-full max-w-button self-center"
      >
        Add ingredient
      </Button>
    </div>
  );
};
