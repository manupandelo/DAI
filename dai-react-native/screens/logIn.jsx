import { DarkTheme } from '@react-navigation/native';
import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, Button} from 'react-native';
import Context from '../Context';
import {useContextState, ActionTypes } from '../Context'
import {enterlogin} from '../services/axios';
 
const logIn = ({navigation}) => {
  const { contextState, setContextState } = useContextState();
  const [userState, setUserState] = useState({
    email: 'challenge@alkemy.org',
    password: 'react',
  });
  
  const onLogInPress = async () => {
    
    if (!userState.email|| !userState.password){
      console.log("Por favor ingresar todos los datos")
    } else {
      console.log("datos completos, entra a loguearse")
      enterlogin(userState).then((token)=>{
        setContextState({
          type: ActionTypes.SetToken,
          value: token
        })
        console.log("entro")
        navigation.navigate("Home")
      })
      .catch(() => {
        console.log("Error contraseña o email")
        Alert.alert("Datos incorrectos")
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inicio de sesión</Text> 
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userState.email}
        onChangeText={text => setUserState({...userState, email: text}) }
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={userState.password}
        secureTextEntry={true}
        onChangeText={text => setUserState({...userState, password: text})}
      />   
      <Button
        title="Iniciar sesion"
        onPress={onLogInPress}
      ></Button>
    </View>  
  );
}

export default logIn;

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex:1,
      backgroundColor:'white',
  },
  input:{
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5, //lo curva del borde
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});