import App from "next/app";
import './global.scss';
import "react-image-gallery/styles/scss/image-gallery.scss";
import Nav from '../components/Nav/Nav';
import SecretClose from '../components/SecretClose/SecretClose';
import axios from 'axios';
//import { apiUrl } from "../config";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ipcRenderer } from "electron";

if(typeof window !== 'undefined'){
    window.trackEvent = (key) => {
      console.log('tracking: ', key);
      axios.post('https://pueblo-moh-analytics.herokuapp.com/events', {event: key});
    }
}

export default function MyApp({Component, pageProps, menuItems}){
  const router = useRouter();
  useEffect(() => {
    window.interruptResetTimer = () => {
      if(window.resetTimer) clearTimeout(window.resetTimer);
      window.resetTimer = setTimeout(() => {
        router.push('/');
      }, 60000 * 6);
    };
    document.addEventListener('touchstart', window.interruptResetTimer);
    document.body.requestPointerLock();
    ipcRenderer.on('network-change', (e, statusArg) => {
      console.log('GOT NETWORK CHANGE', statusArg);
      window.appIsOnline = !!statusArg;
    });
    ipcRenderer.on('interrupt-timer', window.interruptResetTimer);


  }, []);
  return <>
    <Nav />
    <Component {...pageProps} />
    <SecretClose />
  </>
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  //const res = await fetch(`${apiUrl}/menu`);
  //const data = await res.json();
  return { ...appProps, menuItems: [] } /* menuItems: data */
}
