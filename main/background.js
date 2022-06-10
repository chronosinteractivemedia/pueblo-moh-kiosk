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
    kiosk: true,
    frame: false
  });

  mainWindow.removeMenu();

  if (isProd) {
    await mainWindow.loadURL('app://./index.html');
    mainWindow.webContents.openDevTools();
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('close-me', (event, arg) => {
  app.quit();
})

let serialport;
(async () => {
	const ports = await SerialPort.list();
  console.log(ports);
	const port = ports[1];
  serialport = new SerialPort({ path: port.path, baudRate: 9600 });
})();

ipcMain.on('send-serial-command', (event, code) => {
  async function sendSerialCommand(code){
    console.log('sending code: ', code);
    if(serialport){
      serialport.write(code, err => {
        if(err) console.error(err);
        else console.log('message send successful');
      });
    }
  }
  sendSerialCommand(code);
})
