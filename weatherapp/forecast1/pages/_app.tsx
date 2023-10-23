import React from 'react';
import App,{AppProps} from 'next/app';
import { Provider } from 'mobx-react';
import weatherStore from '../stores/store';
import   '../styles/globals.css'
//AppProps use identify component is react component and App Props is used as an object
function MyApp({ Component, pageProps }:AppProps) {
  // Additional logic or context providers can be added here
  return <Component {...pageProps} />;
}

export default MyApp;
