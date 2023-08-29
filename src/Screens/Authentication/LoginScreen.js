import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import {  Alert,  Button,  Dimensions,  SafeAreaView,  StyleSheet,  Text,  Image,  ActivityIndicator, TextInput,View,} from 'react-native';
import { logo } from '../../const';
import { spinner } from '../../const';
import styles from '../../utils/styles/LoginPagestyle';
const colors = ['#FEBBCC', '#FFDDCC', '#F6F4EB'];
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserStatus, loginUser } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
const { width, height } = Dimensions.get('screen');

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('9368667024');
  const [password, setPassword] = useState('ManojMehra12@');

  const user = useSelector((state) => state.user);
  const login = async () => {
    setLoading(true);
    const userPhoneNumber = `+91${phoneNumber}`;
    const userPassword = password;
    try {
      const res = await loginUser(userPhoneNumber, userPassword);
      setLoading(false);
      console.log(res);
      if (res.status === 'failed') {
        Alert.alert('Login Failed', res.message);
      }
      if (res && res.data && res.data.token) {
        await AsyncStorage.setItem('user-key', res.data.token);
        const keyUser = await AsyncStorage.getItem('user-key');
        if (keyUser !== null) {
          dispatch({
            type: 'LOGGED_IN',
            payload: {
              status: 'user-logged-in',
              data: res.data.user,
            },
          });
          console.log(res.data.user, ' ---------');
        } else {
        }
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Login Failed', e);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {colors.map((x, i) => (
            <View
              style={[
                styles.bgCircle1,
                {
                  backgroundColor: x,
                  transform: [
                    {
                      translateX: -(width / 1.5) + (i * width) / colors.length,
                    },
                    {
                      translateY:
                        -(width * 1.25) - ((i / 1.35) * width) / colors.length,
                    },
                  ],
                },
              ]}
              key={i.toString()}
            />
          ))}
          {loading && (
            <View style={styles.loadingContainer}>
              <Image style={styles.spinner} source={spinner} />
            </View>
          )}
          <View style={styles.main}>
            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.logoImage} />
              <Text style={styles.loginText}>Login</Text>
            </View>

            <View style={styles.inputFileds}>
              <View style={styles.inputView}>
                <Icon style={styles.icon} name="user" type="font-awesome" />
                <TextInput
                  style={styles.inpf}
                  maxLength={10}
                  onChangeText={(e) => {
                    setPhoneNumber(e);
                  }}
                  autoCorrect={false}
                  value={phoneNumber}
                  autoFocus={true}
                  placeholder="Phone Number"
                />
              </View>
              <View style={styles.inputView}>
                <Icon style={styles.icon} name="lock" type="font-awesome" />
                <TextInput
                  style={{ flex: 1, paddingHorizontal: 12 }}
                  onChangeText={(e) => {
                    setPassword(e);
                  }}
                  autoCorrect={false}
                  value={password}
                  placeholder="Password"
                />
              </View>

              <TouchableOpacity
                style={styles.regbtn}
                title="Login"
                onPress={async () => await login()}>
                <Text style={styles.loginBtnText}>Login</Text>
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.signupbtn}
                title="SignUp"
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupbtntext}>SignUp</Text>
              </TouchableOpacity>


              
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default LoginScreen;
