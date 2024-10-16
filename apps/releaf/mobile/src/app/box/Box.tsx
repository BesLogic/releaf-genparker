import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from '../shared/Loading';
import { BoxDetailsScreen } from './screens/BoxDetails';
import { BoxService } from '../infrastructure/services/box.service';
import { SetupBox } from './screens/SetupBox';
import { BoxItem } from '../infrastructure/entities/box';
import { styled } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import { Edit } from '../../assets/images/edit';
import { Logo } from '../../assets/images/logo'

const MAX_NAME_LENGTH = 7;
const styles = StyleSheet.create({
  font: {
    fontFamily: 'Lato-Regular',
  },
  fontBold: {
    fontFamily: 'Lato-Bold',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C4E3C',
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 50,
    padding: 10,
    marginTop: 20,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 5,
    marginBottom: 50,
    // elevation: 0.1,
    // transform: [{ rotateX: '7deg' }],
    shadowColor: '#000000',
    elevation: 6,
  },
  borderBottom: {
    borderRadius: 50,
  },
});

const SView = styled(View);
const SText = styled(Text);
const STouchableOpacity = styled(TouchableOpacity);
const SLinearGradient = styled(LinearGradient);

export const Box = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Box"
        component={BoxScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="BoxDetails"
        component={BoxDetailsScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="PopupBoxInfo"
        component={BoxDetailsScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="SetupBox"
        component={SetupBox}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
};

const SettingsStack = createNativeStackNavigator();

function BoxScreen({ navigation }) {
  const boxService = new BoxService();

  const [isLoading, setIsLoading] = useState(true);
  const [boxes, setBoxes] = useState<BoxItem[]>([]);

  const fetchBoxes = useCallback(async () => {
    setIsLoading(true);
    try {
      const allBoxes = await boxService.getAll();
      setBoxes(allBoxes.map((box) => new BoxItem(box)));
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

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: '#ffffff' }}>
          <View
            style={{
              margin: 10,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('SetupBox')}>
              <Text style={[styles.title]}>
                Mes Boîtes ({boxes?.length ?? 0})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <SView className="justify-center items-center p-3">
          {boxes.map((box, boxIndex) => (
            <SLinearGradient
              key={`${boxIndex}`}
              colors={['#8E7556', '#8E7556']}
              className="rounded-3xl w-vw9/10 h-vw9.21/10 elevation-md mb-10"
            >
              <SLinearGradient
                colors={['#FABB72', '#D49953']}
                className="rounded-2xl h-vw9/10"
              >
                <SView className="flex-wrap rounded-3xl h-full gap-1 justify-center ml-vw5/100 mr-vw7/100">
                  <SView className="flex-wrap justify-end flex-0.5 h-vw5/100 flex-row">
                    <SText className="ml-1 flex-4 text-base font-lato-bold">
                      Narrow-leaved Meadowsweet
                    </SText>
                    <SText className="text-end font-lato-bold">
                      <SText className='text-base'>{box.dateSinceGermination} </SText>
                      <SText className='text-sm'>jours</SText>
                    </SText>
                  </SView>
                  {box.seeds
                    .reduce((acc, curr, i) => {
                      if (i % 5 == 0) acc.push([]);
                      acc[acc.length - 1].push(curr);
                      return acc;
                    }, [])
                    .map((seeds, rowIndex) => (
                      <SView key={`${boxIndex}-${rowIndex}`} className="flex-wrap h-full gap-1 flex-1 flex-row">
                        {seeds.map((seed, i) => (
                          <SLinearGradient
                            colors={['#987851', '#f1d4b1']}
                            key={`${boxIndex}-${rowIndex}-${i}`}
                            className="h-full flex-1 justify-center items-center rounded-md"
                          >
                            <SView className="absolute z-20 top-2 left-0 right-0 bottom-0 bg-releaf-brown-900 rounded-md ml-vw0.5/100 mb-vw0.5/100 mt-vw0.5/100 mr-vw0.5/100"></SView>
                            <SView className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-releaf-brown-800 rounded-md ml-vw0.5/100 mb-vw0.5/100 mt-vw0.5/100 mr-vw0.5/100"></SView>
                            <SView className="h-full z-40 flex-1 bg-transparent justify-end  items-center rounded-md ml-vw0.5/100 mb-vw0.5/100 mt-vw0.5/100 mr-vw0.5/100">
                              <SText className="min-w-full text-center z-30 color-releaf-brown-100">
                                {(seed.name as string).substring(
                                  0,
                                  MAX_NAME_LENGTH
                                )}
                                {seed.name.length > MAX_NAME_LENGTH ? '.' : ''}
                              </SText>
                            </SView>
                          </SLinearGradient>
                        ))}
                      </SView>
                    ))}
                  <SView className="flex-wrap flex-row h-vw7/100 pt-1 pl-1">
                    <SText className="flex-1 text-base font-latoRegular">
                      <Logo></Logo>
                    </SText>
                    <STouchableOpacity
                      className='flex-4 flex-row gap-1'
                      onPress={() =>
                        navigation.navigate('BoxDetails', { id: '11111' })
                      }
                    >
                      <SText className="text-center flex-1 text-base font-caveat-bold bg-releaf-brown-500 rounded-l-md">{box.seedsAverageInchHeight} cm</SText>
                      <SText className="text-center flex-2 text-base font-caveat-bold bg-releaf-brown-500">{box.germinationDay}</SText>
                      <SText className="text-center flex-1 text-base bg-white rounded-r-md elevation-md"><Edit size={20}></Edit></SText>
                    </STouchableOpacity>
                  </SView>
                </SView>
              </SLinearGradient>
            </SLinearGradient>
          ))}
        </SView>
      </ScrollView>
    </SafeAreaView>
  );
}
