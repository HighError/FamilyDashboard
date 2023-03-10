// Libraries
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';

// My components
import Layout from '@/components/Layout';
import { IRoutes, routes } from '@/lib/routes';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import UserProvider from '@/contexts/UserContext';

// CSS
import '@/styles/globals.css';
import '@/styles/loading.css';
import '@/styles/errors.css';
import '@/styles/accordion.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import axios from 'axios';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

axios.defaults.withCredentials = true;

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  const { asPath } = useRouter();
  const { width } = useWindowDimensions();
  const [showSidebar, setShowSidebar] = useState(width >= 1024);

  const route: IRoutes | undefined = routes.find((e) => {
    return e.path.test(asPath);
  });

  useEffect(() => {
    setShowSidebar(width >= 1024);
  }, [width]);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      <UserProvider>
        <Head>
          <title>Family Dashboard</title>
        </Head>
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
    </GoogleReCaptchaProvider>
  );
}
