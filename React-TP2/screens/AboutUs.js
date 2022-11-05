import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

function Camara() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        alert(data);
    };

    if (hasPermission === null) {
        return <Text>Pidiendo permiso para usar la Cámara</Text>;
    }
    if (hasPermission === false) {
        return <Text>La aplicacion no tiene permiso para usar la cámara</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Volver a Escanear'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const AboutUs = () =>{
    return (
        <View>
            <Image source={require('../frame.png')}/>
            <View style={styles.camara}>
                <Camara/>
            </View>
        </View>
    );
}

export default AboutUs;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    
    camara: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        height: 1000,
        width: 1000
    }
});