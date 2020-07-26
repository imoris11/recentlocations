import Home from './containers/Home';
import Map from './containers/Map';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Icon from 'react-native-easy-icon';

const Tab = createBottomTabNavigator();

export type AppTabParamList = {
  Home: undefined;
  Settings: {userID?: string};
};

const App = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} type="material-community" size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
};

export default App;
