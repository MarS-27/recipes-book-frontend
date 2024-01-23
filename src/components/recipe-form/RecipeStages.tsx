import { type FC } from "react";
import { FieldError, useFieldArray, useFormContext } from "react-hook-form";
import { FormInput } from "../ui/FormInput";
import { TRecipe } from "@/types/recipe";

export const RecipeStages: FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TRecipe>();

  const { fields, remove, append } = useFieldArray({
    control,
    name: "stages",
  });

  return (
    <>
      <button
        type="button"
        onClick={() =>
          append({
            stageNumber: String(fields.length + 1),
            description: "",
            imgPath: null,
          })
        }
      >
        Add stage
      </button>

      {fields.map((field, i) => (
        <div className="flex" key={field.id}>
          <p>{field.stageNumber}</p>
          <FormInput
            type="text"
            placeholder="Stage"
            register={register(`stages.${i}.description`, {
              required: "Add stage description!",
            })}
            error={errors.stages?.[i]?.description as FieldError}
          />
          <button type="button" onClick={() => remove(i)}>
            -
          </button>
        </div>
      ))}
    </>
  );
};
