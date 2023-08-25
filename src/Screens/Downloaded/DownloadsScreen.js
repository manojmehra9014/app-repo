import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { FlatList, Image, SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../Home/HomeScreen';
import { useState } from 'react';
const { width, height } = Dimensions.get('screen');

function DownloadScreen({ navigation }) {
  const downloadedEvents = useSelector((state) => state.downloadedEvents);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  // console.log(downloadedEvents, "ye hn download event");
  // console.log(user.data.profile_photo_url, "user data");
  useEffect(() => {
    const loadData = async () => {
      // console.log('Running in Downloads screen');
      const album = await MediaLibrary.getAlbumAsync('app');

      const assets = await MediaLibrary.getAssetsAsync({
        first: 6,
        album,
        mediaType: 'photo',
      });
      // console.log(assets.endCursor);
      eventsWithText = [];
      for (let asset of assets.assets) {
        const text = await AsyncStorage.getItem(asset.filename);
        eventsWithText.push([asset, text]);
      }
      page += 1;
      dispatch({
        type: 'SET_DOWNLOADED_EVENTS',
        payload: {
          lastFetched: {
            endCursor: assets.endCursor,
            hasNextPage: assets.hasNextPage,
          },
          eventsWithText,
        },
      });
    };

    const loadNext = async () => {
      const album = await MediaLibrary.getAlbumAsync('app');
      const assets = await MediaLibrary.getAssetsAsync({
        after: downloadedEvents.lastFetched.endCursor,
        album,
        mediaType: 'photo',
      });
      eventsWithText = [];
      for (let i = 0; i < downloadedEvents.eventsWithText.length; i++) {
        eventsWithText.push(downloadedEvents.eventsWithText[i]);
      }
      for (let asset of assets.assets) {
        const text = await AsyncStorage.getItem(asset.filename);
        eventsWithText.push([asset, text]);
      }
      // console.log(eventsWithText);
      dispatch({
        type: 'SET_DOWNLOADED_EVENTS',
        payload: {
          lastFetched: {
            endCursor: assets.endCursor,
            hasNextPage: assets.hasNextPage,
          },
          eventsWithText,
        },
      });
    };
    try {
      if (!downloadedEvents) {
        loadData();
      } else {
        loadNext();
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();

  return (
    <>
      <ScrollView>
        <SafeAreaView>
          <StatusBar />
          <View style={styles.container}>
            <View>
            </View>
            <View style={styles.backbar}>
              <TouchableOpacity style={styles.backbtn} onPress={() => navigation.navigate('HomeScreen')}>
                <Icon
                  name="arrow-left"
                  type="font-awesome"
                  color="blue"
                  size={20}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.date}>{formattedDate}</Text>
            </View>
            <View>
              <Text style={styles.downloaditemnum}>Total Downloaded Pictures - {downloadedEvents.eventsWithText.length}</Text>
            </View>
            <View style={styles.mainContainer}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <FlatList
                  style={{ marginTop: 20 }}
                  data={downloadedEvents.eventsWithText}
                  horizontal={false}
                  // keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    // console.log(item[0].uri);
                    return (
                      <View style={styles.card}>
                        <View style={styles.header}>
                          <Image style={styles.profileimg} source={{ uri: user.data.profile_photo_url }} />
                          <Text style={styles.username}>{user.data.name}</Text>
                        </View>
                        <Image
                          style={styles.cardimg}
                          source={{ uri: item[0].uri }}
                        />
                        <Text style={styles.cardText}>{item[1]}</Text>
                        <View style={styles.btnview}>
                          <TouchableOpacity style={styles.downloadbtn} onPress={() => handleCopyText(event.event.text)}>
                            <Icon style={styles.btnicon} color='white' size={20} name="copy" type="font-awesome" />
                            <Text style={styles.downloadbtntext}>Copy Text</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.sharebtn} onPress={async () => await onShare()}>
                            <Icon style={styles.shareicon} color="black" name="share" size={20} type="font-awesome" />
                            <Text style={styles.downloadbtntextshare}>Share</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView >
      </ScrollView>
    </>
  );
}

export default DownloadScreen;


const styles = StyleSheet.create({

  mainContainer: {
    flex: 1, // Make sure the container takes up the full available space
  },
  container: {
    marginTop: 40,
    textAlign: "center",
    backgroundColor: "white",
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
    marginTop: 15,
  },
  btnicon: {
    marginRight: 5,
  },
  date: {
    fontSize: 16,
  },
  backbtn: {
    borderRadius: 40,
    borderWidth: 0.6,
    borderColor: 'lightblue',
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  card: {
    // justifyContent: "center",
    textAlign: "center",
    paddingHorizontal: 5,
    paddingBottom: 30,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
  },
  cardimg: {
    width: width - 50,
    height: width - 50,
    alignSelf: "center",
    margin: 10,
  },
  cardText: {
    textAlign: "center",
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 12,

  },
  downloaditemnum: {
    textAlign: "center",
  },
  header: {
    flex: 1,
    height: 50,
    margin: 5,
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  profileimg: {
    height: 40,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 0.5,
    backgroundColor: "white",
    width: 40,
    justifyContent: "center",
    alignSelf: "center",
  },
  username: {
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 10,
    fontSize: 16,
  },
  btnview: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
  },
  downloadbtn: {
    backgroundColor: '#279EFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  downloadbtntext: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  downloadbtntextshare:{
    marginLeft:5,
  },
  sharebtn:{
    backgroundColor: '#279EFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginHorizontal: 10,
    flexDirection: "row",
  }
})