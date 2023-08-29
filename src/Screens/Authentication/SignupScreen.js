import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, Image, TouchableOpacity, View, Dimensions, FlatList, } from 'react-native';
const colors = ['#FEBBCC', '#FFDDCC', '#F6F4EB'];
import styled from 'styled-components';
import styles from '../../utils/styles/SignUpPage';
import { useDispatch, useSelector } from 'react-redux';
import { image_bg_remove_api, checkUserStatus, registerUser, sendOtpApi, allStatesname, allDistrickName, allvidhanSabhaName, } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { logo, spinner, error_color, seccess_color, default_color, reg_failed, reg_seccess, btn_text_color, leader_img, error_usercheck, userexist_txt_header, userexist_txt, } from '../../const';
import * as ImagePicker from 'expo-image-picker';
import { validateName, validateDesignation, validatePassword, validatePhoneNumber, } from '../../utils/validation';

const SignupScreen = ({ navigation }) => {
  const UserSignUpData = {
    name: '', // Initialize with an empty string
    designation: '',
    user_type: '',
    gender: '', // Initialize with an empty string
    // phoneNumber: '',
    // password: '', // Initialize with an empty string
    leader_images: [],
    profile_photo_url: '',
    state: '',
    political_party: 'congress',
    vidhan_shabha: '',
    district: '',
  };

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [leader, setLeader] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  let [userexist, setUser] = useState(true);
  const [isbgremoved, set_is_bg_removed] = useState(false);
  const [profileuploaded, setProfileUploaded] = useState(false);

  const checkUserexist = async () => {
    try {
      setLoading(true);
      const userstatus = `+91${phoneNumber}`;
      const res = await checkUserStatus(userstatus);
      setLoading(false);

      if (res.user === true) {
        Alert.alert(userexist_txt_header, userexist_txt, [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        setUser(false); // Set the user status to false if the user does not exist
      }
    } catch (error) {
      setLoading(false);
      console.error(error_usercheck, error);
      // Handle the error here, you can show an error message to the user if needed
    }
  };

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
    if (!result.canceled && is_bg_remove) {
      const resp = await image_bg_remove_api(result.assets[0].uri, phoneNumber);
      console.log(resp);
      setImage(resp);
      setLoading(false);
      set_is_bg_removed(true);
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
  const [designationBorderColor, setDesignationBorderColor] =
    useState(default_color);
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
  const [phoneNumberBorderColor, setPhoneNumberBorderColor] =
    useState(default_color);
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
    UserSignUpData.leader_images = [leader_img, leader_img, leader_img];
    UserSignUpData.profile_photo_url = profile;
    UserSignUpData.leader = '+919368667022';
    UserSignUpData.district = district;
    UserSignUpData.state = state;
    UserSignUpData.vidhan_shabha = vidhan_shabha;

    let data = UserSignUpData;
    data.phone_number = `+91${phoneNumber}`;
    data.password = password;
    data.code = otp;
    console.log(data);
    const res = await registerUser(data);
    setLoading(false);
    if (res.status === 'failed') {
      Alert.alert(reg_failed, res.message);
    }
    if (res.status === 'suceess') {
      Alert.alert(reg_seccess, res.message);
    }
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
  const [gender] = useState(['male', 'female', 'other'].sort());

  const [selectedusertype, setSelectedtype] = useState('USER');
  const isLeader = selectedusertype === 'LEADER';
  const [usertypes] = useState(['USER', 'LEADER', 'OTHER'].sort());

  const closepreviewofimage = () => {
    set_is_bg_removed(false);
    setProfileUploaded(true);
  };

  //state data get from api server
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const handleStatesChange = async () => {
    const stateData = await allStatesname(); // Fetch state data from API
    const filterstatedata = stateData
      .map(item => item.name);

    // console.log(filterstatedata);
    setStateSuggestions(filterstatedata);
  }

  const handleStatesTextChange = (text) => {
    setState(text)
    if (text.length === 0) {
      handleStatesChange();
    }
  }


  const setStateSelected = (txt) => {
    setState(txt);
    setStateSuggestions([]);
  }


  const [district, setDistrict] = useState('');
  const [districtSuggestions, setdistrictSuggestions] = useState([]);

  const handleDistrictChange = async (text) => {
    setDistrict(text);
    if (text.length == 0) {
      setdistrictSuggestions([]);
    }
    const districtData = await allDistrickName(state);
    // console.log(districtData);
    const filteredDistrictNames = districtData
      .filter(item => item.name.toLowerCase().startsWith(text.toLowerCase())) // Filter based on the first letter
      .map(item => item.name);
    // console.log(filteredDistrictNames)
    setdistrictSuggestions(filteredDistrictNames)
  }
  const setdistrictSelected = (txt) => {
    setDistrict(txt);
    setdistrictSuggestions([]);
  }

  const handledistrictTextChange = (text) => {
    setDistrict(text);
  }

  const [vidhan_shabha, setvidhan_sabha] = useState('');
  const [vidhan_sabhaSuggestions, setvidhan_sabhaSuggestions] = useState([]);

  const setvidhanshabhaSelected = (txt) => {
    setvidhan_sabha(txt);
    setvidhan_sabhaSuggestions([]);
  }
  const handleVidhanShabhaChange = async (text) => {
    setvidhan_sabha(text);
    const vidhan_sabhaData = await allvidhanSabhaName(district);
    const filteredvidhan_shabhaNames = vidhan_sabhaData
      .filter(item => item.name.toLowerCase().startsWith(text.toLowerCase())) // Filter based on the first letter
      .map(item => item.name);
    console.log(filteredvidhan_shabhaNames)
    setvidhan_sabhaSuggestions(filteredvidhan_shabhaNames)
  }

  useEffect(() => {
    handleStatesChange(); // Call the function when the component is loaded


  }, []);
  const reuploadimage = () => {
    setProfileUploaded(false);
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

          {isbgremoved && (
            <View style={styles.imageprev}>
              <Image source={{ uri: profile }} style={styles.image} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => closepreviewofimage()}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}

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
              {/* {userexist && (
                <View style={styles.firstscr}>
                  {phoneNumberValidationMsg ? (
                    <Text style={styles.validationText}>
                      {' '}
                      {phoneNumberValidationMsg}
                    </Text>
                  ) : null}
                  <View
                    style={[
                      styles.inputView,
                      { borderColor: phoneNumberBorderColor },
                    ]}>
                    <Icon
                      style={styles.icon}
                      name="phone"
                      type="font-awesome"
                    />
                    <TextInput
                      style={styles.phone_check}
                      maxLength={10}
                      onChangeText={handlePhoneNumberChange}
                      autoCorrect={false}
                      value={phoneNumber}
                      keyboardType="numeric"
                      placeholder="Phone Number"
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.regbtn}
                    onPress={async () => await checkUserexist()}>
                    <Text style={styles.regbtntext}>Next</Text>
                  </TouchableOpacity>
                </View>
              )} */}
              {/* {!userexist && ( */}
                <View>
                  {/*input for username  */}
                  {nameValidationMsg ? (
                    <Text style={styles.validationText}>
                      {nameValidationMsg}
                    </Text>
                  ) : null}
                  <View
                    style={[
                      styles.inputView,
                      { borderColor: nameBorderColor },
                    ]}>
                    <Icon style={styles.icon} name="user" type="font-awesome" />
                    <TextInput
                      style={{ flex: 1, paddingHorizontal: 12 }}
                      onChangeText={handleNameChange}
                      autoCorrect={false}
                      value={name}
                      placeholder="Enter Username"
                    />
                  </View>

                  {/*input for designation  */}
                  {designationValidationMsg ? (
                    <Text style={styles.validationText}>
                      {designationValidationMsg}
                    </Text>
                  ) : null}
                  <View
                    style={[
                      styles.inputView,
                      { borderColor: designationBorderColor },
                    ]}>
                    <Icon
                      style={styles.icon}
                      name="briefcase"
                      type="font-awesome"
                    />
                    <TextInput
                      style={{ flex: 1, paddingHorizontal: 12 }}
                      onChangeText={handleDesignationChange}
                      autoCorrect={false}
                      value={designation}
                      placeholder="Enter Designation"
                    />
                  </View>

                  {/*input picker for usertype  */}
                  <View style={styles.inputView}>
                    <Picker
                      style={styles.inputViewPicker}
                      selectedValue={selectedusertype}
                      onValueChange={(itemVal1) => {
                        setSelectedtype(itemVal1);
                      }}>
                      {usertypes.map((l) => (
                        <Picker.Item label={l} value={l} />
                      ))}
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
                      {gender.map((l) => (
                        <Picker.Item label={l} value={l} />
                      ))}
                    </Picker>
                  </View>

                  {state.length > 0 && (
                    <FlatList
                      data={stateSuggestions}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => setStateSelected(item)}
                          style={styles.suggestionItem} // Apply your custom styles here
                        >
                          <Text style={styles.suggestionText}>{item}</Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item}
                      style={styles.suggestionList} // Apply your custom styles here
                    />
                )}

                  {/* select state . */}
                  <View
                    style={styles.inputView}>
                    <Icon
                      style={styles.icon}
                      name="room"
                      type="material"
                    />
                    <TextInput
                      style={{ flex: 1, paddingHorizontal: 12 }}
                      onChangeText={handleStatesTextChange}
                      // onPress={handleStatesTextChange}
                      autoCorrect={false}
                      value={state}
                      placeholder="Enter State"
                    />
                  </View>

                  <FlatList
                    data={districtSuggestions}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => setdistrictSelected(item)}
                        style={styles.suggestionItem} // Apply your custom styles here
                      >
                        <Text style={styles.suggestionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    style={styles.suggestionList} // Apply your custom styles here
                    horizontal={false}
                  />

                  <View
                    style={styles.inputView}>
                    <Icon
                      style={styles.icon}
                      name="street-view"
                      type="font-awesome"
                    />
                    <TextInput
                      style={{ flex: 1, paddingHorizontal: 12 }}
                      onChangeText={handleDistrictChange}
                      autoCorrect={false}
                      value={district}
                      placeholder="Enter District"
                    />
                  </View>


                  <FlatList
                    data={vidhan_sabhaSuggestions}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => setvidhanshabhaSelected(item)}
                        style={styles.suggestionItem} // Apply your custom styles here
                      >
                        <Text style={styles.suggestionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    style={styles.suggestionList} // Apply your custom styles here
                    horizontal={false}
                  />
                  <View
                    style={styles.inputView}>
                    <Icon
                      style={styles.icon}
                      name="navigation"
                      type="feather"
                    />
                    <TextInput
                      style={{ flex: 1, paddingHorizontal: 12 }}
                      onChangeText={handleVidhanShabhaChange}
                      autoCorrect={false}
                      value={vidhan_shabha}
                      placeholder="Enter Vidhan-shabha"
                    />
                  </View>

                  {!profileuploaded && (
                    <TouchableOpacity
                      style={styles.selectButton}
                      onPress={() => openImagePicker(setProfile, 1)}>
                      <Text style={btn_text_color}>Upload Profile</Text>
                    </TouchableOpacity>
                  )}
                  {profileuploaded && (
                    <View style={styles.imageprevprofile}>
                      <Image
                        source={{ uri: profile }}
                        style={styles.imageprofile}
                      />
                      <TouchableOpacity
                        style={styles.closeButtonprofile}
                        onPress={() => reuploadimage()}>
                        <Text style={styles.closeButtonTextprofile}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {/* Render the upload button for leaders */}
                  {isLeader && (
                    <TouchableOpacity
                      style={styles.selectButton}
                      onPress={() => openImagePicker(setLeader)}>
                      <Text style={btn_text_color}>Upload Leader Image</Text>
                    </TouchableOpacity>
                  )}

                  {phoneNumberValidationMsg ? (
                    <Text style={styles.validationText}>
                      {phoneNumberValidationMsg}
                    </Text>
                  ) : null}
                  <View
                    style={[
                      styles.inputView,
                      { borderColor: phoneNumberBorderColor },
                    ]}>
                    <Icon
                      style={styles.icon}
                      name="phone"
                      type="font-awesome"
                    />
                    <TextInput
                      style={styles.phone_check}
                      maxLength={10}
                      onChangeText={handlePhoneNumberChange}
                      autoCorrect={false}
                      value={phoneNumber}
                      onBlur={async () => await checkUserexist()}
                      keyboardType="numeric"
                      placeholder="Phone Number"
                    />
                  </View>

                  {passwordValidationMsg ? (
                    <Text style={styles.validationText}>
                      {passwordValidationMsg}
                    </Text>
                  ) : null}
                  <View
                    style={[
                      styles.inputView,
                      { borderColor: passwordBorderColor },
                    ]}>
                    <Icon style={styles.icon} name="lock" type="font-awesome" />
                    <TextInput
                      style={styles.phone_check}
                      onChangeText={handlePasswordChange}
                      autoCorrect={false}
                      value={password}
                      placeholder="Password"
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.regbtn}
                    title="Create account"
                    onPress={async () => await sendOtp()}>
                    <Text style={styles.regbtntext}>Create Account</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLinkText}>
                      Already have an account? Login
                    </Text>
                  </TouchableOpacity>
                </View>
              {/* )} */}
              {otpSent && (
                <View>
                  <View style={[styles.inputView, { top: 40 }]}>
                    <Icon style={styles.icon} name="lock" type="font-awesome" />
                    <TextInput
                      style={styles.phone_check}
                      onChangeText={(e) => {
                        setOtp(e);
                      }}
                      autoCorrect={false}
                      value={otp}
                      placeholder="Enter OTP"
                    />
                  </View>

                  <TouchableOpacity
                    style={[styles.regbtn, { top: 50 }]}
                    title="Confirm OTP"
                    onPress={async () => await confirmSignup()}>
                    <Text style={styles.regbtntext}>Verify OTP</Text>
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

export default SignupScreen;
