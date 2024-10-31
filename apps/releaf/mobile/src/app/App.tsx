import React from 'react';
import { Navigation } from './navigation/Navigation';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { SetupBox } from '../app/box/screens/SetupBox';
import { BoxDetailsScreen } from '../app/box/screens/BoxDetails';

const SettingsStack = createNativeStackNavigator();

export const MainNav = () => {
  return <Navigation></Navigation>;
};

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SettingsStack.Navigator>
          <SettingsStack.Screen
            name="SetupBox"
            component={SetupBox}
            options={{ headerShown: false }}
          />
          <SettingsStack.Screen
            name="BoxDetails"
            component={BoxDetailsScreen}
            options={{ headerShown: false }}
          />
          <SettingsStack.Screen
            name="Box"
            component={MainNav}
            options={{ headerShown: false }}
          />
        </SettingsStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
