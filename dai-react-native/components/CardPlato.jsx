import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, Image, Button } from 'react-native';
import { ActionTypes, useContextState } from '../Context'



const Item = ({ title, image }) => (
  <View>
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={image}></Image>
    </View>
  </View>
);

const CardPlato = (props) => {

  const { navigation, Detalle } = props
  const { contextState, setContextState } = useContextState();

  let existePlato = contextState.menu.lista.find(plato => plato.id === Detalle.id)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Detalle.title}</Text>
      <Item image={Detalle.image}/>         
      <Text>${Detalle.pricePerServing} / {Detalle.readyInMinutes} mins.</Text>
      <Text>Puntaje de Saludable: {Detalle.healthScore}</Text>
      {
        Detalle.vegan ? 
            <Text>Vegano: Sí</Text>
        :
            <Text>Vegano: No</Text>
      }
      { Detalle.vegetarian ?
          <Text>Vegetariano: Sí</Text>
      :
          <Text>Vegetariano: No</Text>
      }
      {
        Detalle.glutenFree ?
            <Text>Libre de Gluten: Sí</Text>
        :
            <Text>Libre de Gluten: No</Text>
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
                  type: ActionTypes.SetDescontarPricePerServing,
                  value: Detalle.pricePerServing,
                });

                setContextState({
                  type: ActionTypes.SetDescontarHealthScore,
                  value: Detalle.healthScore,
                });
                setContextState({
                  type: ActionTypes.SetEliminarId,
                  value: Detalle.id,
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
                console.log("Agregando al menu")
                setContextState({
                  type: ActionTypes.SetMenuPrecio,
                  value: Detalle.pricePerServing,
                });

                setContextState({
                  type: ActionTypes.SetMenuHealthScore,
                  value: Detalle.healthScore,
                });
                setContextState({
                  type: ActionTypes.SetMenuLista,
                  value: Detalle,
                });
                navigation.navigate('Home')
              }}
            />
          </>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
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
    top: '8%',
      marginLeft:'-13%',
      fontSize: 34,
      marginRight: 'auto',
      marginLeft: 'auto',
  }
});

export default CardPlato;