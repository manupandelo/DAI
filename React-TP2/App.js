import React from 'react';
import Home from './screens/Home';
import Contacts from './screens/Contacts';
import AboutUs from './screens/AboutUs';
import WeatherTime from './screens/Weather&Time';
import EmergencyContact from './screens/EmergencyContact';
import EmergencyMessage from './screens/EmergencyMessage';
import Context from './contexts/Context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Context.Provider value={{ number, setNumber }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Inicio" component={Home} />
            <Stack.Screen name="Contactos" component={Contacts} />
            <Stack.Screen name="Hora y Temperatura" component={WeatherTime} />
            <Stack.Screen name="Teléfono de Emergencia" component={EmergencyContact} />
            <Stack.Screen name="Acerca De" component={AboutUs} />
            <Stack.Screen name="Mensaje de Emergencia" component={EmergencyMessage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Context.Provider>
    </>
  );
}
