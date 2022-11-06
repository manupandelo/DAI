import React, { useEffect, useState, useContext } from 'react';
import * as Contacts from 'expo-contacts';
import { FlatList, Button, View, Text } from 'react-native';
import Contacto from '../components/contacto';
import { useContextState } from '../contexts/Context';


const Contact = () => {
    const [contactos, setContactos] = useState([])
    const [permissionGranted, setPermissionGranted] = useState(false)
    const { contextState, setContextState } = useContextState();

    const renderItem = ({ item }) => (
      <Contacto data={item} emNumber={contextState.numbernumber} />
    )
    
    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync()
        if (status === 'granted') {
          setPermissionGranted(true)

          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
  
          setContactos(data);
        } else {
          setPermissionGranted(false)
        }
      })();
    }, []);

    return (
      <View>
        { permissionGranted ?
          <FlatList
              data={contactos}
              renderItem={renderItem}
              keyExtractor={item => item.id}
          />
        :
          <View>
              <Text>La aplicación no tiene permiso para ver los contactos</Text>
          </View>
        }
      </View>
    )
}

export default Contact;