import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function AllContacts() {
    const [contact, setContact] = useState([]);
    const [permissionGranted, setPermissionGranted] = useState(false)
    const [Guardado, setGuardado] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                setPermissionGranted(true)
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });
                setContact(data)
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