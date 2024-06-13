import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { BoxService } from '../infrastructure/domain/services/box.service';
import { Box } from '../infrastructure/domain/entities/box';

// 1. REUSSIR UN CALL ASYNC

// 2. DI
// https://medium.com/@mr.kashif.samman/understanding-dependency-injection-in-react-native-patterns-and-benefits-c5f95f11a838
// PropType ca sort de ou ?
// En ce moment boxService est encore undefined
// Est ce que ca prendrais dequoi sur le service un decorator ?

export const Order = () => {
  const boxService: BoxService = new BoxService();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Box[]>([]);

  const getAllBoxes = async () => {
    try {
      const response = await fetch(
        'https://reactnative.dev/movies.json'
        // http://199.188.220.99:4000/boxes
      );
      const json = await response.json();
      console.log(json);
      setData(json.boxes);
    } catch (error) {
      console.error('jai mal');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const value = boxService.test();

  useEffect(() => {
    getAllBoxes();
  }, []);

  return (
    <View>
      <Text>Order {value}</Text>
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Text>{item.id}</Text>}
      />
    </View>
  );
};
