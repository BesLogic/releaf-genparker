import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { IconType, Icons } from './components/Icons';
import { Order } from '../order/Order';
import { Knowledge } from '../knowledge/Knowledge';
import { Profile } from '../profile/Profile';
import { Notifications } from '../notifications/Notifications';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box } from '../box/Box';




// Screen names
const orderName = 'Order';
const knowledgeName = 'Knowledge';
const homeName = 'Home';
const notificationsName = 'Notifications';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();
export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const rn = route.name;

            let type = IconType.StoreFront;

            if (rn === orderName) {
              type = IconType.StoreFront;
            } else if (rn === knowledgeName) {
              type = IconType.MenuBook;
            } else if (rn === homeName) {
              type = IconType.PottedPlant;
            } else if (rn === notificationsName) {
              type = IconType.Notification;
            } else {
              type = IconType.Face;
            }

            return <Icons type={type} isSelected={focused} />;
          },
          tabBarStyle: { height: 100, backgroundColor: '#009959' },
        })}
      >
        <Tab.Screen
          name={orderName}
          component={Order}
          options={{ headerShown: false, tabBarLabel: '' }}
        />
        <Tab.Screen
          name={knowledgeName}
          component={Knowledge}
          options={{ headerShown: false, tabBarLabel: '' }}
        />
        <Tab.Screen
          name={homeName}
          component={Box}
          options={{ headerShown: false, tabBarLabel: '' }}
        />
        <Tab.Screen
          name={notificationsName}
          component={Notifications}
          options={{ headerShown: false, tabBarLabel: '' }}
        />
        <Tab.Screen
          name={profileName}
          component={Profile}
          options={{ headerShown: false, tabBarLabel: '' }}
        />
      </Tab.Navigator>

    </NavigationContainer>
  );
};
