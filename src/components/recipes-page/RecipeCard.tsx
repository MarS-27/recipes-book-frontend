import { type TRecipe } from '@/types/recipe';
import Link from 'next/link';
import Image from 'next/image';
import { type FC } from 'react';
import clsx from 'clsx';
import { Pacifico } from 'next/font/google';
import { ROUTE } from '@/utils/routes';

type RecipeCardProps = {
  recipe: TRecipe;
};

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const { title, titleImgPath } = recipe;

  return (
    <Link
      href={`${ROUTE.RECIPE}/${recipe.id}`}
      className={clsx(
        'relative h-recipeCard overflow-hidden rounded-md shadow-lg transition-all duration-200 hover:scale-105',
        !titleImgPath ? 'bg-lightBlue p-2' : 'p-0',
      )}
    >
      <Image
        src={
          titleImgPath
            ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${titleImgPath}`
            : '/images/meal-icon.svg'
        }
        className={clsx(
          'w-full rounded-md',
          !titleImgPath ? 'h-60 object-center' : 'h-recipeCard object-cover',
        )}
        width={1920}
        height={1080}
        alt="Recipe title image"
      />
      <p
        className={clsx(
          pacifico.className,
          'absolute bottom-0 left-0 line-clamp-1 w-full bg-lightYellow bg-opacity-70 p-2 text-md20 font-medium leading-[38px] hover:line-clamp-none md:text-md26 md:leading-[48px]',
        )}
      >
        {title}
      </p>
      {recipe.isVeganHealthy ? (
        <div className="absolute right-1 top-1 h-14 w-14 rounded-md bg-mainGreen bg-opacity-70">
          <Image
            src="/images/healthy-logo.svg"
            width={720}
            height={480}
            alt="Healthy/Vegan"
            className="h-14 w-14 scale-150"
          />
        </div>
      ) : null}
    </Link>
  );
};
