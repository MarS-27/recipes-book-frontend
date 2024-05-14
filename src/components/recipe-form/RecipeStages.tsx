import { type TGetRecipeInForm } from '@/types/recipe';
import { type FC } from 'react';
import {
  type FieldError,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { TextArea } from '../ui/TextArea';
import { IconButton } from '../ui/IconButton';
import { toast } from 'react-toastify';
import { AddRecipeImages } from './AddRecipeImages';

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
    name: 'stages',
  });

  const deleteStage = (i: number) => {
    i === fields.length - 1
      ? remove(i)
      : toast.warning('Delete the previous stage!');
  };

  return (
    <div className="flex w-full flex-col justify-between gap-2">
      <p className="font-semibold">Stages:</p>
      <div className="flex grow flex-col gap-2">
        {fields.map((field, i) => (
          <div
            className="flex flex-col gap-3 border-t-2 border-t-mainBlue pt-2"
            key={field.id}
          >
            <div className="flex items-center justify-end gap-2">
              <p className="text-s14">Stage {field.stageNumber}</p>
              <IconButton
                iconSrc="/images/delete-icon.svg"
                classNameModificator="w-5 h-5 min-w-5"
                onClick={() => deleteStage(i)}
                disabled={fields.length === 1}
              />
            </div>

            <TextArea
              placeholder="Stage"
              register={register(`stages.${i}.description`, {
                required: 'Add stage description!',
              })}
              error={errors.stages?.[i]?.description as FieldError}
              rows={3}
            />
            <AddRecipeImages
              fieldName={`stages.${i}.imgPath`}
              updatedImgPath={stages[i].imgPath}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2">
        <p className="text-xs12 font-light">Add stage</p>
        <IconButton
          iconSrc="/images/add-icon.svg"
          classNameModificator="w-9 h-9 min-w-9"
          onClick={() =>
            append({
              stageNumber: String(fields.length + 1),
              description: '',
              imgPath: '',
            })
          }
        />
      </div>
    </div>
  );
};
