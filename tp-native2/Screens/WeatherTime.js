import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet} from "react-native";
import * as Location from 'expo-location';
import axios from "axios";

async function GetWeather(location) {
    const API_KEY = "18ea3d94313c9b53579363009d844af9"
    return await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + location.coords.latitude + "&lon=" + location.coords.longitude + "&appid=" + API_KEY + "&units=metric&lang=es")
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return console.log(error)
    });
}

export default function WeatherTime() {
    const [weather, setWeather] = useState();
    const [permissionGranted, setPermissionGranted] = useState(false)

    useEffect(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            setPermissionGranted(true)

            let location = await Location.getCurrentPositionAsync({});
            GetWeather(location).then(response => {setWeather(response)})
            get
        } else {
            setPermissionGranted(false)
        }
      })();
    }, []);
  
    

    return (
        <View style={styles.container}>
            { permissionGranted ?
                <View>
                    {
                        weather ? (
                            <>
                                <Text>{weather.name}, {weather.sys.country}</Text>
                                <Text>{weather.weather[0].description}</Text>
                                <Text>Temperatura: {Math.round(weather.main.temp)}C°</Text>
                                <Text>Temperatura Max: {Math.round(weather.main.temp_max)}C°</Text>
                                <Text>Temperatura Min: {Math.round(weather.main.temp_min)}C°</Text>
                                <Text>Sensación Térmica: {Math.round(weather.main.feels_like)}C°</Text>
                                <Text>Humedad: {weather.main.humidity}%</Text>
                            </>
                        )
                        :
                            <Text>Waiting...</Text>
                    }
                </View>
            :
                <View>
                    <Text>No access to Location</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});