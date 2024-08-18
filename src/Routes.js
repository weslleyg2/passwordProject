// Routes.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './pages/home/index';
import { Passwords } from './pages/passwords/index';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='home'
        component={Home}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons size={size} color={color} name={focused ? 'home' : 'home-outline'} />
          ),
        }}
      />
      <Tab.Screen
        name='passwords'
        component={Passwords}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons size={size} color={color} name={focused ? 'lock-closed' : 'lock-closed-outline'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
