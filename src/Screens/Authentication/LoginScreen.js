import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  View,
} from 'react-native';
import { logo } from '../../const';
import { spinner } from '../../const';

const colors = ['#FEBBCC', '#FFDDCC', '#F6F4EB'];
const { width, height } = Dimensions.get('screen');
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserStatus, loginUser } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';




const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector((state) => state.user);

  const login = async () => {
    setLoading(true);
    // loadingani()
    const userPhoneNumber = `+91${phoneNumber}`;
    const userPassword = password;
    try {
      const res = await loginUser(userPhoneNumber, userPassword);
      console.log("login api called");
      setLoading(false);
      console.log(res);
      if (res.status === 'failed') {
        Alert.alert('Login Failed', res.message);
      }
      if (res && res.data && res.data.token) {
        // setLoading(false);
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
        else {
        }
      }
    } catch (e) {
      // console.log(e);
      Alert.alert('Login Failed', e);

      // Alert.alert('OOps', e.message);
    }
  };


  return (
    <>
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





          {loading && (
            <View style={styles.loadingContainer}>
              <Image style={{ width: 70, height: 70}} source={spinner} />
            </View>
          )}



          
            <View style={styles.main}>


              <View style={styles.imageContainer}>
                <Image source={logo} style={styles.logoImage} />
                <Text style={{ fontSize: 24, top: 20, fontWeight: "900", textAlign: "center" }}>Login</Text>
              </View>



              <View style={styles.inputFileds}>


                <View style={styles.inputView}>
                  <Icon color='#333' name='user' type='font-awesome' size={20} />
                  <TextInput style={{ flex: 1, paddingHorizontal: 12, }} maxLength={10}
                    onChangeText={(e) => {
                      setPhoneNumber(e);
                    }}
                    autoCorrect={false}
                    value={phoneNumber}
                    autoFocus={true}
                    placeholder="Phone Number" />
                </View>
                <View style={styles.inputView}>
                  <Icon color='#333' name='lock' type='font-awesome' size={20} />
                  <TextInput style={{ flex: 1, paddingHorizontal: 12, }}
                    onChangeText={(e) => {
                      setPassword(e);
                    }}
                    autoCorrect={false}
                    value={password}
                    autoFocus={true}
                    placeholder="Password" />
                </View>

                <TouchableOpacity style={styles.regbtn} title="Login"
                  onPress={async () => await login()}>
                  <Text style={{ color: "#fff", fontSize: 18 }}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.loginLinkText}>Don't have an account? SingUp</Text>
                </TouchableOpacity>
              </View>
            </View>


          {/* )} */}

        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    height: height + 200,

    top: 0,
  },
  imageContainer: {
    alignItems: 'center',
    top: 30,
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  main: {
    padding: 30,
    height: height,
  },
  inputFileds: {
    top: 70,
  },

  inputView: {
    width: '100%',
    height: 44,
    top: 10,
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
  regbtn: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: '50%',
    borderColor: '#30A2FF',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#30A2FF',
    height: 44,
    left: 75,
    top: 50,
    bottom: 50,
    borderWidth: 1.8,
    borderRadius: 19,
    marginBottom: 75,
  },
  loginLinkText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'blue',
    marginTop: 50,
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width:width,
    height:height,
    backgroundColor: 'rgba(39, 40, 41,0.5)', // Semi-transparent white background
    zIndex: 1, // Place it above other content
    alignItems: "center", justifyContent: "center"
  },

});

export default LoginScreen;
