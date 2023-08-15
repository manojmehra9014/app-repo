import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView,
  Text,
  View,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EventScreen({ navigation }) {
  const viewShotRef = useRef();
  const screenWidth = Dimensions.get('window').width - 30;
  const user = useSelector((state) => state.user);
  const event = useSelector((state) => state.activeEvent);
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
          // let album = await MediaLibrary.getAlbumAsync('Download');
          // console.log(album, ' line 56');
          // if (!album) {
          //   const dummyAsset = await MediaLibrary.createAssetAsync(uri);
          //   album = await MediaLibrary.createAlbumAsync(
          //     'Download',
          //     dummyAsset,
          //     false
          //   );
          // }

          // const asset = await MediaLibrary.createAssetAsync(uri);
          // console.log(asset.filename);
          // await MediaLibrary.addAssetsToAlbumAsync([asset], 'Download', false);

          // await storeData(event.event.text, asset.filename);
          // setTimeout(() => {
          //   Alert.alert('Downloaded!', 'Event Successfully Downloaded!');
          // });
          // console.log('Image saved to gallery!');
        }
      }
    } catch (e) {
      Alert.alert('Oops!');
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={{ marginTop: 40 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            height: '100%',
          }}>
          <View style={{ width: screenWidth, alignItems: 'center' }}>
            <Text
              style={{ fontSize: 25, fontWeight: 800, textAlign: 'center' }}>
              {event.event.title}
            </Text>
          </View>
          <View
            style={{
              width: screenWidth,
              height: screenWidth,
              elevation: 10,
              // backgroundColor: 'red',
            }}>
            {event && user && (
              <ViewShot
                ref={viewShotRef}
                options={{
                  format: 'png',
                  quality: 1,
                  fileName: `${Date.now()}`,
                  height: 1000,
                  width: 1000,
                }}>
                <Image
                  source={{ uri: event.event.coverImage }}
                  style={{
                    width: screenWidth,
                    height: screenWidth,
                    borderRadius: 10,
                    // position: 'absolute',
                  }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    gap: 3,
                    padding: 10,
                  }}>
                  {user.data.user_type === 'USER' &&
                    user.data.leader_images.map((e, i) => {
                      return (
                        <Image
                          source={{ uri: e }}
                          key={i}
                          style={{
                            width: screenWidth / 10,
                            height: screenWidth / 10,
                            zIndex: 10,
                            borderRadius: 50,
                          }}
                        />
                      );
                    })}
                </View>
                <View
                  style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    bottom: 1,
                    // padding: 10,
                    // marginBottom: screenWidth / 10,
                    width: '100%',
                  }}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={{ uri: user.data.profile_photo_url }}
                      style={{
                        width: screenWidth / 3,
                        height: screenWidth / 3,
                        zIndex: 10,
                      }}
                    />
                    <Text
                      style={{ fontSize: screenWidth / 23, fontWeight: 700 }}>
                      {user.data.name}
                    </Text>
                  </View>
                  {user.data.user_type === 'USER' && (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{ uri: user.data.leader.profile_photo_url }}
                        style={{
                          width: screenWidth / 3,
                          height: screenWidth / 3,
                          zIndex: 10,
                        }}
                      />
                      <Text
                        style={{ fontSize: screenWidth / 23, fontWeight: 700 }}>
                        {user.data.leader.name}
                      </Text>
                    </View>
                  )}
                </View>
              </ViewShot>
            )}
          </View>
          <View style={{ width: screenWidth }}>
            <Text style={{ textAlign: 'center' }}>{event.event.text}</Text>
          </View>
          <TouchableOpacity onPress={async () => await onCapture()}>
            <Text>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default EventScreen;
