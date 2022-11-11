import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet} from "react-native";
import * as Location from 'expo-location';
import axios from "axios";

async function GetWeather(location) {
    const API_KEY = "0e54bad46d4fb603caa6dbe45db4c31d"

    return await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + location.coords.latitude + "&lon=" + location.coords.longitude + "&appid=" + API_KEY + "&units=metric&lang=es")
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return console.log(error)
    });
}

export default function WeatherTime() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [weather, setWeather] = useState();
    const [permissionGranted, setPermissionGranted] = useState(false)

    useEffect(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            setPermissionGranted(true)

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        } else {
            setPermissionGranted(false)
        }
  
      })();
    }, []);
  
    useEffect(() => {
        (async () => {
            let text = 'Waiting..';
            if (errorMsg) {
                text = errorMsg;
                return null
            } else if (location) {
                GetWeather(location).then(response => {setWeather(response)})
            }
        })();
    }, [location]);

    return (
        <View style={styles.container}>
            { permissionGranted ?
                <View>
                    {
                        weather && weather ? (
                            <>
                                <Text>{weather.name}, {weather.sys && weather.sys.country}</Text>
                                <Text style={{textTransform: 'capitalize'}}>{weather.weather && weather.weather[0].description}</Text>
                                <Text>Temperatura: {weather.main && Math.round(weather.main.temp)}C°</Text>
                                <Text> Temperatura Max: {weather.main && Math.round(weather.main.temp_max)}C°</Text>
                                <Text>Temperatura Min: {weather.main && Math.round(weather.main.temp_min)}C°</Text>
                                <Text> Sensación Térmica: {weather.main && Math.round(weather.main.feels_like)}C°</Text>
                                <Text>Humedad: {weather.main && weather.main.humidity}%</Text>
                            </>
                        )
                        :
                            <Text>Obteniendo Temperatura...</Text>
                    }
                </View>
            :
                <View>
                    <Text>La aplicación no tiene permiso para usar la ubicación</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignitems: "center",
    },
});