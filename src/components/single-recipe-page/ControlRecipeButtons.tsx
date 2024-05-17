'use client';
import { useClosePopupOnClickOutside } from '@/hooks/useClosePopupOnClickOutside';
import { useDeleteRecipe } from '@/hooks/useDeleteRecipe';
import { ROUTE } from '@/utils/routes';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, type FC } from 'react';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { Loader } from '../ui/Loader';
import dynamic from 'next/dynamic';
import RecipePdfDocumet from '../recipePdfDocument/RecipePdfDocumet';
import { useQuery } from '@tanstack/react-query';
import { type TGetRecipeByIdResult } from '@/types/recipe';
import { PDFViewer } from '@react-pdf/renderer';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  },
);

export const ControlRecipeButtons: FC = () => {
  const { ref, isOpenPopup, toggleOpenPopup } = useClosePopupOnClickOutside();
  const [isOpenDeletingAccept, setOpenDeletingAccept] = useState(false);
  const params = useParams<{ id: string }>();
  const { isDeleting, deleteRecipe } = useDeleteRecipe(params.id);

  const { data } = useQuery<TGetRecipeByIdResult>({
    queryKey: ['recipe', params.id],
  });

  const recipe = data?.result;

  return (
    <div ref={ref} className="relative h-8 pt-2">
      <IconButton
        iconSrc={isOpenPopup ? '/images/close.svg' : '/images/gear-icon.svg'}
        classNameModificator="w-6 h-6 min-w-6"
        onClick={() => {
          toggleOpenPopup(!isOpenPopup);
          setOpenDeletingAccept(false);
        }}
      />
      <div
        className={clsx(
          'absolute right-0 top-[105%] z-10 grid w-32 transition-all duration-200',
          isOpenPopup
            ? 'grid-rows-[1fr] rounded-md border border-grayStroke-80 bg-pageBg p-2'
            : 'grid-rows-[0fr]',
        )}
      >
        <div className="flex flex-col gap-2 overflow-hidden">
          <Link href={`${ROUTE.RECIPE_FORM}/${params.id}`}>
            <Button variant="contained">
              <Image
                width={24}
                height={24}
                src="/images/edit-icon.svg"
                alt="Edit recipe"
                className="ml-1 min-w-6"
              />
              <p className="w-full">Edit</p>
            </Button>
          </Link>

          {recipe ? (
            <PDFDownloadLink
              document={<RecipePdfDocumet recipe={recipe} />}
              fileName={`recipe_${params.id}.pdf`}
            >
              <Button variant="contained">
                <Image
                  width={24}
                  height={24}
                  src="/images/download-icon.svg"
                  alt="Edit recipe"
                  className="ml-1 min-w-6"
                />
                <p className="w-full">PDF</p>
              </Button>
            </PDFDownloadLink>
          ) : null}

          {!isOpenDeletingAccept ? (
            <Button
              variant="outlined"
              onClick={() => setOpenDeletingAccept(true)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader classNameModificator="border-t-mainBlue" />
              ) : (
                <>
                  <Image
                    width={24}
                    height={24}
                    src="/images/delete-icon.svg"
                    alt="Delete recipe"
                    className="min-w-6"
                  />
                  <p className="w-full">Delete</p>
                </>
              )}
            </Button>
          ) : (
            <div
              className={
                'flex w-full items-center justify-around gap-1.5 rounded-md border border-grayStroke-80 bg-pageBg p-1 text-center text-sm16'
              }
            >
              <p
                className="w-full cursor-pointer rounded-md p-0.5 text-mainRed underline hover:bg-lightBlue"
                onClick={() => deleteRecipe()}
              >
                Yes
              </p>
              <p
                className="w-full cursor-pointer rounded-md p-0.5 text-mainGreen underline hover:bg-lightBlue"
                onClick={() => setOpenDeletingAccept(false)}
              >
                No
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
