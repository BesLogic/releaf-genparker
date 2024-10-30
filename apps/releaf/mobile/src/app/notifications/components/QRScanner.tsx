import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { styled } from 'nativewind';

const SCamera = styled(Camera);
const SView = styled(View);
const SText = styled(Text);

const QRScanner = (props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const device = useCameraDevice('back');
  // const device = null;

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
      <SView className="h-52 mt-5 bg-slate-200">
        <SText className="m-auto text-black">
          Camera not available or not permitted
        </SText>
      </SView>
    );
  }

  return (
    <SCamera
      codeScanner={codeScanner}
      className="h-52 mt-5"
      device={device}
      isActive={true}
    />
  );
};

export default QRScanner;
