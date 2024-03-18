import { type TGetRecipeInForm } from "@/types/recipe";
import { type FC } from "react";
import { type FieldError, useFormContext } from "react-hook-form";
import { FormInput } from "../ui/FormInput";
import { IconButton } from "../ui/IconButton";

export const RecipeIngredients: FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TGetRecipeInForm>();

  const { ingredients } = watch();

  const handleAddIngrInput = () =>
    setValue("ingredients", [...ingredients, ""]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-2 border-b-2 border-b-mainBlue">
        <IconButton
          iconSrc="/images/add-icon.svg"
          classNameModificator="w-9 h-9 min-w-9"
          onClick={handleAddIngrInput}
        />
        <p className="font-semibold">Ingredients:</p>
      </div>

      {ingredients.map((_, i) => (
        <div className="flex items-center gap-2" key={i}>
          <FormInput
            type="text"
            placeholder="Ingredient"
            onEnterKeyDown={handleAddIngrInput}
            register={register(`ingredients.${i}`, {
              required: "Add ingredient!",
            })}
            error={errors.ingredients?.[i] as FieldError}
          />
          <IconButton
            iconSrc="/images/delete-icon.svg"
            classNameModificator="w-7 h-7 min-w-7"
            onClick={() =>
              setValue(
                "ingredients",
                ingredients.filter((_, index) => i !== index)
              )
            }
            disabled={ingredients.length === 1}
          />
        </div>
      ))}
    </div>
  );
};
