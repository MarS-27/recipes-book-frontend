"use client";
import { type FC } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastClientComponent: FC = () => {
  return (
    <ToastContainer className="z-50" position="bottom-left" autoClose={2000} />
  );
};
