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
import { Loading } from '../../shared/Loading';
import { BoxDetailsScreen } from './BoxDetails';
import { BoxService } from '../../infrastructure/services/box.service';
import { SetupBox } from './SetupBox';
import { BoxItem } from '../../infrastructure/entities/box';
import { styled } from 'nativewind';
import { selectTreeDefinitions } from '../../store/slices/treeDefinitionSlice';
import { useSelector } from 'react-redux';
import { Box } from '../components/Box';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C4E3C',
  },
});

const SView = styled(View);

export const Boxes = () => {
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
    </SettingsStack.Navigator>
  );
};

const SettingsStack = createNativeStackNavigator();

function BoxScreen({ navigation }) {
  const boxService = new BoxService();

  const treeDefinitions = useSelector(selectTreeDefinitions);
  const [isLoading, setIsLoading] = useState(true);
  const [boxes, setBoxes] = useState<BoxItem[]>([]);

  useEffect(() => {
    if (treeDefinitions.length === 0) return;
    if (boxes.length === 0) return;
    boxes.forEach((box) => box.setTreeName(treeDefinitions));
  }, [treeDefinitions, boxes]);

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
            <Box key={boxIndex} box={box}></Box>
          ))}
        </SView>
      </ScrollView>
    </SafeAreaView>
  );
}
