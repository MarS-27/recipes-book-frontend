"use client";
import { RecipeCategories } from "@/types/recipe";
import { ROUTE } from "@/utils/routes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState, type FC } from "react";

type SelectCategoryProps = {
  category: RecipeCategories;
};

export const SelectCategory: FC<SelectCategoryProps> = ({ category }) => {
  const [isOpenOrder, setOpenOrder] = useState(false);
  const categories = Object.values(RecipeCategories);

  return (
    <div className="relative w-full md:max-w-filterBar">
      <div
        className={clsx(
          "flex justify-between items-center gap-2 p-2 bg-lightYellow rounded-md border-2 transition-all duration-200",
          isOpenOrder
            ? "border-mainBLue"
            : "border-grayStroke-80 hover:border-mainBLue"
        )}
        onClick={() => {
          setOpenOrder(!isOpenOrder);
        }}
      >
        <h3 className="md:text-md20 text-s14 font-semibold">{category}</h3>
        <Image
          width={24}
          height={24}
          className={clsx(
            "min-w-6 transition-all duration-200",
            isOpenOrder ? "rotate-180" : null
          )}
          src="/images/select-arrow.svg"
          alt="Open select categories"
        />
      </div>
      <div
        className={clsx(
          "w-full absolute top-[105%] left-0 grid transition-all duration-200 max-h-filterBar z-10",
          isOpenOrder
            ? "p-2 grid-rows-[1fr] bg-pageBg rounded-md border border-grayStroke-80"
            : "grid-rows-[0fr]"
        )}
      >
        <div className="flex flex-col gap-2 overflow-hidden">
          {categories.map((item) => (
            <Link
              href={`${ROUTE.RECIPES}?category=${item}&page=1`}
              key={item}
              className={clsx(
                "pb-2 px-2 relative transition-all duration-200 after:absolute after:top-full after:left-0 after:w-0 after:h-px after:transition-all after:duration-200 after:bg-darkBlue",
                category === item
                  ? "pointer-events-none after:w-full text-darkBlue"
                  : "hover:text-darkBlue hover:after:w-full"
              )}
              onClick={() => {
                setOpenOrder(!isOpenOrder);
              }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
