import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { styled } from 'nativewind';
import { InputButton } from '../../shared/InputButton';

const SCamera = styled(Camera);
const SView = styled(View);
const SText = styled(Text);
const SInputButton = styled(InputButton);

const QRScanner = (props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

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
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      console.log('Camera.requestCameraPermission ', permission);
      setHasPermission(permission === 'granted');
    };

    requestCameraPermission();
  }, []);

  if (!showCamera) {
    return (
      <SView className="w-full h-full bg-slate-200">
        <SView className="mx-5 m-auto">
          <SInputButton
            text="Show Camera"
            outline={true}
            click={() => {
              setShowCamera(true);
            }}
          ></SInputButton>
        </SView>
      </SView>
    );
  }

  if (device == null || !hasPermission) {
    return (
      <SView className="w-full h-full bg-slate-200">
        <SText className="m-auto text-black">
          Camera not available or not permitted
        </SText>
      </SView>
    );
  }

  return (
    <SCamera
      codeScanner={codeScanner}
      className="w-full h-full"
      device={device}
      isActive={true}
    />
  );
};

export default QRScanner;
