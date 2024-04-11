import { NavigationContainer } from '@react-navigation/native';
import { Home } from '../home/Home';
import { BoxDetails } from '../box-details/Box-Details';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { IconType, Icons } from './components/Icons';
import { Order } from '../order/Order';
import { Knowledge } from '../knowledge/Knowledge';
import { Profile } from '../profile/Profile';
import { Notifications } from '../notifications/Notifications';

// Screen names
const orderName = 'Order';
const knowledgeName = 'Knowledge';
const boxDetailsName = 'Box Details';
const notificationsName = 'Notifications';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();
export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={boxDetailsName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const rn = route.name;

            let type = IconType.StoreFront;

            if (rn === orderName) {
              type = IconType.StoreFront;
            } else if (rn === knowledgeName) {
              type = IconType.MenuBook;
            } else if (rn === boxDetailsName) {
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
          name={boxDetailsName}
          component={BoxDetails}
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
