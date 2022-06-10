import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
const { ipcMain, BrowserView } = require('electron')
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1920,
    height: 1080,
    kiosk: false,
    frame: true
  });

  mainWindow.removeMenu();

  if (isProd) {
    await mainWindow.loadURL('app://./index.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
    // mainWindow.webContents.openDevTools();
  }
    const externalFrame = new BrowserView()
    ipcMain.on('show-external', (event, person) => {
      mainWindow.addBrowserView(externalFrame);
      externalFrame.setBounds({ x: 370, y: 0, width: 1550, height: 1080})
      const url = person ? `https://www.cmohs.org/kiosk/recipients/${person}` : `https://www.cmohs.org/kiosk/recipients`;
      externalFrame.webContents.loadURL(url)
    });
    ipcMain.on('hide-external', () => {
      mainWindow.removeBrowserView(externalFrame);
    })
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('close-me', (event, arg) => {
  app.quit();
})
