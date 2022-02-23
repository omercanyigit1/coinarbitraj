import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '@/src/app/store';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';

function MyApp({
  Component, pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);