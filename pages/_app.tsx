import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '@/src/app/store';

function MyApp({
  Component, pageProps,
}: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;