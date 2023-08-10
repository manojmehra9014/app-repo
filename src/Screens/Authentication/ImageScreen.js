import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import {  Button,  SafeAreaView,  StyleSheet,TouchableOpacity,Text,   View,} from 'react-native';
import {image_bg_remove_api, } from '../../actions/auth';
import * as ImagePicker from 'expo-image-picker';

const ImageScreen = ({}) => {

const [profile, setProfile] = useState('');

  // bgremove api
  const image_bg_remove = async (profile) => {
    try{
      const res = await image_bg_remove_api(profile);
      console.log(res , " from api log");
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

    if (!pickerResult.canceled){
      setProfile(pickerResult.uri);
      console.log(pickerResult.uri);
       image_bg_remove(pickerResult.uri);
      // console.log(res,' image k link hoga syd ye');
    }
  };
  

  return (
    <SafeAreaView>
      
        <View style={{top:100}}>
        <TouchableOpacity style={styles.selectButton} value={profile} onPress={() => openImagePicker(setProfile)}>
                    <Text style={{ color: '#FEA1A1' }}>Upload Profile</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.selectButton} onPress={image_bg_remove(profile)}>
                    <Text style={{ color: '#FEA1A1' }}>Get Profile</Text>
        </TouchableOpacity> */}

            
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
});

export default ImageScreen;