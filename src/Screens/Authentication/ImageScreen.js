import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

const ImageScreen = ({}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  // bgremove api
  const uploadImage = async (image) => {
    if (!image) {
      console.error('No image selected!');
      return;
    }

    try{const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const currentTimestamp = new Date().getTime(); // gets the current time in milliseconds
    const fileName = `${currentTimestamp}.${fileType}`;

    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: fileName,
      type: `image/${fileType}`,
    });

    const response = await fetch(
      'http://13.200.103.27:5000/api/remove_background',
      {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(response)
    const data = await response.json();
    setImageUrl(data.s3_object_url);}catch(e){
      console.log(e)
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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
      await uploadImage(result.assets[0].uri);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <View style={{ marginTop: 50 }}>
        {loading ? (
          <View>
            <Text>Loading</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.selectButton}
            onPress={async () => await pickImage()}>
            <Text style={{ color: '#FEA1A1' }}>Upload Image</Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: 240,
              height: '100%',
            }}
          />
        )}
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
