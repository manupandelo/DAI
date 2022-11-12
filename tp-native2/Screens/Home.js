import React, {useEffect, useState} from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"
import EmmergencyMessage from "../Components/EmmergencyMessage.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const navigation = useNavigation();
    const [Guardado, setGuardado] = useState(false);

    useEffect(() => {
        const getGuardado = async () => {
            setGuardado(await AsyncStorage.getItem("phone"));
        }
        getGuardado();
    }, []);


    return (
        <View style={styles.container}>
            <View style={{marginVertical: 10}}>
                <Button title="Contactos" onPress={() => navigation.navigate('Contacts')}/>
            </View>
            <View style={{marginVertical: 10}}>
                <Button title="Numero de emergencia" onPress={() => navigation.navigate("SetEmmergencyPhone")}/>
            </View>
            <View style={{marginVertical: 10}}>
                <Button title="Clima" onPress={() => navigation.navigate("WeatherTime")}/>
            </View>
            <View style={{marginVertical: 10}}>
                <Button title="Nosotros" onPress={() => navigation.navigate('AboutUs')}/>
            </View>
            

            {Guardado ? (
                <EmmergencyMessage/>
            ) : (
                <Text style={{marginVertical: 10}}>No hay ningun numero de emergencia guardado</Text>
            )}
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
});
