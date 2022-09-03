import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button} from 'react-native';
import {useContextState, ActionTypes } from '../Context'
import {enterLogin} from '../services/axios';
 
const LogIn = ({navigation}) => {
  const { contextState, setContextState } = useContextState();
  const [userState, setUserState] = useState({  //Crea el objeto UserState y se aclara que este tiene email y password
    email: '',
    password: '',
  });
  
  const onLogInPress = async () => {
    
    if (!userState.email|| !userState.password){  //Si el email o el password no estan completos, muestra por consola q faltan datos
      console.log("Por favor ingresar todos los datos")
    } else {
      console.log("datos completos, entra a loguearse")
      enterLogin(userState).then((token)=>{     //Si los datos estan completos, llama a la funcion enterlogin y le pasa el objeto userState
        setContextState({
          type: ActionTypes.SetToken,
          value: token
        })                                      //Si esta bien, devuelve el token y lo Guarda el token en el contextState
        console.log("entro")
        navigation.navigate("Home")             //Si esta bien, te manda a la pantalla Home
      })
      .catch(() => {
        console.log("Error contraseña o email") //Si esta mal, te muestra por consola que hay un error
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
        onChangeText={text => setUserState({...userState, email: text}) } //Cambia el valor del email
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

export default LogIn;

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
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});