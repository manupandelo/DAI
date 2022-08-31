import React, { Component, useEffect, useState, FlatList} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {searchRecipe} from '../services/axios';
import ListaPlatos from '../Components/ListaPlatos';

const Home =({navigation})=>{
  const [platos, setPlatos] = useState([]); //Setplatos le da el valor a platos

  return (
    <View>
      <Text style={styles.titulo}>Buscador de Platos</Text>

        <TextInput   
          style={styles.input}
          placeholder="Ingrese plato"

          onChangeText={text => {
            if(text.length > 2){
                searchRecipe(text).then((data) => {
                setPlatos(data)
            })
            .catch(() => {
              console.log("datos mal")   
          });
            }
          }}
      />      
      <ListaPlatos navigation={navigation} platos={platos}></ListaPlatos>
      <Text style={styles.titulo}>MENU</Text>
      <Menu></Menu>

    </View>
  );
}
export default Home

const styles = StyleSheet.create({
    container:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
      top: '8%',
      marginLeft:'-13%',
      fontSize: 34,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    input:{
      backgroundColor: 'white',
      borderColor: 'black',
      borderRadius: 5, //lo curva del borde
      paddingHorizontal: 10,
      marginVertical: 5,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10
    } 
  });