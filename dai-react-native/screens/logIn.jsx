import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import BotonOne from "../components/BotonOne";
import { useNavigation } from '@react-navigation/native';

import {enterlogin} from '../services/loginService';
import Girador from '../components/girador';

const logIn =({navigation})=>{
 
  const [userState, setUserState] = useState({
    email: '',
    password: '',
  });

  const [loaded, setLoaded] = useState(false)

  const onLogInPress = async (e) => {
    
    if (!userState.email|| !userState.password){
      
      Alert.alert("Por favor ingresar todos los datos")
    } else {
      setLoaded(true)
      await enterlogin(userState).then(() => {
        setLoaded(false)
        Alert.alert("correctooooo")
        navigation.navigate("Home")
      })
      .catch(() => {
        setLoaded(false)
        Alert.alert("Datos incorrectos")
      });
    }
  }


 

  return (


          <View style={styles.container}>
            {loaded && <Girador/>}
  
        <Text style={styles.titulo}>Inicio de sesión</Text>
        
        <TextInput
            style={styles.textInput}
            
            placeholder="Ingrese su Email"
            name="Email"
            value={userState.email}
            onChangeText={text => setUserState({...userState, email: text}) }
          
          />
          
          <TextInput
            style={styles.textInput}
            placeholder="Ingrese su Password"
            name="Password"
            value={userState.password}
            secureTextEntry={true}
            onChangeText={text => setUserState({...userState, password: text})}
          />   
          
          <BotonOne
            text="Iniciar Sesion"
            title="Iniciar Sesion"
            onPress={onLogInPress}
            />
            
 
 </View>  
  );
}

export default logIn

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height:'100%',
  },
  titulo: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'blue',
    fontSize:25,
    fontFamily: 'Kanit-Regular'
  },
  texto:{
    marginTop:'-25%',
    color: 'white'
  },
  textInput: {
    borderWidth: 1,
    padding: 15,
    width: "80%",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 15,
    marginBottom: -5
  }
});
