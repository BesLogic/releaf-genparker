import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TreeStateCard } from './components/TreeStateCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BoxService } from '../infrastructure/services/box.service';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from '../shared/Loading';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C4E3C',
  },
});

export const Home = () => {
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
              <TreeStateCard box={box}></TreeStateCard>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
