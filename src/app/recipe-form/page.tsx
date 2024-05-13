import { RecipeForm } from '@/components/recipe-form/RecipeForm';
import { type FC } from 'react';

const AddRecipe: FC = () => {
  return (
    <section className="w-full pb-5">
      <RecipeForm />
    </section>
  );
};

export default AddRecipe;
