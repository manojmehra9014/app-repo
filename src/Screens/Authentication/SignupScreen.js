import React, { useState, } from 'react';
import { Alert, StyleSheet, Text, Image, TouchableOpacity, View, Dimensions, } from 'react-native';
const colors = ['#FEBBCC', '#FFDDCC', '#F6F4EB'];
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { image_bg_remove_api, checkUserStatus, registerUser, sendOtpApi } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { logo, spinner, error_color, seccess_color, default_color, reg_failed, reg_seccess, btn_text_color, leader_img } from '../../const';
import * as ImagePicker from 'expo-image-picker';
import { validateName, validateDesignation, validatePassword, validatePhoneNumber } from '../../validation';


const SignupScreen = ({ navigation }) => {
  const UserSignUpData = {
    name: '', designation: '', user_type: '', gender: '',
    leader_images: [
      leader_img,
      leader_img,
      leader_img,],
    profile_photo_url: '',
  };


  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [leader, setLeader] = useState('');
  const [loading, setLoading] = useState(false);
  let [userexist, setUser] = useState(true);


  const checkUserexist = async () => {
    try {
      setLoading(true);
      const userstatus = `+91${phoneNumber}`;
      const res = await checkUserStatus(userstatus);
      setLoading(false);

      if (res.user === true) {
        Alert.alert(
          'User Already Exist!',
          'Try to login!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'), // Navigate to 'Login' screen
            },
          ]
        );
      } else {
        setUser(false); // Set the user status to false if the user does not exist
      }
    } catch (error) {
      setLoading(false);
      console.error('Error checking user status:', error);
      // Handle the error here, you can show an error message to the user if needed
    }
  }

  //iamge picker
  const openImagePicker = async (setImage, is_bg_remove) => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      console.log("Line !result.cancled")
      const resp = await image_bg_remove_api(result.assets[0].uri, phoneNumber);
      console.log(resp);
      setImage(resp);
    }
    setLoading(false);
  };


  let [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const sendOtp = async () => {
    const userPhoneNumber = `+91${phoneNumber}`;
    try {
      const res = await sendOtpApi(userPhoneNumber);
      if (res.status === 'success') {
        setOtpSent(true);
        Alert.alert('Otp Sent!!', res.message);
      }
    } catch (e) {
      Alert.alert('OOps', e);
    }
  };

  //username validation
  const [nameValidationMsg, setNameValidationMsg] = useState('');
  const [nameBorderColor, setNameBorderColor] = useState(default_color);
  const handleNameChange = (input) => {
    setName(input);

    const validationMsg = validateName(input);
    if (validationMsg) {
      setNameValidationMsg(validationMsg);
      setNameBorderColor(error_color);
    } else {
      setNameValidationMsg('');
      setNameBorderColor(seccess_color);
    }
  };

  //designation validation
  const [designationValidationMsg, setDesignationValidationMsg] = useState('');
  const [designationBorderColor, setDesignationBorderColor] = useState(default_color);
  const handleDesignationChange = (input) => {
    setDesignation(input);
    const validationMsg = validateDesignation(input);
    if (validationMsg) {
      setDesignationValidationMsg(validationMsg);
      setDesignationBorderColor(error_color);
    } else {
      setDesignationValidationMsg('');
      setDesignationBorderColor(seccess_color);
    }
  };

  //phone number validation
  const [phoneNumberValidationMsg, setPhoneNumberValidationMsg] = useState('');
  const [phoneNumberBorderColor, setPhoneNumberBorderColor] = useState(default_color);
  const handlePhoneNumberChange = (input) => {
    setPhoneNumber(input);
    const validationMsg = validatePhoneNumber(input);
    if (validationMsg) {
      setPhoneNumberValidationMsg(validationMsg);
      setPhoneNumberBorderColor(error_color);
    } else {
      setPhoneNumberValidationMsg('');
      setPhoneNumberBorderColor(seccess_color);
    }
  };


  //password validation
  const [passwordValidationMsg, setPasswordValidationMsg] = useState('');
  const [passwordBorderColor, setPasswordBorderColor] = useState(default_color);
  const handlePasswordChange = (input) => {
    setPassword(input);
    const validationMsg = validatePassword(input);
    if (validationMsg) {
      setPasswordValidationMsg(validationMsg);
      setPasswordBorderColor(error_color);
    } else {
      setPasswordValidationMsg('');
      setPasswordBorderColor(seccess_color);
    }
  };


  const confirmSignup = async () => {
    setLoading(true);
    UserSignUpData.name = name;
    UserSignUpData.designation = designation;
    UserSignUpData.user_type = selectedusertype;
    UserSignUpData.gender = selectedGender;
    UserSignUpData.leader_images = [];
    UserSignUpData.profile_photo_url = removed_bg_Profile;
    UserSignUpData.leader = '+911111111111';

    let data = UserSignUpData;
    data.phone_number = `+91${phoneNumber}`;
    data.password = password;
    data.code = otp;
    console.log(data);
    const res = await registerUser(data);
    setLoading(false);
    // api request to server
    if (res.status === "failed") {
      Alert.alert(reg_failed, res.message);
    }
    if (res.status === "suceess") {
      Alert.alert(reg_seccess, res.message);
    }
    console.log(res, ' line 100 ');
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
  const isLeader = selectedusertype === 'LEADER';
  const [usertypes] = useState(
    [
      'USER',
      'LEADER',
      'OTHER',
    ].sort()
  );

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
              <Image style={styles.spinner} source={spinner} />
            </View>
          )}
          <View style={styles.main}>

            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.logoImage} />
              <Text style={styles.signupheading}>SignUp</Text>
            </View>

            <View style={styles.inputFileds}>

              {userexist && (
                <View>

                  {phoneNumberValidationMsg ? <Text style={styles.validationText} > {phoneNumberValidationMsg}</Text> : null}
                  <View style={[styles.inputView, { borderColor: phoneNumberBorderColor }]}>
                    <Icon style={styles.icon} name='phone' type='font-awesome' />
                    <TextInput style={styles.phone_check}
                      maxLength={10}
                      onChangeText={handlePhoneNumberChange}
                      autoCorrect={false}
                      value={phoneNumber}
                      keyboardType="numeric"
                      placeholder="Phone Number" />
                  </View>
                  <TouchableOpacity style={styles.regbtn} onPress={async () => await checkUserexist()}>
                    <Text style={styles.regbtntext}>Next</Text>
                  </TouchableOpacity>

                </View>
              )}
              {!userexist && (
                <View>
                  {/*input for username  */}
                  {nameValidationMsg ? <Text style={styles.validationText}>{nameValidationMsg}</Text> : null}
                  <View style={[styles.inputView, { borderColor: nameBorderColor }]}>

                    <Icon style={styles.icon} name='user' type='font-awesome' />
                    <TextInput style={{ flex: 1, paddingHorizontal: 12, }}
                      onChangeText={handleNameChange}
                      autoCorrect={false}
                      value={name}
                      placeholder="Enter Username" />
                  </View>


                  {/*input for designation  */}
                  {designationValidationMsg ? <Text style={styles.validationText}>{designationValidationMsg}</Text> : null}
                  <View style={[styles.inputView, { borderColor: designationBorderColor }]}>
                    <Icon style={styles.icon} name='briefcase' type='font-awesome' />
                    <TextInput style={{ flex: 1, paddingHorizontal: 12, }}
                      onChangeText={handleDesignationChange}
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
                  <TouchableOpacity style={styles.selectButton} onPress={() => openImagePicker(setProfile, 1)} >
                    <Text style={btn_text_color}>Upload Profile</Text>
                  </TouchableOpacity>

                  {/* Render the upload button for leaders */}
                  {isLeader && (
                    <TouchableOpacity
                      style={styles.selectButton}
                      onPress={() => openImagePicker(setLeader)}
                    >
                      <Text style={btn_text_color}>Upload Leader Image</Text>
                    </TouchableOpacity>
                  )}

                  {phoneNumberValidationMsg ? <Text style={styles.validationText}>{phoneNumberValidationMsg}</Text> : null}
                  <View style={[styles.inputView, { borderColor: phoneNumberBorderColor }]}>
                    <Icon style={styles.icon} name='phone' type='font-awesome' />
                    <TextInput style={styles.phone_check}
                      maxLength={10}
                      onChangeText={handlePhoneNumberChange}
                      autoCorrect={false}
                      value={phoneNumber}
                      onBlur={async () => await checkUserexist()}
                      keyboardType="numeric"
                      placeholder="Phone Number" />
                  </View>

                  {passwordValidationMsg ? <Text style={styles.validationText}>{passwordValidationMsg}</Text> : null}
                  <View style={[styles.inputView, { borderColor: passwordBorderColor }]}>
                    <Icon style={styles.icon} name='lock' type='font-awesome' />
                    <TextInput style={styles.phone_check}
                      onChangeText={handlePasswordChange}
                      autoCorrect={false}
                      value={password}
                      placeholder="Password" />
                  </View>



                  <TouchableOpacity style={styles.regbtn} title='Create account' onPress={async () => await sendOtp()}>
                    <Text style={styles.regbtntext}>Create Account</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLinkText}>Already have an account? Login</Text>
                  </TouchableOpacity>
                </View>
              )}
              {otpSent && (
                <View>
                  <View style={[styles.inputView, { top: 40 }]}>
                    <Icon style={styles.icon} name='lock' type='font-awesome' />
                    <TextInput style={styles.phone_check}
                      onChangeText={(e) => {
                        setOtp(e);
                      }}
                      autoCorrect={false}
                      value={otp}
                      placeholder="Enter OTP" />
                  </View>

                  <TouchableOpacity style={[styles.regbtn, { top: 50 }]} title="Confirm OTP"
                    onPress={async () => await confirmSignup()}>
                    <Text style={styles.regbtntext}>Verify OTP</Text>
                  </TouchableOpacity>

                </View>
              )}
            </View>

          </View>
        </View>
      </ScrollView >
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
  spinner: {
    width: 70,
    height: 70
  },
  regbtntext: {
    color: '#fff',
    fontSize: 18,
  },
  phone_check: {
    flex: 1,
    paddingHorizontal: 12,
  },
  icon: {
    color: '#333',
    size: 20,
  },
  signupheading: {
    fontSize: 24,
    top: 10,
    fontWeight: 900,
    textAlign: "center",
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
  validationText: {
    color: 'red',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: 'rgba(39, 40, 41,0.5)', // Semi-transparent white background
    zIndex: 1, // Place it above other content
    alignItems: "center", justifyContent: "center"
  },
});


export default SignupScreen;
