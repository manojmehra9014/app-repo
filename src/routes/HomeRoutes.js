import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../Screens/Home/HomeScreen';
import EventScreen from '../Screens/Event/EventScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DownloadScreen from '../Screens/Downloaded/DownloadsScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import CreateEventScreen from '../Screens/Event/CreateEvent';
import SettingScreen from '../Screens/Profile/SettingScreen';
import AllEventsScreen from '../Screens/Event/AllEventsScreen';
import ImageViewScreen from '../Screens/Event/ImageViewScreen';
const HomeRoute = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="DownloadScreen"
        component={DownloadScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ImageViewScreen"
        component={ImageViewScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

const EventRoutes = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="AllEventsScreen">
      <Stack.Screen
        name="AllEventsScreen"
        component={AllEventsScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="CreateEventScreen"
        component={CreateEventScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ImageViewScreen"
        component={ImageViewScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

const ProfileRoute = ({ }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

const MainRoute = ({ navigation }) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeRoute"
        component={HomeRoute}
        options={{ header: () => null }}
      />
      <Tab.Screen
        name="EventRoute"
        component={EventRoutes}
        options={{ header: () => null }}
      />
      <Tab.Screen
        name="ProfileRoute"
        component={ProfileRoute}
        options={{ header: () => null }}
      />
    </Tab.Navigator>
  );
};

export default MainRoute;
