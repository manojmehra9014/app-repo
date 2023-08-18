import { Auth } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalizedEvents, getTodaysEvent } from '../../actions/event';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';

import { getTodaysDate } from '../../utils/getTodaysDate';
import { Button } from 'react-native-elements';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const events = useSelector((state) => state.todaysEvent);
  const downloadedEvents = useSelector((state) => state.downloadedEvents);

  let page = 1;
  const assetsPerPage = 10;

  function logout() {
    dispatch({
      type: 'LOGGED_OUT',
      payload: null,
    });
  }
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { user_type } = user.data;
        const today = getTodaysDate();
        if (user_type === 'USER') {
          let {
            political_party,
            state_name,
            district_name,
            vidhan_shabha_name,
            leader,
          } = user.data;
          leader = leader.mobile_number.replace('+', '');
          const res = await getPersonalizedEvents({
            today,
            political_party,
            state: state_name,
            district: district_name,
            vidhan_shabha: vidhan_shabha_name,
            leader,
            date: today,
          });
          dispatch({
            type: 'TODAYS_EVENT',
            payload: res.data,
          });
        }

        if (user_type === 'INDIVIDUAL') {
          const res = await getTodaysEvent(today);
          dispatch({
            type: 'TODAYS_EVENT',
            payload: res.data,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const album = await MediaLibrary.getAlbumAsync('app');

        if (!album) {
          // Handle the case where the album is not found
          console.log("Album 'app' not found");
          return;
        }

        const assets = await MediaLibrary.getAssetsAsync({
          first: 4,
          album,
          mediaType: 'photo',
        });

        console.log(assets.endCursor);

        const eventsWithText = [];
        for (let asset of assets.assets) {
          const text = await AsyncStorage.getItem(asset.filename);
          eventsWithText.push([ asset, text ]);
        }

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
      } catch (e) {
        console.log(e);
      }
    };

    // Make sure downloadedEvents is properly defined before using it
    if (!downloadedEvents) {
      loadData();
    }

  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem('user-key');
    logout();
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#EDEDF1" barStyle={'dark-content'} />
      <View style={{ flexGrow: 1 }}>
        <ScrollView
          style={{ flexGrow: 1 }}
          scrollEnabled={true}
          nestedScrollEnabled={true}>
          <View
            style={{
              marginTop: 40,
              width: '100%',
              height: '100%',
            }}>
            <Text>HomeScreen</Text>
            <TouchableOpacity
              onPress={async () => {
                navigation.navigate('EventScreen');
              }}>
              <Text>Event Screen</Text>
            </TouchableOpacity>
            <Button
              title={'Logout'}
              onPress={async () => {
                await signOut();
              }}></Button>
            <View>
              {events && user && events.length > 0 && (
                <FlatList
                  style={{ marginTop: 20 }}
                  data={events}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        dispatch({
                          type: 'SET_CURRENT_ACTIVE_EVENT',
                          payload: item,
                        });
                        navigation.navigate('EventRoute', {
                          screen: 'EventScreen',
                        });
                      }}
                      style={{
                        backgroundColor: 'yellow',
                        marginLeft: 10,
                        elevation: 10,
                        background: 'white',
                        width: 315,
                        height: 280,
                        borderRadius: 14,
                        shadowColor: 'rgba(0, 0, 0, 0.15)',
                      }}>
                      <Image
                        source={{ uri: item.event.coverImage }}
                        style={{
                          height: '100%',
                          width: '100%',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          borderRadius: 14,
                          overflow: 'hidden',
                        }}
                        resizeMode="cover"
                      />
                      <View
                        style={{
                          position: 'absolute',
                          flexDirection: 'row',
                          left: '30%',
                        }}>
                        {user.data.leader_images.map((e, i) => (
                          <Image
                            source={{ uri: e }}
                            key={i}
                            style={{
                              width: 40,
                              height: 40,
                              margin: 10,
                              borderRadius: 50,
                            }}
                          />
                        ))}
                      </View>
                      {user.data.user_type == 'USER' && (
                        <Image
                          source={{ uri: user.data.leader.profile_photo_url }}
                          style={{
                            width: 100,
                            height: 100,
                            bottom: 3,
                            left: 3,
                            position: 'absolute',
                          }}
                        />
                      )}

                      <Image
                        source={{ uri: user.data.profile_photo_url }}
                        style={{
                          width: 100,
                          height: 100,
                          bottom: 3,
                          right: 3,
                          position: 'absolute',
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          position: 'absolute',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          alignContent: 'center',
                          bottom: 0,
                        }}>
                        <Text>{item.event.title}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item._id}
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </View>
            <View
              style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Downloaded Events</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {downloadedEvents &&
                downloadedEvents.eventsWithText &&
                downloadedEvents.eventsWithText.length > 0 &&
                downloadedEvents.eventsWithText.map((e, i) => {

                  if (i > 3) return;
                  return (
                    <View key={i} style={{ padding: 10 }}>
                      <View>
                        <Image
                          source={{ uri: e[0].uri }}
                          style={{ height: 120, width: 120 }}
                        />
                      </View>
                    </View>
                  );
                })}
            </View>
            <View>
              <Button
                onPress={() => navigation.navigate('DownloadScreen')}
                title="Go To Downloads"></Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
