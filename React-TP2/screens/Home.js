import { View, Button } from "react-native";

const Home = ({ navigation }) => {
    const { number, setNumber } = useContext(configTelContext);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Contactos"
          onPress={() => navigation.navigate('Contactos')}
        />
        <Button
          title="Hora y Temperatura"
          onPress={() => navigation.navigate('Hora y Temperatura')}
        />
        <Button
          title="Tel. Emergencia"
          onPress={() => navigation.navigate('Teléfono de Emergencia')}
        />
        <Button
          title="Acerca De"
          onPress={() => navigation.navigate('Acerca De')}
        />
        { 
          number ?
              <EmergSms />
          :
            null 
        }
      </View>
    );
  }

  export default Home;