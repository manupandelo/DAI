import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { getPlatoByID } from '../services/axios';
import {useContextState, ActionTypes } from '../Context'


const DetallePlato = ({ route, navigation }) => {
  const { id } = route.params;           //Trae el id del plato elegido
  const [plato, setPlato] = useState([]); //Setplatos le da el valor a platos
  const {contextState, setContextState} = useContextState() //Trae el contexto

  useEffect(() => {
    if(!contextState.token){
      navigation.navigate("logIn") //Si no hay token en el contexto, te manda a la pantalla de login
    }
    console.log("HAY TOKEN")
    getPlatoByID(id).then((data) => {      //Busca la receta con el id
      setPlato(data)  //Setea los platos
      console.log(data)
    })
      .catch(() => {
        console.log("Datos mal")
      })
  }, [])

  let existePlato = contextState.platos.find(item => item.id === plato.id)   //Busca si el plato ya esta en el menu

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plato.title}</Text>
      <Image style={styles.image} source={ plato.image }></Image>         
      <Text>Health Score: {plato.healthScore}</Text>
      <Text>${plato.pricePerServing}</Text>
      {
        plato.vegan ? 
            <Text>Vegano: Sí</Text>
        :
            <Text>Vegano: No</Text>
      }
      { plato.vegetarian ?
          <Text>Vegetariano: Sí</Text>
      :
          <Text>Vegetariano: No</Text>
      }
      {
        existePlato
          ?
          <>
            <Button style={{ fontSize: 48 }}
              title="ELIMINAR"
              onPress={async () => {
                console.log("Eliminando del menu")
                setContextState({
                  type: ActionTypes.SetEliminarId,         //Elimina el plato del menu
                  value: plato.id,                     //Setea el id del plato a eliminar               
                });
                navigation.navigate('Home')
              }}
            />
          </>
          :
          <>
            <Button
              title="AGREGAR"
              onPress={async () => {
                let countVegan = 0;
                let countNoVegan = 0;

                for (let i = 0; i < contextState.platos.length; i++) {
                  if(contextState.platos[i].vegan){
                    countVegan++;
                  }else{
                    countNoVegan++;
                  }
                }
                if(countVegan==2 && countNoVegan==2){
                  console.log("No se pueden agregar más platos")
                }
                else{
                  if(plato.vegan){
                    if(countVegan==2){
                      console.log("No se pueden agregar más platos veganos")
                    }
                    else{
                      console.log("Agregando al menu")
                      setContextState({
                        type: ActionTypes.SetPlatos,         //Agrega el plato al menu
                        value: plato,                     //Setea el plato a agregar               
                      });
                      navigation.navigate('Home')
                    }
                  }
                  else{
                    if(countNoVegan==2){
                      console.log("No se pueden agregar más platos no veganos")
                    }else{
                      console.log("Agregando al menu")
                      setContextState({
                        type: ActionTypes.SetPlatos,         //Agrega el plato al menu
                        value: plato,                     //Setea el plato a agregar               
                      });
                      navigation.navigate('Home')
                    }
                  }
                }
              }}
            />
          </>
      }
    </View>

  );
}
export default DetallePlato

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  image: {
    width: 300,
    height: 300,
  },
  title:{
    fontSize: 45,
    marginRight: 'auto',
    marginLeft: 'auto',
  }
});