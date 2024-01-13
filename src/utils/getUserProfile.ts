import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TUserProfile } from "@/types/auth";
import { TError } from "@/types/types";
import { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react";

export const getUserProfile = async (): Promise<TUserProfile | undefined> => {
  const session = await getSession();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        cache: "force-cache",
        next: { tags: ["user-profile"] },
      }
    );

    if (!res.ok) {
      const errorData: TError = await res.json();
      throw new Error(errorData.message);
    }

    const data: TUserProfile = await res.json();

    return data;
  } catch (error: any) {
    await signOut({ redirect: true });
  }
};
