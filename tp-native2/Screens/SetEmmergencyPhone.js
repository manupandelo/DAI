import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContextState, ActionTypes } from "../context";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Button, Image, View, TextInput } from "react-native";

export default function SetEmmergencyPhone() {
    const { contextState, setContextState } = useContextState();
    const [phone, setPhone] = useState(contextState.phone);
    const [error, setError] = useState(false);

    const savePhone = async () => {
        if (phone.length < 10) {
            setError(true);
        } else {
            setError(false);
            setContextState({ type: ActionTypes.SetPhone, value: phone });
            await AsyncStorage.setItem('phone', phone);
        }
    }

    return (
        <View>
            <Text>Numero Guardado: {contextState.phone}</Text>
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
        flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    error: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red',
    },
});
