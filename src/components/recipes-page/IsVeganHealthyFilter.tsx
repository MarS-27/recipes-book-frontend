'use client';
import { RecipeCategories } from '@/types/recipe';
import clsx from 'clsx';
import { type FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/utils/routes';

type IsVeganHealthyFilterProps = {
  isVeganHealthy: string;
  category: RecipeCategories;
};

export const IsVeganHealthyFilter: FC<IsVeganHealthyFilterProps> = ({
  isVeganHealthy,
  category,
}) => {
  const parsedIsVeganHealthyParam = JSON.parse(isVeganHealthy);

  const router = useRouter();

  const handleToggleCheckbox = () => {
    router.replace(
      `${ROUTE.RECIPES}?category=${category}&page=1&isVeganHealthy=${!parsedIsVeganHealthyParam}`,
    );
  };

  return (
    <div
      className="relative flex cursor-pointer items-center gap-2 transition-all duration-200 hover:text-darkBlue"
      onClick={handleToggleCheckbox}
    >
      <div
        className={clsx(
          'flex h-5 w-5 min-w-5 place-content-center rounded-sm border-2 transition-all duration-300',
          parsedIsVeganHealthyParam
            ? 'border-mainBlue bg-lightBlue'
            : 'bg-lightYellow',
        )}
      >
        {parsedIsVeganHealthyParam ? (
          <Image
            width="0"
            height="0"
            className="h-auto w-5 min-w-5"
            src="/images/check-icon.svg"
            alt="Check Vegan/Healthy"
          />
        ) : null}
      </div>
      <p className="cursor-pointer text-sm16 font-semibold">Vegan/Healthy</p>
    </div>
  );
};
