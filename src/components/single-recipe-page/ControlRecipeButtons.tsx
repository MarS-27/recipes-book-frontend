"use client";
import { useClosePopupOnClickOutside } from "@/hooks/useClosePopupOnClickOutside";
import { useDeleteRecipe } from "@/hooks/useDeleteRecipe";
import { ROUTE } from "@/utils/routes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type FC } from "react";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import { Loader } from "../ui/Loader";

export const ControlRecipeButtons: FC = () => {
  const { ref, isOpenPopup, toggleOpenPopup } = useClosePopupOnClickOutside();
  const params = useParams<{ id: string }>();
  const { isDeleting, deleteRecipe } = useDeleteRecipe(params.id);

  return (
    <div ref={ref} className="relative h-6">
      <IconButton
        iconSrc={isOpenPopup ? "/images/close.svg" : "/images/gear-icon.svg"}
        classNameModificator="w-6 h-6 min-w-6"
        onClick={() => toggleOpenPopup(!isOpenPopup)}
      />
      <div
        className={clsx(
          "w-32 grid absolute top-[105%] right-0 transition-all duration-200 z-10",
          isOpenPopup
            ? "p-2 grid-rows-[1fr] bg-pageBg rounded-md border border-grayStroke-80"
            : "grid-rows-[0fr]"
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
                className="min-w-6 ml-1"
              />
              <p className="w-full">Edit</p>
            </Button>
          </Link>
          <Button
            variant="outlined"
            onClick={() => deleteRecipe()}
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
                  className="min-w-6 mr-1"
                />
                <p className="w-full">Delete</p>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
