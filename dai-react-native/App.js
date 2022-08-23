import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import MainStack from './navigation/MainStack';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  
  return (
   
    <SafeAreaProvider> <MainStack/> </SafeAreaProvider>
    

  );

}
