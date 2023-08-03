import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import MainRoute from './HomeRoutes';
import AuthRoute from './AuthRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Text, View } from 'react-native';
import { currentUser } from '../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const RootRoute = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const checkUser = async () => {
    setLoading(true);
    try {
      const userKey = await AsyncStorage.getItem('user-key');

      if (userKey !== null) {
        const userData = await currentUser(userKey);
        if (userData.data.is_deleted == false) {
          dispatch({
            type: 'LOGGED_IN',
            payload: {
              data: userData,
              token: userKey,
            },
          });
        }
      }
    } catch (e) {
      dispatch({
        type: 'LOGGED_OUT',
        payload: null,
      });
    }

    setLoading(false);
  };
  useEffect(() => {
    const fetchUser = async () => {
      await checkUser();
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View>
        <Text> Loading</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="Home"
          component={MainRoute}
          options={{ header: () => null }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthRoute}
          options={{ header: () => null }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootRoute;
