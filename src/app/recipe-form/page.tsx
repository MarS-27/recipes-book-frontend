import { RecipeForm } from "@/components/recipe-form/RecipeForm";
import { type FC } from "react";

const AddRecipe: FC = () => {
  return (
    <section className="w-full py-5">
      <RecipeForm />
    </section>
  );
};

export default AddRecipe;
