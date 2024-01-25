import { TGetRecipeInForm } from "@/types/recipe";
import { type FC } from "react";
import { FieldError, useFieldArray, useFormContext } from "react-hook-form";
import { AddFileInput } from "../ui/AddFileInput";
import { TextArea } from "../ui/TextArea";
import { DeleteButton } from "../ui/DeleteButton";
import { Button } from "../ui/Button";

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
    <div className="w-full flex flex-col gap-4">
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
          <DeleteButton
            classNameModificator="w-7 h-7 min-w-7"
            onClick={() => remove(i)}
          />
        </div>
      ))}
      <Button
        onClick={() =>
          append({
            stageNumber: String(fields.length + 1),
            description: "",
            imgPath: null,
          })
        }
        variant="outlined"
        classNameModificator="w-full max-w-button self-center"
      >
        Add stage
      </Button>
    </div>
  );
};
