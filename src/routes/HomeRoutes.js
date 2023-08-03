import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import HomeScreen from '../Screens/Home/HomeScreen';
import EventScreen from '../Screens/Event/EventScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DownloadScreen from '../Screens/Downloaded/DownloadsScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import CreateEventScreen from '../Screens/Home/CreateEvent';
import SettingScreen from '../Screens/Profile/SettingScreen';

const HomeRoute = ({ navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="EventScreen" component={EventScreen} />
    </Stack.Navigator>
  );
};

const ProfileRoute = ({}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
};

const MainRoute = ({ navigation }) => {
  // const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeRoute"
        component={HomeRoute}
        options={{ header: () => null }}
      />
      {/* <Tab.Screen
        name="EventScreen"
        component={EventScreen}
        options={{ header: () => null}}
      /> */}
      <Tab.Screen
        name="DownloadScreen"
        component={DownloadScreen}
        options={{}}
      />
      <Tab.Screen name="ProfileRoute" component={ProfileRoute} />
    </Tab.Navigator>
  );
};

export default MainRoute;
