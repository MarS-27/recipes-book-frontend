import { type TGetRecipeInForm, RecipeCategories } from "@/types/recipe";
import clsx from "clsx";
import { useState, type FC } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

export const InputCategory: FC = () => {
  const [isOpenSelect, setOpenSelect] = useState(false);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TGetRecipeInForm>();

  const { category } = watch();

  const categories = Object.values(RecipeCategories).filter(
    (value) => value !== RecipeCategories.All
  );
  return (
    <div className="relative w-full text-s14 font-medium">
      <div
        className={clsx(
          "flex justify-between items-center py-1.5 px-3.5 rounded-md bg-white",
          !errors.category && isOpenSelect
            ? "border-2 border-grayStroke-70"
            : null,
          !errors.category && !isOpenSelect
            ? "border border-opacity-20 border-grayStroke-100"
            : null,
          errors.category && isOpenSelect ? "border-2 border-mainRed" : null
        )}
        onClick={() => {
          setOpenSelect(!isOpenSelect);
        }}
      >
        <p className={clsx(category ? "text-black" : "text-grayStroke-70")}>
          {category ? category : "Recipe category"}
        </p>
        <Image
          width={20}
          height={20}
          className={clsx(
            "min-w-5 transition-all duration-200",
            isOpenSelect ? "rotate-180" : null
          )}
          src="/images/select-arrow.svg"
          alt="Open select categories"
        />
      </div>
      {errors.category && !category ? (
        <span className="absolute left-1 -top-3 text-mainRed text-xs10">
          * {errors.category.message}
        </span>
      ) : null}
      <input
        className="hidden"
        {...register("category", {
          required: "Category is required!",
        })}
      />
      <div
        className={clsx(
          "w-full absolute top-[105%] left-0 grid transition-all duration-200 max-h-52 z-10",
          isOpenSelect
            ? "p-2 grid-rows-[1fr] bg-pageBg rounded-md border border-grayStroke-80"
            : "grid-rows-[0fr]"
        )}
      >
        <ul
          className={clsx(
            "flex flex-col gap-1",
            isOpenSelect ? "overflow-auto" : "overflow-hidden"
          )}
        >
          {categories.map((item) => (
            <li
              key={item}
              className={clsx(
                "py-1 px-2 relative transition-all duration-200 ",
                category === item
                  ? "pointer-events-none text-darkBlue bg-lightBlue"
                  : "hover:text-darkBlue hover:bg-lightBlue cursor-pointer"
              )}
              onClick={() => {
                setValue("category", item);
                setOpenSelect(!isOpenSelect);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
