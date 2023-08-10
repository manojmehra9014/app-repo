import React, { useState, useRef, useEffect } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, Input, View, Dimensions, } from 'react-native';
const colors = ['#FEBBCC', '#FFDDCC', '#F6F4EB'];
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserStatus, registerUser, sendOtpApi } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
import { logo } from '../../const';
import useDrivePicker from 'react-google-drive-picker';
import picker from 'react-google-drive-picker';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { WebView } from 'react-native-webview';


const SignupScreen = ({ navigation }) => {
  const DemoSignUp = {
    name: '', // Initialize with an empty string
    designation: '',
    user_type: '',
    gender: '', // Initialize with an empty string
    // phoneNumber: '',
    // password: '', // Initialize with an empty string
    leader_images: ['https://d61uti3sxgkhy.cloudfront.net/rahul.jpg'],
    profile_photo_url: 'https://d61uti3sxgkhy.cloudfront.net/rahul.jpg',
  };


  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('9368667021');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('https://d61uti3sxgkhy.cloudfront.net/rahul.jpg');
  const [cover, setCover] = useState('https://d61uti3sxgkhy.cloudfront.net/rahul.jpg');



  let [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const user = useSelector((state) => state.user);

  const sendOtp = async () => {
    const userPhoneNumber = `+91${phoneNumber}`;
    try {
      const res = await sendOtpApi(userPhoneNumber);
      // console.log(res);

      if (res.status === 'success') {
        setOtpSent(true);
        Alert.alert('Otp Sent!!', res.message);
      }
    } catch (e) {
      // console.log(e);
      Alert.alert('OOps', e);
    }
  };


  // const sendOtp = async () => {
  //   const userPhoneNumber = `+91${phoneNumber}`;
  //   try {
  //     const res = await sendOtpApi(userPhoneNumber);
  //     console.log(res, "ho gya bhai");

  //     if (res.status === 'success') {
  //       setOtpSent(true);
  //       Alert.alert('Otp Sent!!', res.message);
  //     } else {
  //       // Display error message from the response
  //       Alert.alert('Error', res.message || 'An error occurred');
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     Alert.alert('Error', 'An error occurred while sending OTP');
  //   }
  // };


  const confirmSignup = async () => {
    DemoSignUp.name = name;
    DemoSignUp.designation = designation;
    DemoSignUp.user_type = selectedusertype;
    DemoSignUp.gender = selectedGender;
    // DemoSignUp.phone_number = phoneNumber;
    // DemoSignUp.password = password;
    DemoSignUp.leader_images = [profile];
    DemoSignUp.profile_photo_url = cover;
    DemoSignUp.leader = '+911111111111';

    let data = DemoSignUp;
    data.phone_number = `+91${phoneNumber}`;
    data.password = password;
    data.code = otp;
    console.log(data);
    const res = await registerUser(data); // api request to server
    if(res.status === "failed"){
      Alert.alert('Registion failed!', res.message);
    }
    if(res.status === "suceess"){
      Alert.alert('Registion seccesfully!', res.message);
    }
    console.log(res,' line 100 ');
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


  //gender picker 
  const [selectedGender, setSelectedGender] = useState('male');
  const [gender] = useState(
    [
      'male',
      'female',
      'other',
    ].sort()
  );
  const [selectedusertype, setSelectedtype] = useState('USER');
  const [usertypes] = useState(
    [
      'USER',
      'LEADER',
      'OTHER',
    ].sort()
  );




  // image picker

  // const [openPicker ,data , authResponse]=useDrivePicker()

  //   const handleOpenPicker = () => {
  //     openPicker({
  //       clientId:"137775640070-s88tlidvuie925ieecjdfg9rs5ggqh45.apps.googleusercontent.com",
  //       developerKey: "AIzaSyATrzPzorr0EKubCJKLPKOPcak1BHqAefg",
  //       scope:'https://www.googleapis.com/auth/drive.readonly',
  //       viewId:"DOCS_IMAGES",
  //       showUploadView:true,
  //       showUploadFolders:true,
  //       supportDrives:true,
  //       multiselect:true,
  //     })
  //   }
  //   useEffect(() => {
  //     if (data) {
  //       console.log("Data received:", data);
  //       data.docs.map((i) => console.log(i));
  //     }
  //   }),[data]



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


          <View style={styles.main}>

            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.logoImage} />
              <Text style={{ fontSize: 24, top: 10, fontWeight: "900", textAlign: "center" }}>SignUp</Text>
            </View>

            <View style={styles.inputFileds}>
              {/*input for username  */}
              <View style={styles.inputView}>
                <Icon color='#333' name='user' type='font-awesome' size={20} />
                <TextInput style={{ flex: 1, paddingHorizontal: 12, }}
                  onChangeText={(e) => {
                    setName(e);
                  }}
                  autoCorrect={false}
                  value={name}
                  placeholder="Enter Username" />
              </View>


              {/*input for designation  */}
              <View style={styles.inputView}>
                <Icon color='#333' name='briefcase' type='font-awesome' size={20} />
                <TextInput style={{ flex: 1, paddingHorizontal: 12, }}
                  onChangeText={(e) => {
                    setDesignation(e);
                  }}
                  autoCorrect={false}
                  value={designation}
                  placeholder="Enter Designation" />
              </View>


              {/*input picker for usertype  */}
              <View style={styles.inputView}>
                <Picker
                  style={styles.inputViewPicker}
                  selectedValue={selectedusertype}
                  onValueChange={(itemVal1) => {
                    setSelectedtype(itemVal1);
                  }}>
                  {
                    usertypes.map((l) => (
                      <Picker.Item label={l} value={l} />
                    ))
                  }
                </Picker>
              </View>

              {/*input picker for gender  */}
              <View style={styles.inputView}>

                <Picker
                  style={styles.inputViewPicker}
                  selectedValue={selectedGender}
                  onValueChange={(itemVal) => {
                    setSelectedGender(itemVal);
                  }}>
                  {
                    gender.map((l) => (
                      <Picker.Item label={l} value={l} />
                    ))
                  }
                </Picker>
              </View>


              {/*input image picker  */}
              <TouchableOpacity style={styles.selectButton} value={profile} >
                <Text style={{ color: '#FEA1A1' }}>Upload Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.selectButton} value={cover} >
                <Text style={{ color: '#FEA1A1' }}>Upload Cover</Text>
              </TouchableOpacity>

              <View style={styles.inputView}>
                <Icon color='#333' name='phone' type='font-awesome' size={20} />
                <TextInput style={{ flex: 1, paddingHorizontal: 12, }} maxLength={10}
                  onChangeText={(e) => {
                    setPhoneNumber(e);
                  }}
                  autoCorrect={false}
                  value={phoneNumber}
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
                  placeholder="Password" />
              </View>



              <TouchableOpacity style={styles.regbtn} title='Create account' onPress={async () => await sendOtp()}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Create Account</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLinkText}>Already have an account? Login</Text>
              </TouchableOpacity>
              {otpSent && (
                <View>
                  <View style={[styles.inputView, { top: 40 }]}>
                    <Icon color='#333' name='lock' type='font-awesome' size={20} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 12, }}
                      onChangeText={(e) => {
                        setOtp(e);
                      }}
                      autoCorrect={false}
                      value={otp}
                      placeholder="Enter OTP" />
                  </View>

                  <TouchableOpacity style={[styles.regbtn, { top: 50 }]} title="Confirm OTP"
                    onPress={async () => await confirmSignup()}>
                    <Text style={{ color: "#fff", fontSize: 18 }}>Verify OTP</Text>
                  </TouchableOpacity>

                </View>
              )}
            </View>


          </View>
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
    borderWidth: 1.8,
    borderRadius: 19,
    marginBottom: 15,
  },
  regbtn: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: '50%',
    borderColor: '#30A2FF',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#30A2FF',
    height: 44,
    alignSelf: "center",
    top: 20,
    borderWidth: 1.8,
    borderRadius: 19,
    marginBottom: 15,
  },
  loginLinkText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },

});


export default SignupScreen;
