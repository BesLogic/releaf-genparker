import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TreeStateCard } from './components/TreeStateCard';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from '../shared/Loading';
import { BoxDetailsScreen } from './screens/BoxDetails';
import { BoxService } from '../infrastructure/services/box.service';
import { SetupBox } from './screens/SetupBox';

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
            <TouchableOpacity onPress={() => navigation.navigate('SetupBox')}>
              <Text style={[styles.title]}>
                Mes Boîtes ({boxes?.length ?? 0})
              </Text>
            </TouchableOpacity>
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
