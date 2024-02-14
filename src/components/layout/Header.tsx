import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { type FC } from "react";
import { LogoutButton } from "./LogoutButton";
import { AddRecipeButton } from "./AddRecipeButton";
import { UserAccountButton } from "./UserAccountButton";
import Link from "next/link";
import { ROUTE } from "@/utils/routes";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export const Header: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="pt-5 sm:pt-2 pb-6 px-4 w-full sticky top-0 z-50 bg-pageBg">
      <div
        className={clsx(
          "flex items-center w-full max-w-container mx-auto",
          session?.user.token ? "justify-between" : "justify-center"
        )}
      >
        <Link
          href={ROUTE.RECIPES_START}
          className={clsx(
            pacifico.className,
            "flex gap-5 relative",
            !session?.user.token
              ? "pointer-events-none"
              : "cursor-pointer max-sm:after:content-['Personal_Recipes_Book'] max-sm:after:absolute max-sm:after:-top-6 max-sm:after:left-0 max-sm:after:text-s14 max-sm:after:whitespace-nowrap"
          )}
        >
          <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
          <h1
            className={clsx(
              pacifico.className,
              "text-md24 sm:text-l32 md:text-xL40 font-medium tracking-wider hidden sm:block"
            )}
          >
            Personal Recipes Book
          </h1>
        </Link>
        {session?.user.token ? (
          <div className="flex items-center gap-3 ">
            <UserAccountButton />
            <AddRecipeButton />
            <LogoutButton />
          </div>
        ) : null}
      </div>
    </header>
  );
};
