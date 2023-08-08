import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  View, Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import { logo } from '../../const';
import { ScrollView } from 'react-native-gesture-handler';
const colors = ['#FEBBCC', '#FFDDCC', '#F6F4EB'];
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserStatus, loginUser } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDrivePicker from 'react-google-drive-picker'
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



  const Main = styled(View)`
    widht:80vw;
    height:900px;
    margin:30px;
  `;
  const Logo = styled(Image)`
  border:3px solid #1D5B79;
  border-radius: 50px;
  `;

  return (

    <>
    <SafeAreaView>
       <ScrollView>
        <View style={styles.container}>
          {colors.map((x, i) => (
            <View style={[styles.bgCircle1, {
              backgroundColor: x,
              transform: [
                { translateX: -(width / 1.5) + (i * width / colors.length) },
                { translateY: -(width * 1.25) - (i / 1.35 * width / colors.length) }
              ]
            }]} key={i.toString()} />
          ))}

          <Main style={styles.main}>
            <Logo source={logo} style={styles.logo} />
            <Text style={styles.heading}>Login</Text>
            <TextInput placeholder='Phone number' value={phoneNumber} keyboardType='numeric' style={styles.Input} onChangeText={(e) => {
                setPhoneNumber(e);
              }}/>
            <TextInput placeholder='Password' value={password} style={styles.Input} onChangeText={(e) => {
                setPassword(e);
              }} />

            <TouchableOpacity style={styles.regbtn} title="Login" onPress={async () => await login()}>
              <Text style={{ color: "#fff", fontSize: 17 }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.loginLinkText}>Create new  account? SingUp</Text>
            </TouchableOpacity>


          </Main>
        </View>


      </ScrollView>
      </SafeAreaView>
     
    </>

);
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    height: height,
    top: 0,
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
    height: height - 50,
  },
  logo: {
    width: 80,
    height: 80,
    marginLeft: width / 2 - 68,
    marginTop: 70,
    marginBottom: 30,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 50,
  },
  Input: {
    paddingHorizontal: 20,
    fontSize: 18,
    borderColor: '#FF8989',
    width: '100%',
    height: 40,
    textAlign: 'center',
    borderWidth: 1.8,
    borderRadius: 19,
    marginBottom: 15,
  },
  regbtn: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    width: '50%',
    borderColor: '#30A2FF',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#30A2FF',
    height: 40,
    left: 75,
    top: 30,
    borderWidth: 1.8,
    borderRadius: 19,
    marginBottom: 15,
    marginTop: 40,

  },
  loginLinkText: {
    fontSize: 16,
    marginTop: 60,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
