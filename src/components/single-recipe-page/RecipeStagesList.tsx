import { type FC } from 'react';
import { type TRecipeStage } from '@/types/recipe';
import { StageImage } from './StageImage';

type TRecipeStagesListProps = {
  stages: TRecipeStage[];
};

export const RecipeStagesList: FC<TRecipeStagesListProps> = ({ stages }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">Stages:</p>
      {stages.map((stage) => (
        <div
          className="flex items-center gap-3 border-b pb-2 max-[900px]:flex-col-reverse"
          key={stage.stageNumber}
        >
          <p className="w-full">
            <span className="font-semibold">{stage.stageNumber}.</span>{' '}
            {stage.description}
          </p>
          {stage.imgPath ? <StageImage imgPath={stage.imgPath} /> : null}
        </div>
      ))}
    </div>
  );
};
