import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import MainStack from './navigation/MainStack';
import * as Font from 'expo-font';
import { ContextProvider } from './Context';


export default function App() {
  
  return (
   
    <ContextProvider> <MainStack/> </ContextProvider>
    

  );

}
