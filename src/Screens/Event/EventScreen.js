import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView,
  Text,
  View,
  Alert,
  Clipboard,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../utils/styles/EventScreenstyle';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Share from 'expo-sharing';
const screenWidth = Dimensions.get('window').width - 30;
import HomeScreen from '../Home/HomeScreen';
import { Linking } from 'react-native';


function EventScreen({ navigation }) {
  const viewShotRef = useRef(null);
  const user = useSelector((state) => state.user);
  const event = useSelector((state) => state.activeEvent);
  const downloadscreen = useSelector((state) => state.downloadedEvents);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!event) {
      dispatch({
        type: 'CLEAN_CURRENT_ACTIVE_EVENT',
        payload: null,
      });
      navigation.navigate('AllEventsScreen');
    }
  }, [event, navigation]);

  const storeData = async (value, key) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const onCapture = async () => {
    try {
      if (viewShotRef.current) {
        const uri = await viewShotRef.current.capture();
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          const asset = await MediaLibrary.createAssetAsync(uri);

          const album = await MediaLibrary.getAlbumAsync('app');
          if (album == null) {
            await MediaLibrary.createAlbumAsync('app', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
          await storeData(event.event.text, asset.filename);
        }
      }
    } catch (e) {
      Alert.alert('Oops!');
      console.log(e);
    }
  };


  const shareImage = async () => {
    try {
      const uri = await viewShotRef.current.capture(); // Replace with your image capture method
      const message = event.event.text; // Replace with your actual message text

      if (await Share.isAvailableAsync()) {
        // Share the image first
        await Share.shareAsync(uri, {
          mimeType: 'image/jpeg',
          dialogTitle: 'Share this image',
          UTI: 'image/jpeg',
        });

        // Prompt the user to proceed to the next step
        const proceed = window.confirm("Press OK to share the text");

        if (proceed) {
          if (Linking.canOpenURL("whatsapp://send")) {
            // Now share the text
            Linking.openURL(`whatsapp://send?text=${message}`);
          } else {
            alert('WhatsApp is not installed');
          }
        }
      } else {
        alert('Sharing is not available on this platform');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleCopyText = async (text) => {
    try {
      await Clipboard.setString(text);
      console.log('Text copied to clipboard:', text);
    } catch (error) {
      console.error('Error copying text:', error);
    }
  };
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.statusbar}></View>
            <View style={styles.container}>
              <View style={styles.backbar}>
                <TouchableOpacity style={styles.backbtn} onPress={() => navigation.navigate('AlbumList')}>
                  <Icon
                    name="arrow-left"
                    type="font-awesome"
                    color="black"
                    size={20}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <Text style={styles.date}>{formattedDate}</Text>
              </View>
              <View style={styles.eventheadingetxtview}>
                <Text style={styles.eventheadingetxt}>
                  {event.event.title}
                </Text>
              </View>

              <View
                style={styles.containerview}>
                {event && user && (
                  <ViewShot
                    ref={viewShotRef}
                    options={{ format: 'png', quality: 1, height: 1000, width: 1000, }}>
                    <Image source={{ uri: event.updatedCover }}
                      style={styles.maindownloadimg}
                      resizeMode="contain"
                    />
                    <View style={styles.imagecomponent2}>
                      {user.data.user_type === 'USER' &&
                        user.data.leader_images.map((e, i) => {
                          return (
                            <Image source={{ uri: e }} key={i} style={styles.aboveleaderimg} />
                          );
                        })}
                    </View>
                    <View style={styles.imagecomponent}>

                      {/* User PROFILE IMAGE + NAME */}
                      <View style={styles.userprofileinfo}>
                        <Image source={{ uri: user.data.profile_photo_url }} style={styles.userimage} />
                        <Text style={styles.username}>{user.data.name}</Text>
                      </View>

                      {/* leader PROFILE IMAGE +NAME STYLES SAME AS USER(ABOVE) */}
                      {user.data.user_type === 'USER' && (
                        <View style={styles.userprofileinfo}>
                          <Image source={{ uri: user.data.leader.profile_photo_url }} style={styles.userimage} />
                          <Text style={styles.username}>{user.data.leader.name}</Text>
                        </View>
                      )}
                    </View>
                  </ViewShot>
                )}
              </View>
              <View style={styles.downloadbtnview}>

                <TouchableOpacity style={styles.downloadbtn} onPress={async () => await onCapture()}>
                  <Icon style={styles.btnicon} color='white' size={15} name="download" type="font-awesome" />
                  <Text style={styles.downloadbtntext}>Download</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.downloadbtn} onPress={() => handleCopyText(event.event.text)}>
                  <Icon style={styles.btnicon} color='white' size={15} name="copy" type="font-awesome" />
                  <Text style={styles.downloadbtntext}>Copy Text</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.sharebtn} onPress={async () => await shareImage()}>
                  <Icon style={styles.shareicon} color="black" name="share" size={15} type="font-awesome" />
                  <Text style={styles.iconsharetext}>Share</Text>
                </TouchableOpacity>

              </View>
              <View style={styles.eventtextcontainer}>
                <Text style={styles.eventtext}>{event.event.text}</Text>
              </View>

              <View style={styles.layer}>
                <TouchableOpacity style={styles.layerchoose}></TouchableOpacity>
                <TouchableOpacity style={styles.layerchoose}></TouchableOpacity>
                <TouchableOpacity style={styles.layerchoose}></TouchableOpacity>
                <TouchableOpacity style={styles.layerchoose}></TouchableOpacity>

              </View>
              <View style={styles.statusbar}></View>


            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default EventScreen;
