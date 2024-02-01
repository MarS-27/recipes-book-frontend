export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/recipes",
    "/recipe",
    "/recipe/:path*",
    "/recipe-form",
    "/recipe-form/:path",
  ],
};
