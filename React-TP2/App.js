import React from 'react';
import Home from './screens/Home';
import Contact from './screens/Contact';
import AboutUs from './screens/AboutUs';
import WeatherTime from './screens/WeatherTime';
import EmergencyContact from './screens/EmergencyContact';
import EmergencyMessage from './screens/EmergencyMessage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContextProvider } from './contexts/Context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <ContextProvider>
        <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Inicio" component={Home} />
              <Stack.Screen name="Contact" component={Contact} />
              <Stack.Screen name="WeatherTime" component={WeatherTime} />
              <Stack.Screen name="EmmergencyContact" component={EmergencyContact} />
              <Stack.Screen name="AboutUs" component={AboutUs} />
            </Stack.Navigator>
          </NavigationContainer>
      </ContextProvider>
    </>
  );
}
