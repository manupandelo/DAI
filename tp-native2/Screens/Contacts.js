import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

function getContacts() {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }
      }
    })();
  }, []);

}

export default function AllContacts() {
    const [contact, setContact] = useState([]);
    const [permissionGranted, setPermissionGranted] = useState(false)
    
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
        <View>
            {permissionGranted ? (
                <View>
                    <FlatList
                        data={contact}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item.name}</Text>
                                {item.phoneNumbers && item.phoneNumbers.map((phone) => (
                                    <Text>{phone?.number}</Text>
                                ))}
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