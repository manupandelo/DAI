import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, Button} from 'react-native';
import {enterlogin} from '../services/axios';
 
const logIn = () => {
  const { setToken } = useContext(authContext);
  const [userState, setUserState] = useState({
    email: '',
    password: '',
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inicio de sesión</Text> 
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={userState.email}
        onChangeText={text => setUserState({...userState, email: text}) }
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={userState.password}
        secureTextEntry={true}
        onChangeText={text => setUserState({...userState, password: text})}
      />   
      <Button
        title="Iniciar sesion"
        onPress={async () => {
          if (!userState.email || !userState.password) {
              console.log('llenar todos los datos');
          } else {
              const res = await enterlogin(userState.email, userState.password);
              setToken(res)
          }
        }}
      ></Button>
    </View>  
  );
}

export default logIn;

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
