import React, { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserStatus, registerUser, sendOtpApi } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DemoSignUp = {
  name: 'Hemant Joshi',
  designation: 'God Knows',
  user_type: 'USER',
  gender: 'male',
  leader_images: [
    'https://d61uti3sxgkhy.cloudfront.net/rahul.jpg',
    'https://d61uti3sxgkhy.cloudfront.net/rahul.jpg',
    'https://d61uti3sxgkhy.cloudfront.net/rahul.jpg',
  ],
  profile_photo_url: 'https://d61uti3sxgkhy.cloudfront.net/Snapchat-829944579',
  leader: '+919027062322',
  // phone_number: '+919557376884',
  // password: 'hemantjoshi',
};

const SignupScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  let [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const sendOtp = async () => {
    const userPhoneNumber = `+91${phoneNumber}`;
    try {
      const res = await sendOtpApi(userPhoneNumber);
      console.log(res);

      if (res.status === 'success') {
        setOtpSent(true);
        Alert.alert('Otp Sent!!', res.message);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('OOps', e);
    }
  };

  const confirmSignup = async () => {
    let data = DemoSignUp;
    data.phone_number = `+91${phoneNumber}`;
    data.password = password;
    data.code = otp;

    const res = await registerUser(data); // api request to server
    // console.log(res.data.token);
    if (res.data.token) {
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
    // console.log(res);
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
            SignUp Screen
          </Text>
        </View>

        <View>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setPhoneNumber(e);
            }}
            maxLength={10}
            autoCorrect={false}
            value={phoneNumber}
            autoFocus={true}
            placeholder="Phone Number"
          />
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(e) => {
                setPassword(e);
              }}
              autoCorrect={false}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
            />
          </View>
        </View>
        <Button title="Create Account" onPress={async () => await sendOtp()}>
          Create Account
        </Button>
        {otpSent && (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(e) => {
                setOtp(e);
              }}
              // autoComplete={false}
              value={otp}
              placeholder="Enter Otp"
            />
            <Button
              title="Confirm OTP"
              onPress={async () => await confirmSignup()}></Button>
          </View>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Go To Login Screen</Text>
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

export default SignupScreen;
