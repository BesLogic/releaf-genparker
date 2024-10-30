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
  const [isLoading, setIsLoading] = useState(true);

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
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      console.log('Camera.requestCameraPermission ', permission);
      setHasPermission(permission === 'granted');
    };

    requestCameraPermission();

    setTimeout(() => {
      setIsLoading(false);
      console.log('refresh');
    }, 3 * 1000);
  }, []);

  if (isLoading) {
    return (
      <SView className="h-52 mt-5 bg-slate-200">
        <SText className="m-auto text-black">Loading</SText>
      </SView>
    );
  }

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
