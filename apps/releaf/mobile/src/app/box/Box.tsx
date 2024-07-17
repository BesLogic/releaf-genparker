import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TreeStateCard } from './components/TreeStateCard';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from '../shared/Loading';
import { BoxService } from '../infrastructure/services/box.service';
import { BoxDetails } from '../infrastructure/entities/boxDetails';

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
});

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
  const [boxes, setBoxes] = useState<string[]>([]);

  const fetchBoxes = useCallback(async () => {
    setIsLoading(true);
    try {
      const allBoxes = await boxService.getAll();
      setBoxes(allBoxes);
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
            <Text style={[styles.title]}>
              Mes Boîtes ({boxes?.length ?? 0})
            </Text>
          </View>

          {boxes.map((box, index) => (
            <View
              key={index}
              style={{
                marginBottom: index !== boxes.length - 1 ? 15 : 0,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <TreeStateCard
                boxId={box}
                navigation={navigation}
              ></TreeStateCard>
            </View>
          ))}
        </View>
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
