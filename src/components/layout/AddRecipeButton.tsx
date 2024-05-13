import { type FC } from 'react';
import { ROUTE } from '@/utils/routes';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export const AddRecipeButton: FC = () => {
  return (
    <Link
      href={ROUTE.RECIPE_FORM}
      className={clsx(
        'relative transition-all duration-200 hover:scale-125',
        "after:absolute after:left-1/2 after:top-[95%] after:-translate-x-1/2 after:whitespace-nowrap after:text-xs10 after:opacity-0 after:transition-all after:duration-200 after:content-['Add_recipe'] hover:after:opacity-100",
      )}
    >
      <Image
        width={48}
        height={48}
        src="/images/add-recipe.svg"
        alt="Add recipe"
        className="h-8 w-8 min-w-8 sm:h-12 sm:w-12"
      />
    </Link>
  );
};
