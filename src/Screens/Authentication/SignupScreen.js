import React, { useState, useRef, useEffect } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, Input, View, Dimensions, } from 'react-native';
const colors = ['#FEBBCC', '#FFDDCC', '#F6F4EB'];
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserStatus, registerUser, sendOtpApi } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignupScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  let [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

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
      // console.log(keyUser);
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
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    height: height + 200,
    top: 0,
  },
  imageContainer: {
    alignItems: 'center',
    top: 10,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  bgCircle1: {
    position: 'absolute',
    height: width * 2,
    width: width * 2,
    borderRadius: width,
    left: 0,
    top: 0
  },
  main: {
    flex: 1,
    padding: 30,

  },
  inputFileds: {
    top: 40,
  },
  inputView: {
    width: '100%',
    height: 44,
    marginBottom: 8,
    backgroundColor: '#f1f3f6',
    borderColor: '#FFDDCC',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputViewPicker: {
    width: '100%',
    height: 30,
  },
  selectButton: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    fontSize: 18,
    width: '100%',
    borderColor: '#FF8989',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFECEC',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

});


export default SignupScreen;
