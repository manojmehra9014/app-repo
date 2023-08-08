import React, { useState, useRef, useEffect } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, Picker, ImagePickerIOS, Image, TouchableOpacity, View, Dimensions, } from 'react-native';
const colors = ['#FEBBCC', '#FFDDCC', '#F6F4EB'];
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserStatus, registerUser, sendOtpApi } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
import { logo } from '../../const';
import useDrivePicker from 'react-google-drive-picker'


const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('https://d61uti3sxgkhy.cloudfront.net/rahul.jpg');
  const [cover, setCover] = useState('https://d61uti3sxgkhy.cloudfront.net/rahul.jpg');
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
  };

  //image picker

  const [openPicker ,data , authResponse]=useDrivePicker()

  const handleOpenPicker = () => {
    openPicker({
      clientId:"137775640070-s88tlidvuie925ieecjdfg9rs5ggqh45.apps.googleusercontent.com",
      developerKey: "AIzaSyATrzPzorr0EKubCJKLPKOPcak1BHqAefg",
      viewId:"DOCS_IMAGES",
      showUploadView:true,
      showUploadFolders:true,
      supportDrives:true,
      multiselect:false,

    })
  }
  useEffect(() => {
 if(data){
  
    data.docs.map((i) => console.log(i))
  
 }
  }),[data]



  //gender picker
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Male');

  const genders = ['Male', 'Female', 'Other'];

  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);

    setGender(gender);
    setIsDropdownVisible(false);
  };

  //name

  // const handleChangeTextName = (text) => {
  //   setName(text);

  // };

  // const handleChangeTextDesignation = (text) => {
  //   setDesignation(text);
  // };
  // const handleChangeTextGender = (text) => {
  //   setGender(text);
  //   // console.log(text);
  // };

  // const handleChangeProfile = (text) => {
  //   setProfile(text);
  //   console.log('Profile uploaded !');
  // }
  // const handleChangeCover = (text) => {
  //   setCover(text);
  //   console.log('Cover uploaded !');
  // }
  // const handleChangeTextPhone = (text) => {
  //   setPhoneNumber(text);
  //   // console.log(text);
  // }
  // const handleChangeTextPassword = (text) => {
  //   setPassword(text);
  //   // console.log(text);
  // }


  const Main = styled(View)`
    widht:80vw;
    height:900px;
    margin:30px;
  `;

  const Input = styled(TextInput)`
  border:2px solid #FF8989;
  font-size:18px;
  border-radius:19px;
  margin-bottom:10px;
  `;

  const Logo = styled(Image)`
  border:3px solid #1D5B79;
  border-radius: 50px;
  `;

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


          <Main style={styles.main}>
            <Logo source={logo} style={styles.logo} />
            <Text style={styles.heading}>SignUp</Text>
          
            <Input placeholder='Username' style={styles.Input} value={name} onChangeText={() => {
              setName();
            }} />
            <Input placeholder='Designation' style={styles.Input} value={designation} onChangeText={() => {
              setDesignation();
            }} />


            <TouchableOpacity style={styles.selectButton} value={gender} onPress={handleToggleDropdown}>
              <Text>{selectedGender}</Text>
            </TouchableOpacity>
            {isDropdownVisible && (
              <View style={styles.dropdownOptions}>
                {genders.map((gender) => (
                  <TouchableOpacity key={gender} onPress={() => handleSelectGender(gender)}>
                    <Text style={styles.option}>{gender}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}


            <TouchableOpacity style={styles.selectButton} value={profile} onPress={() => {
              handleOpenPicker();
            }}>
              <Text style={{ color: '#FEA1A1' }}>Upload Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.selectButton} value={cover} onPress={() => {
              handleOpenPicker();
            }}>
              <Text style={{ color: '#FEA1A1' }}>Upload Cover</Text>
            </TouchableOpacity>





            <Input placeholder='Phone number' value={phoneNumber} keyboardType='numeric' style={styles.Input} onChangeText={() => {
              setPhoneNumber();
            }} />
            <Input placeholder='Password' secureTextEntry={true} value={password} style={styles.Input} onChangeText={() => {
              setPassword();
            }} />


            <TouchableOpacity style={styles.regbtn} title='Create account' onPress={async () => await sendOtp()}>
              <Text style={{ color: "#fff", fontSize: 18 }}>Create Account</Text>
            </TouchableOpacity>





            {otpSent && (
              <View>
                <Input
                  style={styles.input}
                  onChangeText={(e) => {
                    setOtp(e);
                  }}
                  // autoComplete={false}
                  value={otp}
                  placeholder="Enter Otp"
                />
                <TouchableOpacity
                  style={styles.regbtn}
                  title="Confirm OTP"
                  onPress={async () => await confirmSignup()}>Verify OTP</TouchableOpacity>
              </View>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLinkText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </Main>


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
  Input: {
    paddingHorizontal: 20,
    fontSize: 18,
    height: 40,
    borderColor: '#FF8989',
    width: '100%',
    height: 40,
    textAlign: 'center',
    borderWidth: 1.8,
    borderRadius: 19,
    marginBottom: 15,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginLeft: width / 2 - 45,
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#30A2FF',
    height: 40,
    left: 75,
    top: 0,
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
  dropdownButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  dropdownOptions: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#FF8989',
    borderRadius: 9,
    backgroundColor: '#FFECEC',
  },
  option: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  },



});


export default SignupScreen;
