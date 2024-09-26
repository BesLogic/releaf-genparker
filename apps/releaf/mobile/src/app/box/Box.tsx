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
import { BoxDetails } from '../infrastructure/entities/boxDetails';
import { BoxItem } from '../infrastructure/entities/box';
import { styled } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';

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

const StyledView = styled(View);
const StyledText = styled(Text);
const StyleLinearGradient = styled(LinearGradient);

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
      //const allBoxes = await boxService.getAll();
      const allBoxes = [];
      for (let i = 0; i < 3; i++) {
        const seeds = [];
        for (let j = 0; j < 25; j++) {
          seeds.push({ name: `seed-${i}-${j}` });
        }
        const box: BoxItem = {
          id: `box-${i}`,
          seeds: seeds,
          growthInfo: {
            seedsAverageInchHeight: Math.random() * 10,
            germinationDay: new Date(),
          },
        };
        allBoxes.push(box);
      }
      setBoxes(allBoxes);
      console.info(allBoxes);
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
    //icitte on va afficher les boites
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

        {/* {boxes.map((box, index) => (
            <View
              key={index}
              style={{
                marginBottom: index !== boxes.length - 1 ? 15 : 0,
                marginLeft: 20,
                marginRight: 20,
              }}
            >

              {box.seeds.map((seed, index) =>
                <StyledView className='w-1/5 aspect-square justify-center items-center border'>
                  <Text>{seed.name}</Text></StyledView>
              )}

            </View>
          ))}

          <View>

            <StyledText className='bg-releaf-green-100'>End of the list</StyledText>
          </View> */}

        <StyledView className="justify-center items-center p-3">
          {boxes.map((box, boxIndex) => (
            <StyleLinearGradient
              key={`${boxIndex}`}
              colors={['#8E7556', '#8E7556']}
              className="rounded-3xl w-vw9/10 h-vw9.21/10 elevation-md mb-10"
            >
              <StyleLinearGradient
                colors={['#FABB72', '#D49953']}
                className="rounded-2xl h-vw9/10"
              >
                <StyledView className="flex-wrap rounded-3xl h-full gap-1 justify-center ml-vw5/100 mr-vw7/100">
                  <StyledView className="flex-wrap flex-0.5 h-vw6/100 flex-row">
                    <StyledText className="font-latoRegular uppercase">
                      HEADER
                    </StyledText>
                  </StyledView>
                  {box.seeds
                    .reduce((acc, curr, i) => {
                      if (i % 5 == 0) acc.push([]);
                      acc[acc.length - 1].push(curr);
                      return acc;
                    }, [])
                    .map((seeds, rowIndex) => (
                      <StyledView className="flex-wrap h-full gap-1 flex-1 flex-row">
                        {seeds.map((seed, i) => (
                          <StyleLinearGradient
                            colors={['#987851', '#f1d4b1']}
                            key={`${boxIndex}-${rowIndex}-${i}`}
                            className="h-full flex-1 justify-center items-center rounded-md"
                          >
                            <StyledView className="absolute z-20 opacity-5 top-2 left-0 right-0 bottom-0 bg-slate-300 rounded-md ml-vw0.5/100 mb-vw0.5/100 mt-vw0.5/100 mr-vw0.5/100"></StyledView>
                            <StyledView className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-releaf-brown-900 rounded-md ml-vw0.5/100 mb-vw0.5/100 mt-vw0.5/100 mr-vw0.5/100"></StyledView>
                            <StyledView
                              key={`${boxIndex}-${rowIndex}-${i}`}
                              className="h-full z-40 flex-1 bg-transparent justify-center  items-center rounded-md ml-vw0.5/100 mb-vw0.5/100 mt-vw0.5/100 mr-vw0.5/100"
                            >
                              <StyledText className="min-w-full text-center z-30 color-releaf-brown-100">
                                {(seed.name as string).substring(
                                  0,
                                  MAX_NAME_LENGTH
                                )}
                                {seed.name.length > MAX_NAME_LENGTH ? '.' : ''}
                              </StyledText>
                            </StyledView>
                          </StyleLinearGradient>
                        ))}
                      </StyledView>
                    ))}
                  <StyledView className="flex-wrap flex-row h-vw7/100">
                    <StyledText className="flex-4 font-latoRegular">
                      LOGO here
                    </StyledText>
                    <StyledText
                      className="flex-1 font-latoRegular bg-releaf-brown-300"
                      onPress={() =>
                        navigation.navigate('BoxDetails', { id: '11111' })
                      }
                    >
                      button
                    </StyledText>
                  </StyledView>
                </StyledView>
              </StyleLinearGradient>
            </StyleLinearGradient>
          ))}
        </StyledView>

        {/*
        <StyledView className='flex-1 justify-center items-center p-4'>
          <StyledView className='flex flex-wrap flex-row justify-center'>
            {boxes.map((box, boxIndex) => (
              <View key={`${boxIndex}`}>
                {
                  box.seeds.map((seed, seedIndex) => (
                    <StyledView
                      key={`${boxIndex}-${seedIndex}`}
                      className='w-1/5 aspect-square justify-center items-center border m-2'
                    >
                      <Text>{seed.name}</Text>
                    </StyledView>
                  ))
                }
              </View>

            ))}
          </StyledView>
        </StyledView>
        */}
      </ScrollView>
    </SafeAreaView>
  );
}
