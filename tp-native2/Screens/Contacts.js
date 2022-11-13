import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AllContacts() {
    const [contact, setContact] = useState([]);
    const [permissionGranted, setPermissionGranted] = useState(false)
    const [guardado, setGuardado] = useState();

    useEffect(() => {
        const getGuardado = async () => {
            setGuardado(await AsyncStorage.getItem("phone"));
        }
        getGuardado();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                setPermissionGranted(true)
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });
                setContact(data)
                console.log(data[1])
            }
            else {
                setPermissionGranted(false)
            }
        })();
    }, []);

    

    return (
        <View style={styles.container}>
            {permissionGranted ? (
                <View>
                    <FlatList
                        data={contact}
                        renderItem={({ item }) => (
                            <View style={{marginVertical: 10}}>
                                <Text>{item.name}</Text>
                                {item.phoneNumbers ? (
                                    <Text>{item.phoneNumbers[0].number}</Text>
                                ) : (
                                    null
                                )}
                                {item.phoneNumbers && item.phoneNumbers[0].number == guardado ? (
                                    <Text style={{color: "green"}}>Numero de emergencia</Text>
                                ) : (
                                    null
                                )}
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>
            ) : (
                <Text sytle={styles.container}>No access to contacts</Text>
            )}
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    phoneNumbers: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
  });