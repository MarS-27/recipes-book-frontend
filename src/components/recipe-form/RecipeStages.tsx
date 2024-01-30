import { TGetRecipeInForm } from "@/types/recipe";
import { type FC } from "react";
import { FieldError, useFieldArray, useFormContext } from "react-hook-form";
import { AddFileInput } from "../ui/AddFileInput";
import { TextArea } from "../ui/TextArea";
import { IconButton } from "../ui/IconButton";

export const RecipeStages: FC = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<TGetRecipeInForm>();

  const { stages } = watch();

  const { fields, remove, append } = useFieldArray({
    control,
    name: "stages",
  });

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <IconButton
          iconSrc="/images/add-icon.svg"
          classNameModificator="w-9 h-9 min-w-9"
          onClick={() =>
            append({
              stageNumber: String(fields.length + 1),
              description: "",
              imgPath: null,
            })
          }
        />
        <p className="font-semibold">Stages:</p>
      </div>
      {fields.map((field, i) => (
        <div
          className="flex flex-col gap-3 border-t-2 border-t-mainBLue pt-2"
          key={field.id}
        >
          <div className="flex items-center justify-end gap-2">
            <p className="text-s14">Stage {field.stageNumber}</p>
            <IconButton
              iconSrc="/images/delete-icon.svg"
              classNameModificator="w-5 h-5 min-w-5"
              onClick={() => remove(i)}
              disabled={fields.length === 1}
            />
          </div>

          <TextArea
            placeholder="Stage"
            register={register(`stages.${i}.description`, {
              required: "Add stage description!",
            })}
            error={errors.stages?.[i]?.description as FieldError}
            rows={3}
          />
          <AddFileInput
            fieldName={`stages.${i}.imgPath`}
            updatedImgPath={stages[i].imgPath}
          />
        </div>
      ))}
    </div>
  );
};
