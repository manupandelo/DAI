import React, { useState, useEffect } from "react";
import { Accelerometer } from "expo-sensors";
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function handleSend() {
    try {
      const Guardado = await AsyncStorage.getItem("phone");
      await SMS.sendSMSAsync(Guardado, " Ayuda! Estoy en peligro!");
    } catch (e) {
      // console.error(e)
    }
}

export default function EmmergencyMessage() {

  const configureShake = onShake => {
  Accelerometer.setUpdateInterval(100);  

    const onUpdate = ({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const sensibility = 1.8;
      if (acceleration >= sensibility) {
        onShake(acceleration);
      }
    };
  
    Accelerometer.addListener(onUpdate);
  };

  //usage:
  configureShake(acceleration => {
    console.log("shake with acceleration " + acceleration);
    handleSend();
  });

  return (<></>);
}