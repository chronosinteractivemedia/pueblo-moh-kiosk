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

const lightCommandMap = {
  X0401: 'standby',
  X0402: 1,
  X0403: 2,
  X0404: 3,
  X0405: 4,
};

const lightGridOrder = [1, 3, 2, 4];

function LightStatusOverlay() {
  return (
    <div className="light-status-overlay" data-mode="standby">
      <div className="light-status-overlay_title">USB Lights</div>
      <div className="light-status-overlay_grid">
        {lightGridOrder.map((lightNumber) => (
          <div
            key={lightNumber}
            className="light-status-overlay_light"
            data-light-number={lightNumber}
            data-active="false"
          >
            {lightNumber}
          </div>
        ))}
      </div>
      <div className="light-status-overlay_label">
        Standby
      </div>
    </div>
  );
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
    if (document.body.requestPointerLock) {
      const pointerLockRequest = document.body.requestPointerLock();
      if (pointerLockRequest && pointerLockRequest.catch) pointerLockRequest.catch(() => {});
    }
    const onNetworkChange = (e, statusArg) => {
      console.log('GOT NETWORK CHANGE', statusArg);
      window.appIsOnline = !!statusArg;
    };
    const updateLightOverlay = (code) => {
      const activeLight = lightCommandMap[code] || null;
      const overlay = document.querySelector('.light-status-overlay');
      if (overlay) overlay.dataset.mode = activeLight === 'standby' ? 'standby' : 'lights';

      document.querySelectorAll('.light-status-overlay_light').forEach((light) => {
        light.dataset.active = `${parseInt(light.dataset.lightNumber, 10) === activeLight}`;
      });

      const label = document.querySelector('.light-status-overlay_label');
      if (label) label.innerText = activeLight === 'standby' ? 'STANDBY' : activeLight ? `Light ${activeLight}` : 'Standby';
    };
    const onLightingCommand = (e, code) => {
      updateLightOverlay(code);
    };
    const onToggleLightOverlay = (e, code) => {
      updateLightOverlay(code);
      document.documentElement.classList.toggle('show-light-debugger');
    };

    ipcRenderer.on('network-change', onNetworkChange);
    ipcRenderer.on('interrupt-timer', window.interruptResetTimer);
    ipcRenderer.on('lighting-command', onLightingCommand);
    ipcRenderer.on('toggle-light-overlay', onToggleLightOverlay);

    return () => {
      document.removeEventListener('touchstart', window.interruptResetTimer);
      ipcRenderer.removeListener('network-change', onNetworkChange);
      ipcRenderer.removeListener('interrupt-timer', window.interruptResetTimer);
      ipcRenderer.removeListener('lighting-command', onLightingCommand);
      ipcRenderer.removeListener('toggle-light-overlay', onToggleLightOverlay);
    };


  }, []);
  return <>
    <Nav />
    <LightStatusOverlay />
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
