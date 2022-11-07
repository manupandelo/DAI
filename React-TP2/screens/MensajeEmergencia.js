import React, { useState, useContext } from "react";
import { Accelerometer } from "expo-sensors";
import Context from "../contexts/Context";
import * as SMS from 'expo-sms';

async function handleSend(emmergencynumber) {
    try {
      await SMS.sendSMSAsync(emmergencynumber, "Ayuda! Estoy en peligro!");
    } catch (e) {
      // console.error(e)
    }
}

export default function MensajeEmergencia() {
  const { number, setNumber } = useContext(Context);

  const configureShake = onShake => {
    Accelerometer.removeAllListeners();
    Accelerometer.setUpdateInterval(100);
    
    const onUpdate = ({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      
      const sensibility = 2.0;
      if (acceleration >= sensibility) {
        onShake(acceleration);
      }
    };
    
    Accelerometer.addListener(onUpdate);
  };

  configureShake(acceleration => {
    handleSend(number)
    console.log("shake with acceleration " + acceleration);  
  });

  return (<></>);
}