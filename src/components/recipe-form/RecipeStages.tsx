import { TGetRecipeInForm } from "@/types/recipe";
import { type FC } from "react";
import { FieldError, useFieldArray, useFormContext } from "react-hook-form";
import { AddFileInput } from "../ui/AddFileInput";
import { TextArea } from "../ui/TextArea";

export const RecipeStages: FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TGetRecipeInForm>();

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
          <TextArea
            placeholder="Stage"
            register={register(`stages.${i}.description`, {
              required: "Add stage description!",
            })}
            error={errors.stages?.[i]?.description as FieldError}
          />
          <AddFileInput fieldName={`stages.${i}.imgPath`} />
          <button type="button" onClick={() => remove(i)}>
            -
          </button>
        </div>
      ))}
    </>
  );
};
