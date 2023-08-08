import React, { useState, useRef, useEffect } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, Dimensions, } from 'react-native';
const colors = ['#FEBBCC', '#FFDDCC', '#F6F4EB'];
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserStatus, registerUser, sendOtpApi } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
import { logo } from '../../const';
import useDrivePicker from 'react-google-drive-picker';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
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


  //gender picker 
  const [selectedGender, setSelectedGender] = useState('male');
  const [gender] = useState(
    [
      'male',
      'female',
      'other',
    ].sort()
  );


  const Main = styled(View)`
    widht:80vw;
    height:900px;
    margin:30px;
  `;

  //image pickerr

  //   const [openPicker ,data , authResponse]=useDrivePicker()

  //   const handleOpenPicker = () => {
  //     openPicker({
  //       clientId:"137775640070-s88tlidvuie925ieecjdfg9rs5ggqh45.apps.googleusercontent.com",
  //       developerKey: "AIzaSyATrzPzorr0EKubCJKLPKOPcak1BHqAefg",
  //       viewId:"DOCS",
  //       showUploadView:true,
  //       showUploadFolders:true,
  //       supportDrives:true,
  //       multiselect:true,
  //     })
  //   }
  //   useEffect(() => {
  //  if(data){
  //     data.docs.map((i) => console.log(i))
  //  }
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


          <Main style={styles.main}>

            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.logoImage} />
              <Text style={{ fontSize: 24, top: 20, fontWeight: "900", textAlign: "center" }}>SignUp</Text>
            </View>

            <View style={styles.inputFileds}>
              {/*input for username  */}
              <View style={styles.inputView}>
                <Icon color='#333' name='user' type='font-awesome' size={20} />
                <TextInput style={{ flex: 1, paddingHorizontal: 12, }} placeholder={'Full name'} value={name} autoCorrect={false} autoFocus={true} onChangeText={(e) => { setName(e); }} />
              </View>


              {/*input for designation  */}
              <View style={styles.inputView}>
                <Icon color='#333' name='briefcase' type='font-awesome' size={20} />
                <TextInput style={{ flex: 1, paddingHorizontal: 12, }} placeholder={'Enter designation'} value={designation} autoCorrect={false} autoFocus={true} />
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
                <TextInput style={{ flex: 1, paddingHorizontal: 12, }} placeholder={'Enter Phone number'} value={phoneNumber} autoCorrect={false} autoFocus={true} />
              </View>

              <View style={styles.inputView}>
                <Icon color='#333' name='lock' type='font-awesome' size={20} />
                <TextInput style={{ flex: 1, paddingHorizontal: 12, }} placeholder={'Enter password'} autoCorrect={false} autoFocus={true} />
              </View>



              <TouchableOpacity style={styles.regbtn} title='Create account' onPress={async () => await sendOtp()}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Create Account</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLinkText}>Already have an account? Login</Text>
              </TouchableOpacity>
              {otpSent && (
                <View>
                  <Input
                    style={styles.inputView}
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
            </View>


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
  main: {
    height: height - 50,

  },
  inputFileds: {
    top: 70,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#30A2FF',
    height: 40,
    left: 75,
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
