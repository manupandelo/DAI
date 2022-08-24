import React from "react";
import { getRecipeInformation } from "../services/PlatosClient";
import { StyleSheet, Text, View} from 'react-native';
import {ActionTypes, useContextState} from '../Context'

const Detalle = ({route, navigation})=>{
    const {id}=route.params.id;
    const [Detalle, setDetalle] = useState([]);

    console.log(id);    
    useEffect(()=>{
        getRecipeInformation(id).then((data) => {
            setDetalle(data) 
            console.log(data) 
        })
        .catch(() => {
            console.log("Datos mal")   
        })
    },[]);

    return (
        <View>
            <Text>Profesor:</Text>
    
            <FlatList
                data={Detalle}
                keyExtractor={ (item) => item.id}
                renderItem = {({item, index}) => (    
                    <View>   
                        <Text>
                            {item.nombre} {item.apellido} 
                            {item.ubicacion} {item.disponibilidad}
                        </Text>
                            <CustomButton text={"Reservar Clase"} onPress={() => navigation.navigate('ReservarClase', {
                                id: item.id,
                        })}/>
                    </View>
                )}

            />
        </View>
    )
}

export default Detalle

const styles = StyleSheet.create({
   
        
  });