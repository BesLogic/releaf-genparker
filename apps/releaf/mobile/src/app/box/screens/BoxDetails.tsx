import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from '../../shared/Loading';
import { BoxService } from '../../infrastructure/services/box.service';
import { BoxDetails } from '../../infrastructure/entities/boxDetails';
import { styled } from 'nativewind';
import { differenceInDays, format } from 'date-fns';
import { CalendarIcon } from 'react-native-heroicons/outline';
import { InputButton } from '../../shared/InputButton';
import DatePicker from 'react-native-date-picker';

const DEFAULT_BOX: BoxDetails = {
  id: {
    value: '660e14f5e64c50d55776768f',
  },
  treeDefinitionId: {
    value: '660e144de64c50d55776768b',
  },
  seeds: [],
  vitals: {
    temperature: {
      value: 24.6,
      batteryLevel: 0,
      lastUpdate: new Date(),
      batteryLastUpdate: new Date(),
    },
    soilMoisturePercent: {
      value: 0.994,
      lastUpdate: new Date(),
      batteryLevel: 50,
      batteryLastUpdate: new Date(),
    },
    luminosityPercent: {
      value: 0.001,
      lastUpdate: new Date(),
      batteryLevel: 75,
      batteryLastUpdate: new Date(),
    },
  },
  growthInfo: {
    seedsAverageInchHeight: 2.3,
    germinationDay: new Date(),
  },
};

const SSafeAreaView = styled(SafeAreaView);
const SText = styled(Text);
const SView = styled(View);
const SCalendarIcon = styled(CalendarIcon);
const STextInput = styled(TextInput);
const STouchableOpacity = styled(TouchableOpacity);

const SInputButton = styled(InputButton);

export function BoxDetailsScreen({ route, navigation }) {
  const { id } = route.params;

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [boxDetails, setBoxDetails] = useState<BoxDetails>(null);

  const fetchBoxes = useCallback(async () => {
    setIsLoading(true);
    try {
      // const boxDetails: BoxDetails = await boxService.get(id);
      const boxDetails: BoxDetails = DEFAULT_BOX;
      setBoxDetails(boxDetails);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, []);

  useEffect((): void => {
    void fetchBoxes();
  }, [fetchBoxes]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const save = () => {
    console.log('save');
  };

  return (
    <SSafeAreaView>
      <ScrollView>
        <SView className="m-10">
          <SText className="text-black mb-2">Box ID: {id}</SText>
          <SText className="text-black mb-2">
            Tree Specie: {boxDetails.treeDefinitionId.value}
          </SText>
          <SText className="text-black mb-2">
            Number:
            <SText className="text-red-600 mb-2"> 20</SText>
          </SText>
          <SText className="text-black">
            Device ID:
            <SText className="text-red-600 mb-2"> Genparker xxxxx</SText>
          </SText>
        </SView>

        <SView className="border-0.5 border-gray-400 mx-9" />

        <SView className="mt-10 mx-12">
          <SView className="mb-6">
            <STouchableOpacity
              onPress={() => {
                setOpen(true);
              }}
            >
              <SText className="text-black font-medium mb-1">
                Germination Day
              </SText>
              <SView className="border-0.5 p-3 border-black rounded-lg flex flex-row">
                <SView className="w-32">
                  <SText className="text-black py-2 px-1">
                    {format(date, 'dd-MMM-yyyy')}
                  </SText>
                </SView>
                <SView className="flex-auto">
                  <SCalendarIcon
                    className="m-auto mr-0"
                    color="green"
                    size={20}
                  ></SCalendarIcon>
                </SView>
              </SView>
            </STouchableOpacity>
          </SView>

          <SView className="mb-6">
            <SText className="text-black font-medium">
              Age: {differenceInDays(new Date(), date)} days
            </SText>
            <SText className="text-black">
              The age of your saplings is calculated based on the germination
              date.
            </SText>
          </SView>

          <SView>
            <SText className="text-black font-medium mb-1">
              Average Height (Inch)
            </SText>
            <STextInput className="text-black border-0.5 p-3 border-black rounded-lg flex flex-row"></STextInput>
          </SView>
        </SView>

        <SView className="mt-16 mb-8 mx-12">
          <SInputButton
            text={'Save'}
            outline={false}
            click={save}
          ></SInputButton>

          <SView className="mt-2">
            <SInputButton
              text={'Cancel'}
              outline={true}
              click={() => navigation.goBack()}
            ></SInputButton>
          </SView>
        </SView>

        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={(date) => {
            if (date <= new Date()) {
              setDate(date);
            }
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </ScrollView>
    </SSafeAreaView>
  );
}
