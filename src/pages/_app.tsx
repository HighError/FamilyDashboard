import React from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import "@/styles/loading.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <ToastContainer
        autoClose={5000}
        newestOnTop
        closeOnClick
        draggable
        theme="dark"
      />
    </SessionProvider>
  );
}
