import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView,
  Text,
  View,
  Alert,
  StyleSheet,
  Clipboard,
  Share,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width - 30;
import HomeScreen from '../Home/HomeScreen';
function EventScreen({ navigation }) {
  const viewShotRef = useRef();
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

        }
      }
    } catch (e) {
      Alert.alert('Oops!');
      console.log(e);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'here is a message !',
        url: 'www.google.com',
        title: "image is here !",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
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
    <SafeAreaView>
      <StatusBar />
      <View>
        <View style={styles.container}>
          <View style={styles.bigCircle}></View>
          <View style={styles.smallCircle}></View>
          <View style={styles.backbar}>
            <TouchableOpacity style={styles.backbtn} onPress={() => navigation.navigate('HomeScreen')}>
              <Icon
                name="arrow-left"
                type="font-awesome"
                color="white"
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
                options={{ format: 'png', quality: 1, fileName: `${Date.now()}`, height: 1000, width: 1000, }}>
                <Image source={{ uri: event.event.coverImage }}
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
          <View style={styles.eventtextcontainer}>
            <Text style={styles.eventtext}>{event.event.text}</Text>
          </View>

          <View style={styles.downloadbtnview}>
            <TouchableOpacity style={styles.downloadbtn} onPress={() => handleCopyText(event.event.text)}>
              <Icon style={styles.btnicon} color='white' size={20} name="copy" type="font-awesome" />
              <Text style={styles.downloadbtntext}>Copy Text</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadbtn} onPress={async () => await onCapture()}>
              <Icon style={styles.btnicon} color='white' size={20} name="download" type="font-awesome" />
              <Text style={styles.downloadbtntext}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sharebtn} onPress={async () => await onShare()}>
              <Icon style={styles.shareicon} color="black" name="share" size={20} type="font-awesome" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    height: '100%',
    backgroundColor: 'white',
  },
  containerview: {
    width: screenWidth,
    height: screenWidth,
    elevation: 10,
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.8,
    height: Dimensions.get('window').height * 0.5,
    backgroundColor: '#19A7CE',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -150,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#FF6666',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.4,
    right: Dimensions.get('window').width * -0.3,
  },
  eventheadingetxt: {
    fontSize: 25,
    fontWeight: '800',
    color: '#2D4356',
    textAlign: 'center',
  },
  eventheadingetxtview: {
    width: screenWidth,
    alignItems: 'center'
  },
  userimage: {
    width: screenWidth / 3,
    height: screenWidth / 3,
    zIndex: 0,
  },
  username: {
    fontSize: screenWidth / 23,
    fontWeight: 700
  },
  userprofileinfo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventtextcontainer: {
    width: screenWidth - 10,
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 9,

  },
  eventtext: {
    textAlign: "center",
    fontSize: 11,
  },
  imagecomponent: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 1,
    width: '100%',
  },
  imagecomponent2: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 3,
    padding: 10,
  },
  aboveleaderimg: {
    width: screenWidth / 10,
    height: screenWidth / 10,
    zIndex: 10,
    borderRadius: 50,
  },
  maindownloadimg: {
    width: screenWidth,
    height: screenWidth,
    borderRadius: 10,
  },
  downloadbtn: {
    backgroundColor: '#279EFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  downloadbtntext: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",

  },
  downloadbtnview: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
  },
  backbar: {
    width: '100%',
    color: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  btnicon: {
    marginRight: 10,
  },
  date: {
    fontSize: 16,
  },
  backbtn: {
    borderRadius: 40,
    borderWidth: 0.6,
    borderColor: 'white',
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  sharebtn: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

  },
  shareicon: {

  }

})
export default EventScreen;
