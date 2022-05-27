import React from "react";
import styles from  './lighttest.module.scss';
import { SerialPort } from 'serialport';

export default function LightingTest(){
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
  return <div className={styles.component}>
    <button onClick={() => sendSerialCommand('X0401')}>Standbye</button> 
    <button onClick={() => sendSerialCommand('X0402')}>Uniform One</button> 
    <button onClick={() => sendSerialCommand('X0403')}>Uniform Two</button> 
    <button onClick={() => sendSerialCommand('X0404')}>Uniform Three</button> 
    <button onClick={() => sendSerialCommand('X0405')}>Uniform Four</button> 
    </div>
}

  /*

    X0401 – Standby mode (All ON?)
  X0402 – Uniform 1 on, all others dimmed
  X0403 – Uniform 2 on, all others dimmed
  X0404 – Uniform 3 on, all others dimmed
  X0405 – Uniform 4 on, all others dimmed

  When “X0401” is received, the iPlayer3 will send a response “Y0401”
  When “X0402” is received, the iPlayer3 will send a response “Y0402”
  When “X0403” is received, the iPlayer3 will send a response “Y0403”
When “X0404” is received, the iPlayer3 will send a response “Y0404”
When “X0405” is received, the iPlayer3 will send a response “Y0405”

*/

(async () => {

})();

