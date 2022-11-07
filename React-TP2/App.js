import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import Contactos from './screens/Contactos';
import AboutUs from './screens/AboutUs';
import WeatherTime from './screens/WeatherTime';
import CelularEmergencia from './screens/CelularEmergencia';
import MensajeEmergencia from './screens/MensajeEmergencia';
import Context from './contexts/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Home({ navigation }) {
  const { number, setNumber } = useContext(Context);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Contactos"
        onPress={() => navigation.navigate('Contactos')}
      />
      <Button
        title="WeatherTime"
        onPress={() => navigation.navigate('Hora y Temperatura')}
      />
      <Button
        title="Celular de Emergencia"
        onPress={() => navigation.navigate('Celular de Emergencia')}
      />
      <Button
        title="About Us"
        onPress={() => navigation.navigate('About Us')}
      />
      { 
        number ?
            <MensajeEmergencia/>
        :
          null 
      }
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [number, setNumber] = useState(null)

  const getData = async () => {
    try {
      setNumber(null)
      const value = await AsyncStorage.getItem('tel_number')
      if(value !== null) {
        setNumber(value)
      }
    } catch(e) {
        console.log(e)
    }
  }

  useEffect(() => {
    (async () => {
      getData()
    })();
  }, []);

  return (
    <>
      <Context.Provider value={{ number, setNumber }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Inicio" component={Home} />
            <Stack.Screen name="Contactos" component={Contactos} />
            <Stack.Screen name="Hora y Temperatura" component={WeatherTime} />
            <Stack.Screen name="Celular de Emergencia" component={CelularEmergencia} />
            <Stack.Screen name="About Us" component={AboutUs} />
          </Stack.Navigator>
        </NavigationContainer>
      </Context.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
