import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

const QRScanner = (props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      console.log(`onCodeScanned `, codes);
      console.log(`onCodeScanned value`, codes[0].value);
      props.onRead(codes[0].value);
    },
  });

  useEffect(() => {
    // exception case
    setRefresh(!refresh);
  }, [device, hasPermission]);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      console.log('Camera.requestCameraPermission ', permission);
      setHasPermission(permission === 'granted');
    };

    requestCameraPermission();

    //if it is idle for 15 secs, it will be closed
    /*
    setTimeout(() => {
      props.onRead(null);
    }, 15 * 1000);
    */
  }, []);

  if (device == null || !hasPermission) {
    return (
      <View style={styles.page2}>
        <Text style={{ backgroundColor: 'white' }}>
          Camera not available or not permitted
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.page2}>
      <Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      <View style={styles.backHeader}>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => {
            props.onRead(null);
          }}
        >
          <Text>back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'snow',
            alignItems: 'center',
          }}
          onPress={() => {
            props.onRead(null);
          }}
        >
          <Text style={{ color: 'snow', fontSize: 14 }}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  page2: {
    flex: 1,
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backHeader: {
    backgroundColor: '#00000090',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: '2%',
    height: '5%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#00000090',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '10%',
    height: '20%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
