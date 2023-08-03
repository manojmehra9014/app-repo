import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserStatus, loginUser } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector((state) => state.user);

  const login = async () => {
    const userPhoneNumber = `+91${phoneNumber}`;
    const userPassword = password;
    try {
      const res = await loginUser(userPhoneNumber, userPassword);
      console.log(res);
      if (res && res.data && res.data.token) {
        await AsyncStorage.setItem('user-key', res.data.token);
        const keyUser = await AsyncStorage.getItem('user-key');
        if (keyUser !== null) {
          dispatch({
            type: 'LOGGED_IN',
            payload: {
              status: 'user-logged-in',
              user: res.data.user,
            },
          });
        }
      }
    } catch (e) {
      console.log(e);
      Alert.alert('OOps', e.message);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={{ backgroundColor: 'red', padding: 10, fontSize: 20 }}>
            Login Screen
          </Text>
        </View>
        <View>
          <TextInput
            maxLength={10}
            style={styles.input}
            onChangeText={(e) => {
              setPhoneNumber(e);
            }}
            autoCorrect={false}
            value={phoneNumber}
            autoFocus={true}
            placeholder="Phone Number"
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setPassword(e);
            }}
            autoCorrect={false}
            value={password}
            placeholder="Password"
          />
        </View>
        <View>
          <Button
            title="Login"
            onPress={async () => await login()}
            style={{
              padding: 10,
              backgroundColor: '#cdd1cf',
              width: '100%',
            }}></Button>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text> Create A New Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;
