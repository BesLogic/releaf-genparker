import { useCallback, useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList } from 'react-native';
import { BoxService } from '../infrastructure/services/box.service';
import React from 'react';
import { Loading } from '../shared/Loading';

export const Order = () => {
  const boxService = new BoxService();

  const [isLoading, setIsLoading] = useState(true);
  const [boxes, setBoxes] = useState<string[]>([]);

  const fetchBoxes = useCallback(async () => {
    setIsLoading(true);
    try {
      const allBoxes = await boxService.getAll();
      console.log(allBoxes);
      setBoxes(allBoxes);
    } catch {
      console.error('jai mal');
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
      <Text>{boxes?.length ?? 'null'}</Text>
      <FlatList
        data={boxes ?? []}
        renderItem={({ item }) => <Text style={{ color: 'red' }}>{item}</Text>}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
};
