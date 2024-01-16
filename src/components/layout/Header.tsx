import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { type FC } from "react";
import { LogoutButton } from "../ui/LogoutButton";
import { AddRecipeButton } from "./AddRecipeButton";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export const Header: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header
      className={clsx(
        "flex items-center py-2 w-full sticky top-0 z-50 bg-pageBg",
        session?.user.token ? "justify-between" : "justify-center"
      )}
    >
      <div className="flex gap-5">
        <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
        <h1
          className={clsx(
            pacifico.className,
            "text-l32 sm:text-xL40 font-medium tracking-wider"
          )}
        >
          Personal Recipes Book
        </h1>
      </div>
      {session?.user.token ? (
        <div className="flex gap-5">
          <AddRecipeButton />
          <LogoutButton />
        </div>
      ) : null}
    </header>
  );
};
