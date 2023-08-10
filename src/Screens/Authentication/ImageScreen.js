import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import {  Button,  SafeAreaView,  StyleSheet,   View,} from 'react-native';
import {image_bg_remove_api, } from '../../actions/auth';
import * as ImagePicker from 'expo-image-picker';

const ImageScreen = ({}) => {

const [profile, setProfile] = useState('https://d61uti3sxgkhy.cloudfront.net/rahul.jpg');

  //bgremove api
  const image_bg_remove = async (profile) => {
    try{
      const res = await image_bg_remove_api(profile);
      setProfile(res.s3_object_url);
      console.log(res.s3_object_url , 'image_bg_remove');
    }
    catch(error){
      console.error('API Error:', error);
    }
  };


  //open image picker
  const openImagePicker = async (setProfile) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access media library is required.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      aspect:[4,4],
      quality:1,
    });

    if (!pickerResult.canceled) {
      const phoneNumber = '1234567890'; // Replace with actual phone number
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
      const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}`;
      const imageFileType = pickerResult.uri.split('.').pop(); // Extract file extension from the URI
      const imageUrl = `https://+91${phoneNumber}_${formattedDate}_Now_${formattedTime}.${imageFileType}`;
      
      setProfile(imageUrl);
    }
  };
  

  return (
    <SafeAreaView>
      
        <View style={{top:100}}>
          <Button
            title="pick image"
            value={profile}
            onPress={() => openImagePicker(setProfile)}
            style={{
              padding: 10,
              backgroundColor: '#cdd1cf',
              width: '100%',
            }}></Button>

            <Button
            title="log data"
            onPress={image_bg_remove}
            style={{
              top:300,
              padding: 10,
              backgroundColor: '#cdd1cf',
              width: '100%',
            }}
            ></Button>
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

export default ImageScreen;