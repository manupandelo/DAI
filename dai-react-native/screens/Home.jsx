import React, { Component, useEffect, useState, FlatList} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {searchRecipe} from '../services/PlatosClient';
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
    </View>
    
  );
}
export default Home

const styles = StyleSheet.create({
   
    titulo: {
      top: '8%',
      marginLeft:'-13%',
      fontSize: 34,
      marginRight: 'auto',
      marginLeft: 'auto',
      },

      input: {
        fontSize: 18,
          marginTop:'5%',
          marginLeft:'0%',
          width: '80%',
          borderWidth: 2,
          padding:'3%',
          top: '8%',
        },

        alerta: {
          top: '80%',
          marginLeft:'-13%',
          fontSize: 34,
          marginRight: 'auto',
          marginLeft: 'auto',
          color: 'red',
          },
        
  });