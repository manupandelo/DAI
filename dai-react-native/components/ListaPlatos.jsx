import React from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';

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

const ListaPlatos = (props) => {

  const {navigation, platos} = props

  return (
    <TouchableOpacity>
      <FlatList
        data={platos}
        renderItem={({ item }) => <Item navigation={navigation} title={item.title} image={item.image} id={item.id} />} 
        keyExtractor={item => item.id}
        
      />
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 15,
  },
  image: {
    width: 70,
    height:70,
  },
});

export default ListaPlatos;