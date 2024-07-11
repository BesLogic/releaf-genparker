import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TreeStateCard } from './components/TreeStateCard';


export class TreeState {
  name = '';
  germinationDate = new Date();
  ageInDays = 0;
  height = 0;
}

const trees = [
  {
    name: '20 Pin Cherry',
    germinationDate: new Date('2023-10-11'),
    ageInDays: 103,
    height: 7,
  } as TreeState,
  {
    name: '12 Huckleberry',
    germinationDate: new Date('2023-10-11'),
    ageInDays: 103,
    height: 7,
  } as TreeState,
  {
    name: '12 Red Maple',
    germinationDate: new Date('2023-10-11'),
    ageInDays: 103,
    height: 7,
  } as TreeState,
];


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
          <TreeStateCard treeState={tree} navigation={navigation} />
        </View>
      ))}
    </View >
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
