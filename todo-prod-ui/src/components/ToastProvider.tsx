"use client";
import { useTheme } from "next-themes";
import { Bounce, ToastContainer } from "react-toastify";

const ToastProvider = () => {
  const { theme } = useTheme();

  return (
    <>
      <ToastContainer
        position="top-center"
        theme={theme}
        autoClose={2000}
        transition={Bounce}
      />
    </>
  );
};

export default ToastProvider;
