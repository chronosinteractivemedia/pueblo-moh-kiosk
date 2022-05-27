import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
const { ipcMain } = require('electron')
const isProd = process.env.NODE_ENV === 'production';
import { SerialPort } from 'serialport';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1080,
    height: 1920,
    kiosk: false,
    frame: true
  });

  mainWindow.removeMenu();

  if (isProd) {
    await mainWindow.loadURL('app://./lighting-test.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('close-me', (event, arg) => {
  app.quit();
})


ipcMain.on('send-serial-command', (event, code) => {
  async function sendSerialCommand(code){
    const ports = await SerialPort.list();
    const port = ports[0];
    if(port){
      const serialport = new SerialPort({ path: port.path, baudRate: 9600 });
      serialport.write(code, err => {
        if(err) console.error(err);
        else console.log('message send successful');
      });
    }
  }
  sendSerialCommand(code);
})
