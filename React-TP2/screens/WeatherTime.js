import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, Button, RefreshControl } from "react-native";
import * as Location from 'expo-location';
import axios from "axios";
import moment from "moment";
require('moment/locale/es-mx');

const GetWeather = async (location) => {
    const API_KEY = "0e54bad46d4fb603caa6dbe45db4c31d"
    const url = "https://api.openweathermap.org/data/2.5/weather"

    moment.locale("es-mx")

    return await axios.get(url, {
        params: {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            lang: 'es',
            units: 'metric',
            appid: API_KEY
        }
    })
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
    .catch((error) => {
        return console.log(error)
    });
}

const WeatherTime = async () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [weather, setWeather] = useState();
    const [permissionGranted, setPermissionGranted] = useState(false)
  
    moment.locale("es-mx")
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
    
    if(permissionGranted){
        if(weather){
            console.log("entra")
            return( 
                    <>
                        <Text style={styles.text}>{moment().format('LLLL')}</Text>
                        <Text style={styles.text}>{weather.description}</Text>
                        <Text>{weather.sys.country} - {weather.name}</Text>
                        <Text>La temperatura actual es de {weather.main.temp}°C</Text>
                        <Text>La temperatura máxima es de {weather.main.temp_max}°C</Text>
                        <Text>La temperatura mínima es de {weather.main.temp_min}°C</Text>
                        <Text>La humedad es de {weather.main.humidity}%</Text>
                        <Text>La velocidad del viento es de {weather.wind.speed}m/s</Text>
                    </>
            )
        }else{
            return(
                <>
                    <Text style={styles.text}>Hoy es {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text>
                    <Text style={styles.text}>Cargando...</Text>
                </>
            )
        }
    }else{
        return(
            <>
                <Text style={styles.text}>Hoy es {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text>
                <Text style={styles.text}>No se puede obtener la ubicación porque no se han otorgado los permisos necesarios a la aplicacion</Text>
            </>
        )
    }

}

export default WeatherTime

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: 10000
    },
});