import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ToastClientComponent } from "@/components/ui/ToastClientComponent";
import clsx from "clsx";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import type { FC, ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

const rubik = Rubik({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Book",
  description: "Simple personal recipe book",
};

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={clsx(
          rubik.className,
          "bg-pageBg text-black text-xs12 sm:text-sm16"
        )}
      >
        <Providers session={session}>
          <div className="min-h-dvh flex flex-col justify-between items-center">
            <Header />
            <main className="w-full grow flex max-w-container mx-auto px-4">
              {children}
            </main>
            <Footer />
          </div>
          <ToastClientComponent />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
