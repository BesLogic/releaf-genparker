import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TreeStateCard } from './components/TreeStateCard';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from '../shared/Loading';
import { BoxService } from '../infrastructure/services/box.service';


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C4E3C',
  },
});


export const Box = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Box" component={BoxScreen} />
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
              <TreeStateCard box={box} navigation={navigation}></TreeStateCard>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function BoxDetailsScreen() {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}

/*
export const Home = () => {
  return (
    <View style={{ backgroundColor: '#ffffff' }}>
      <View
        style={{
          margin: 10,
        }}
      >
        <Text>Home</Text>
      </View>

      {trees.map((tree, index) => (
        <View
          key={index}
          style={{
            marginBottom: index !== trees.length - 1 ? 15 : 0,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <TreeCardStack />
        </View>
      ))}
    </View >
  );
};
*/
// <TreeStateCard treeState={tree} navigation={navigation}  ></TreeStateCard>
