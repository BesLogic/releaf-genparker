import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { InputButton } from '../../shared/InputButton';
import { styled } from 'nativewind';
import QRScanner from '../components/QRScanner';

const SSafeAreaView = styled(SafeAreaView);
const SText = styled(Text);
const SView = styled(View);
const SInputButton = styled(InputButton);

class SetupStep {
  index = 0;
  info1 = '';
  displayCamera = false;
  stats: { [id: string]: string } = {};
  info2 = '';
  hint = '';
  buttonText = 'Next';
  click: () => void;
}

export function SetupBox({ route, navigation }) {
  const allSteps: SetupStep[] = [
    {
      index: 1,
      info1:
        'Plug in the GenParker device, when the indicator light flashes, press the “xxxxx” button.',
      displayCamera: true,
      stats: {},
      info2: '',
      hint: 'Lorem ipsum dolor sit amet consectetur. Odio in euismod arcu sit elit sit laoreet sed sed. Tortor est at tempor neque eu sem nisi arcu sed.',
      buttonText: 'Next',
      click: () => {
        setStep(allSteps[1]);
      },
    } as SetupStep,
    {
      index: 2,
      info1: 'Scan the QR code on the box. ',
      displayCamera: true,
      stats: {},
      info2: '',
      hint: 'Notice: Lorem ipsum nibh dignissim adipiscing non lacus aliquam quis pellentesque pulvinar hendrerit. Tortor fringilla integer sit blandit semper purus.',
      buttonText: 'Next',
      click: () => {
        setStep(allSteps[2]);
      },
    } as SetupStep,
    {
      index: 3,
      info1:
        'Press the “Connect” button to open the connection page in your browser, follow the instructions on GenParker’s website to finish the device setup.',
      displayCamera: false,
      stats: {},
      info2: '',
      hint: 'Notice: Lorem ipsum dolor sit amet consectetur. Odio in euismod arcu sit elit sit laoreet sed sed. Tortor est at tempor neque eu sem nisi arcu sed.',
      buttonText: 'Connect',
      click: () => {
        setStep(allSteps[0]);
      },
    } as SetupStep,
  ];

  const [qrCode, setQrCode] = useState('');

  const onQrRead = (qrtext) => {
    setQrCode(qrtext);
  };

  const [step, setStep] = useState<SetupStep>(allSteps[0]);

  let dislayCamera = <View></View>;
  if (step?.displayCamera) {
    dislayCamera = (
      <SView className="h-52 mt-5">
        <QRScanner onRead={onQrRead}></QRScanner>
      </SView>
    );
  }

  return (
    <SView className="bg-green-100">
      <SSafeAreaView>
        <ScrollView>
          <SView className="mt-5">
            <SText className="text-releaf-green-500 text-3xl m-auto font-lato-bold">
              Set up your box
            </SText>
          </SView>

          <SView className="mx-6 mt-3 mb-3 px-4 py-6 bg-white rounded-lg">
            <SText className="text-releaf-green-10 text-2xl mb-4 font-lato-bold">
              Step {step?.index}
            </SText>
            <SText className="text-releaf-green-10 text-xl font-lato-bold">
              {step?.info1}
            </SText>
            {dislayCamera}
            <SView className="mt-2">
              <SText className="text-releaf-green-500 text-sm font-lato">
                Notice: {step?.hint}
              </SText>
            </SView>
            <SView className="mt-20">
              <SInputButton
                text={step?.buttonText}
                outline={false}
                click={step?.click}
              ></SInputButton>
            </SView>
            <SView className="mt-4">
              <SInputButton
                text="Cancel"
                outline={true}
                click={() => {
                  navigation.navigate('Box');
                }}
              ></SInputButton>
            </SView>
          </SView>
        </ScrollView>
      </SSafeAreaView>
    </SView>
  );
}
