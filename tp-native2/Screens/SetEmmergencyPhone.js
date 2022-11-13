import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Button, Image, View, TextInput } from "react-native";

export default function SetEmmergencyPhone() {
    const [phone, setPhone] = useState();
    const [error, setError] = useState(false);
    const [Guardado, setGuardado] = useState(false);

    useEffect(() => {
        const getGuardado = async () => {
            setGuardado(await AsyncStorage.getItem("phone"));
        }
        getGuardado();
    }, []);
    
    const savePhone = async () => {
        if (phone.length < 10) {
            setError(true);
        } else {
            setError(false);
            await AsyncStorage.setItem('phone', phone);
            setGuardado(await AsyncStorage.getItem("phone"));
        }
    }

    return (
        <View>
            <Text style={styles.medio}>Numero Guardado: {Guardado}</Text>
            <TextInput
                style={styles.input}
                placeholder="Celular de emergencia"
                onChangeText={setPhone}
                value={phone}
                keyboardType="numeric"
            />
            <Button title="Guardar" onPress={savePhone} />
            {error && <Text style={styles.error}>El celular debe de tener minimo 10 digitos</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        marginVertical: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 50,
        alignSelf: "center",
    },
    error: {
        alignSelf: "center",
        color: 'red',
    },
    medio: {
        alignSelf: 'center',
        marginVertical: 20,
    },
});
