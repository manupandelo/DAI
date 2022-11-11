import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native"

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Button title="Contactos" onPress={() => navigation.navigate('Contacts')}/>
            <Button title="Nosotros" onPress={() => navigation.navigate('AboutUs')}/>
            <Button title="Clima" onPress={() => navigation.navigate("WeatherTime")}/>
            <Button title="Numero de emergencia" onPress={() => navigation.navigate("SetEmmergencyPhone")}/>
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
