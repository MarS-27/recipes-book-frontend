"use client";
import { type FC } from "react";
import { ROUTE } from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IconButton } from "../ui/IconButton";
import { useDeleteRecipe } from "@/hooks/useDeleteRecipe";
import { Loader } from "../ui/Loader";

export const ControlRecipeButtons: FC = () => {
  const params = useParams<{ id: string }>();
  const { isDeleting, deleteRecipe } = useDeleteRecipe(params.id);

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`${ROUTE.RECIPE_FORM}/${params.id}`}
        className="hover:scale-125 transition-all duration-200"
      >
        <Image
          width={24}
          height={24}
          src="/images/edit-icon.svg"
          alt="Edit recipe"
          className="min-w-6"
        />
      </Link>
      {isDeleting ? (
        <Loader classNameModificator="border-t-mainBLue" />
      ) : (
        <IconButton
          iconSrc="/images/delete-icon.svg"
          classNameModificator="w-6 h-6 min-w-6"
          onClick={() => deleteRecipe()}
        />
      )}
    </div>
  );
};
