import { View, Text } from 'react-native';
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
          <TreeStateCard treeState={tree}></TreeStateCard>
        </View>
      ))}
    </View >
  );
};
