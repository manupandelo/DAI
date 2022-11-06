import React from "react";
import { Accelerometer } from "expo-sensors";
import { Text, View, TouchableOpacity, StyleSheet, Button } from "react-native";
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';


async function handleSend(number) {
  try {
    await SMS.sendSMSAsync(number, "Ayuda, estoy en peligro")
  } catch (e) {
    // console.error(e)
  }
}

const Home = async ({ navigation }) => {
  const [number, setNumber] = await AsyncStorage.getItem('tel_number')
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Contactos"
          onPress={() => navigation.navigate('Contact')}
        />
        <Button
          title="Hora y Temperatura"
          onPress={() => navigation.navigate('WeatherTime')}
        />
        <Button
          title="Tel. Emergencia"
          onPress={() => navigation.navigate('EmmergencyContact')}
        />
        <Button
          title="Acerca De"
          onPress={() => navigation.navigate('AboutUs')}
        />
      </View>
    );
  }

  export default Home;