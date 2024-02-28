import { Auth } from "@/components/auth/Auth";
import { type FC } from "react";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ROUTE } from "@/utils/routes";

const Home: FC = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.token) {
    redirect(ROUTE.RECIPES_START);
  }

  return <Auth />;
};

export default Home;
