import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import {GetPlatos} from '../services/axios';
import { useContextState } from '../Context';

const Item = ({ title, image, navigation, id}) => (
  <TouchableOpacity
    onPress={ () =>{ navigation.navigate('Detalle',{id})}}
  >
   
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={image}></Image>
    </View>

  </TouchableOpacity>
);

const Home=({navigation})=>{
  const [platos, setPlatos] = useState([]); //Setplatos le da el valor a platos
  const {contextState, setContextState} = useContextState();//Trae el contexto
  let healthscore=0
  let precio = 0
  let sumaHealth = 0
  for (let i = 0; i < contextState.platos.length; i++) { //Recorre el array de platos
      precio += contextState.platos[i].pricePerServing
      sumaHealth += contextState.platos[i].healthScore
  }
  if(sumaHealth > 0){
    healthscore = sumaHealth / contextState.platos.length // saca el promedio del healthscore
  }
  
  useEffect(() => {
    if(!contextState.token){ 
      console.log('No hay token');
      navigation.navigate("logIn")  //Si no hay token en el contexto, te manda a la pantalla de login
    }
    else{
      console.log("HAY TOKEN")
    }
  })
  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscador</Text>

        <TextInput   
          style={styles.input}
          placeholder="Buscar"
          onChangeText={text => {
            if(text.length > 2){
                GetPlatos(text).then((data) => {  //Busca la receta
                setPlatos(data) //Setea los platos
            })
            .catch(() => {
              console.log("error")   
          });
            }
          }}
      />      
      <TouchableOpacity>
      <FlatList
        data={platos}
        renderItem={({ item }) => <Item navigation={navigation} title={item.title} image={item.image} id={item.id} />} 
        keyExtractor={item => item.id}
        
      />
      </TouchableOpacity>  
      <Text style={styles.titulo}>MENU</Text>
      <Text>PRECIO: ${precio}</Text>
      <Text>PROMEDIO HEALTHSCORE: {healthscore} </Text>
      <TouchableOpacity>
      <FlatList
        data={contextState.platos}
        renderItem={({ item }) => <Item navigation={navigation} title={item.title} image={item.image} id={item.id} />} 
        keyExtractor={item => item.id}
        
      />
      </TouchableOpacity>  
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
    container:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'white',
    },
    titulo: {
      fontSize: 45,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    input:{
      backgroundColor: 'white',
      borderColor: 'black',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 5,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 12,
      justifyContent:'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 15,
    },
    image: {
      width: 70,
      height:70,
    },
  });