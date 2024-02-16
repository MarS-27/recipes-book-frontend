import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { type FC } from "react";
import { LogoutButton } from "./LogoutButton";
import { AddRecipeButton } from "./AddRecipeButton";
import { UserProfileButton } from "./UserProfileButton";
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
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="w-10 h-10 min-w-10"
          />
          <h1
            className={clsx(
              "text-md24 sm:text-l32 md:text-xL40 font-medium tracking-wider",
              pacifico.className,
              !session?.user.token ? "block" : "hidden sm:block"
            )}
          >
            {session?.user.userName ? `${session.user.userName}'s` : "Personal"}{" "}
            Recipes Book
          </h1>
        </Link>
        {session?.user.token ? (
          <div className="flex items-center gap-3 ">
            <UserProfileButton userImgPath={session.user.imgPath} />
            <AddRecipeButton />
            <LogoutButton />
          </div>
        ) : null}
      </div>
    </header>
  );
};
