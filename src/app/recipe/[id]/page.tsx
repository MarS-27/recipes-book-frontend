import { WarningMessage } from "@/components/ui/WarningMessage";
import { getRecipeById } from "@/utils/getRecipeById";
import Image from "next/image";
import { type FC } from "react";

type TParams = {
  id: string;
};

const Recipe: FC<{ params: TParams }> = async ({ params }) => {
  const recipeData = await getRecipeById(Number(params.id));

  const { result, error } = recipeData;
  return (
    <section className="flex flex-col justify-between w-full py-5">
      {error ? (
        <WarningMessage>{error}</WarningMessage>
      ) : (
        <>
          <p>{result?.title}</p>
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${result?.titleImgPath}`}
            width={200}
            height={200}
            alt="Recipe title image"
          />
        </>
      )}
    </section>
  );
};

export default Recipe;
