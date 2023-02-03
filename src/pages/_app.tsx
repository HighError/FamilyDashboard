import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import '@/styles/globals.css';
import '@/styles/loading.css';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from '@/context/UserContext';
import SidebarProvider from '@/context/SidebarContext';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <UserProvider>
          <Component {...pageProps} />
          <ToastContainer
            autoClose={5000}
            newestOnTop
            closeOnClick
            draggable
            theme="dark"
          />
        </UserProvider>
      </SidebarProvider>
    </SessionProvider>
  );
}
