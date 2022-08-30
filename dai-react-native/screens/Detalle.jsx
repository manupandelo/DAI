import React, { Component, useEffect, useState, FlatList } from 'react';
import { StyleSheet, Text, View, TextInput, Div } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardPlato from '../Components/CardPlato';
import { getRecipeInformation } from '../services/platosClient';


const DetallePlato = ({ route, navigation }) => {
  const { id } = route.params;
  const [Detalle, setDetalle] = useState([]);


  useEffect(() => {
    getRecipeInformation(id).then((data) => {
      setDetalle(data)
      console.log(data)
    })
      .catch(() => {
        console.log("Datos mal")
      })
  }, [])

  return (

    <View>

      <CardPlato navigation={navigation} Detalle={Detalle}></CardPlato>


    </View>

  );
}
export default DetallePlato

const styles = StyleSheet.create({


});