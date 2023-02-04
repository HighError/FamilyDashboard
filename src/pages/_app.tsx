// Libraries
import React, { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';

// My components
import Layout from '@/components/Layout';
import { IRoutes, routes } from '@/lib/routes';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import UserProvider from '@/context/UserContext';

// CSS
import '@/styles/globals.css';
import '@/styles/loading.css';
import '@/styles/errors.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { asPath } = useRouter();
  const { width } = useWindowDimensions();
  const [showSidebar, setShowSidebar] = useState(width >= 1024);

  const route: IRoutes | undefined = routes.find((e) =>
    asPath.startsWith(e.path)
  );

  useEffect(() => {
    setShowSidebar(width >= 1024);
  }, [width]);

  return (
    <SessionProvider session={session}>
      <UserProvider>
        {route ? (
          <Layout
            title={route.title}
            subtitle={route.subTitle}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          >
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastContainer
          autoClose={5000}
          newestOnTop
          closeOnClick
          draggable
          theme="dark"
        />
      </UserProvider>
    </SessionProvider>
  );
}
