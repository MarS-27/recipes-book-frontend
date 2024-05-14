import { FilterPanel } from '@/components/recipes-page/FilterPanel';
import { ControlRecipeButtons } from '@/components/single-recipe-page/ControlRecipeButtons';
import { IngredientsList } from '@/components/single-recipe-page/IngredientsList';
import { RecipeStagesList } from '@/components/single-recipe-page/RecipeStagesList';
import { WarningMessage } from '@/components/ui/WarningMessage';
import { type TGetRecipeByIdResult } from '@/types/recipe';
import { getRecipeById } from '@/utils/getRecipeById';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import clsx from 'clsx';
import { Pacifico } from 'next/font/google';
import Image from 'next/image';
import { type FC } from 'react';

type TParams = {
  id: string;
};

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

const Recipe: FC<{ params: TParams }> = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recipe', params.id],
    queryFn: () => getRecipeById(Number(params.id)),
  });

  const recipeData = queryClient.getQueryData<TGetRecipeByIdResult>([
    'recipe',
    params.id,
  ]);

  const error = recipeData?.error;
  const recipe = recipeData?.result;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="w-full pb-5">
        <FilterPanel />
        {error ? (
          <WarningMessage>{error}</WarningMessage>
        ) : (
          <>
            {recipe?.ingredients ? (
              <IngredientsList ingredients={recipe.ingredients} />
            ) : null}
            <div className="flex w-full flex-col gap-3 md:pl-[270px]">
              <div className="flex items-center justify-between gap-2">
                <h3
                  className={clsx(
                    pacifico.className,
                    'w-full p-2 text-center text-md26 font-medium tracking-wider sm:text-l36',
                  )}
                >
                  {recipe?.title}
                </h3>
                <ControlRecipeButtons />
              </div>
              {recipe?.titleImgPath ? (
                <Image
                  width={1920}
                  height={1080}
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${recipe.titleImgPath}`}
                  className="mx-auto h-auto max-h-recipeTitleImage w-full max-w-fit rounded-md object-contain"
                  alt="Recipe title image"
                />
              ) : null}
              {recipe?.description ? <p>{recipe.description}</p> : null}
              {recipe?.stages ? (
                <RecipeStagesList stages={recipe.stages} />
              ) : null}
            </div>
          </>
        )}
      </section>
    </HydrationBoundary>
  );
};

export default Recipe;
