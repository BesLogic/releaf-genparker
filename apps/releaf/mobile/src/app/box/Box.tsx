import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TreeStateCard } from './components/TreeStateCard';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from '../shared/Loading';
import { BoxService } from '../infrastructure/services/box.service';
import { BoxDetails } from '../infrastructure/entities/boxDetails';
import { BoxItem } from '../infrastructure/entities/box';
import { styled } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
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

  },
  borderBottom: {
    borderRadius: 50,
  },

  // here

});

const StyledText = styled(Text)
const StyledView = styled(View)

export const Box = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Box"
        component={BoxScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen name="BoxDetails" component={BoxDetailsScreen} />
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
            germinationDay: new Date()
          }
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
            <Text style={[styles.title]}>
              Mes Boîtes ({boxes?.length ?? 0})
            </Text>
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


        <StyledView className='justify-center items-center p-3'>

          {boxes.map((box, boxIndex) => (

            <LinearGradient colors={['#FABB72', '#D49953']} style={styles.linearGradient}>

              <StyledView className='flex-wrap rounded-3xl flex-row justify-center p-3'>
                {
                  box.seeds.map((seed, seedIndex) => (
                    <StyledView
                      key={`${boxIndex}-${seedIndex}`}
                      className='w-1/5 aspect-square bg-white justify-center items-center border '
                    >
                      <Text>{seed.name}</Text>
                    </StyledView>
                  ))
                }
              </StyledView>

            </LinearGradient>

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

function BoxDetailsScreen({ route, navigation }) {
  const { id } = route.params;

  const boxService = new BoxService();

  const [isLoading, setIsLoading] = useState(true);
  const [boxDetails, setBoxDetails] = useState<BoxDetails>(null);

  const fetchBoxes = useCallback(async () => {
    setIsLoading(true);
    try {
      const boxDetails: BoxDetails = await boxService.get(id);
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

  return (
    <View>
      <Text style={{ color: 'black' }}>
        Details Screen {boxDetails?.growthInfo?.seedsAverageInchHeight ?? -1}
      </Text>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text style={{ color: 'black' }}>Seeds:</Text>
        <FlatList
          data={boxDetails?.seeds ?? []}
          renderItem={({ item }) => <SeedDisplay seed={item} />}
          keyExtractor={(item) => item.name}
        />
      </View>
      <View style={[styles.bottomSection]}>
        <View>
          <Text style={{ color: 'black' }}>
            {boxDetails?.vitals?.temperature?.value ?? -1}
          </Text>
          <Text style={{ color: 'black' }}>temperature</Text>
        </View>
        <View>
          <Text style={{ color: 'black' }}>
            {boxDetails?.vitals?.soilMoisturePercent?.value ?? -1}
          </Text>
          <Text style={{ color: 'black' }}>soilMoisturePercent</Text>
        </View>
        <View>
          <Text style={{ color: 'black' }}>
            {boxDetails?.vitals?.luminosityPercent?.value ?? -1}
          </Text>
          <Text style={{ color: 'black' }}>luminosityPercent</Text>
        </View>
      </View>
    </View>
  );
}

function SeedDisplay({ seed }) {
  return (
    <View>
      <Text style={{ color: 'black' }}>{seed.name}</Text>
    </View>
  );
}


