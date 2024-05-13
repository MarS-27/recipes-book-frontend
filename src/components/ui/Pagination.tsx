import { type FC, Fragment } from 'react';
import { PaginationButton } from './PaginationButton';
import Link from 'next/link';
import { ROUTE } from '@/utils/routes';
import { getPaginationTemplate } from '@/utils/getPaginationTemplate';
import clsx from 'clsx';

type PaginationProps = {
  activePageNumber: number;
  pagesCount: number;
};

export const Pagination: FC<PaginationProps> = ({
  activePageNumber,
  pagesCount,
}) => {
  const paginationTemplate = getPaginationTemplate(
    activePageNumber,
    pagesCount,
  );

  return (
    <div className="flex justify-center gap-3">
      <PaginationButton
        variant="prev"
        activePageNumber={activePageNumber}
        disabled={activePageNumber === 1}
      />
      <div className="flex items-center justify-center gap-1 text-sm16 text-black">
        {paginationTemplate.map((item, i) => (
          <Fragment key={i}>
            {item === '...' ? (
              <p className="px-1 font-bold">...</p>
            ) : (
              <Link
                href={`${ROUTE.RECIPES}?category=All&page=${item}`}
                className={clsx(
                  'flex h-7 w-8 items-center justify-center rounded border border-grayStroke-60 transition-all duration-300',
                  activePageNumber === item
                    ? 'pointer-events-none bg-mainBlue text-grayStroke-40'
                    : 'bg-lightBlue hover:bg-mainBlue hover:text-grayStroke-40',
                )}
              >
                <p className="font-semibold">{item}</p>
              </Link>
            )}
          </Fragment>
        ))}
      </div>
      <PaginationButton
        variant="next"
        activePageNumber={activePageNumber}
        disabled={activePageNumber === pagesCount}
      />
    </div>
  );
};
