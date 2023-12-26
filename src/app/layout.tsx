import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import type { FC, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "@/components/layout/Header";
import clsx from "clsx";
import { Footer } from "@/components/layout/Footer";

const rubik = Rubik({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Book",
  description: "Simple personal recipe book",
};

const RootLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en">
      <body className={clsx(rubik.className, "bg-grayStroke-30 bg-opacity-20")}>
        <div className="min-h-dvh flex flex-col justify-between items-center max-w-container mx-auto px-4">
          <Header />
          <main className="w-full">{children}</main>
          <Footer />
        </div>
        <ToastContainer
          className="z-50 toast-container"
          position="bottom-left"
          autoClose={2000}
        />
      </body>
    </html>
  );
};

export default RootLayout;
