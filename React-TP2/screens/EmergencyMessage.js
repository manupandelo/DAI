import React, { useState, useContext } from "react";
import { Accelerometer } from "expo-sensors";
import { Text, View, TouchableOpacity } from "react-native";
import Context from "../contexts/Context";
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function handleSend(emNumber) {
    try {
      await SMS.sendSMSAsync(emNumber, "* Inserte mensaje de Emergencia *")
    } catch (e) {
      // console.error(e)
    }
}

const EmergencyMessage = () => {
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

  return (
    <View style="container">
      <Text>Shake to send SMS</Text>
    </View>
  );
}

export default EmergencyMessage;

StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});