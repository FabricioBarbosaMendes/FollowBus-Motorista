import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import { postVehicleLocation } from './service';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [posting, setPosting] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState(null);
  const [startPosting, setStartPosting] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(true);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const postLocation = async () => {
    try {
      getPermissions();
      getPermissionsBackgroud();

      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}, QR: ${qrCodeValue}`);

      await postVehicleLocation(qrCodeValue, latitude, longitude);
    } catch (error) {
      console.error('Erro ao postar localização:', error);
    }
  };
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Permissao:'+status)
      if (status !== 'granted') {
        Alert.alert('Ops!', 'Permissão de acesso à localização negada.');
        setPosting(false);
        return;
      }
  }

  const getPermissionsBackgroud = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    console.log('Permissao backgroud:'+status)
    if (status !== 'granted') {
      Alert.alert('Ops!', 'Permissão de acesso à localização negada.');
      setPosting(false);
      return;
    }
  }
  useEffect(() => {
    let intervalId;

    if (startPosting) {
      intervalId = setInterval(postLocation, 5000);
      console.log('Começou a postagem periódica');

      Location.startLocationUpdatesAsync('VehicleLocationUpdateTask', {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 5000,
        distanceInterval: 10,
        deferredUpdatesInterval: 5000,
        showsBackgroundLocationIndicator: true,
      });

      Location.hasStartedLocationUpdatesAsync('VehicleLocationUpdateTask').then((hasStarted) => {
        if (hasStarted) {
          postLocation();
        } else {
          console.log('Não foi possível iniciar as atualizações de localização em segundo plano');
        }
      });
    } else {
      clearInterval(intervalId);
      console.log('Parou a postagem periódica');

      Location.stopLocationUpdatesAsync('VehicleLocationUpdateTask');
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startPosting]);

  const handleBarCodeScanned = ({ type, data }) => {
    if (!posting) {
      setQRCodeValue(data);
      setPosting(true);
      setStartPosting(true);
      postLocation();
      setScanned(true);
      setCameraOpen(false);
    }
  };

  const stopPosting = () => {
    setPosting(false);
    setStartPosting(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{
      width: "100%",
      height: "60%",
      flexDirection: "column",
      justifyContent: "flex-end",
      marginTop: "20%",
      zIndex:99
    }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={cameraOpen ? StyleSheet.absoluteFillObject : { display: 'none' }}
      />
    </View>
  );
}