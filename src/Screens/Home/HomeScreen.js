import { Auth } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  ScrollView,
  Platform,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,

} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from "../../utils/styles/Homestyle"
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalizedEvents, getTodaysEvent } from '../../actions/event';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import { getTodaysDate } from '../../utils/getTodaysDate';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { appbg, logo, appname } from '../../const';
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
        const eventsWithText = [];
        for (let asset of assets.assets) {
          const text = await AsyncStorage.getItem(asset.filename);
          eventsWithText.push([asset, text]);
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

  const AnimatedTypewriterText = ({ sentences, delay, speed, style }) => {
    const [animatedText, setAnimatedText] = useState('');
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
  
    useEffect(() => {
      if (sentences.length !== currentSentenceIndex) startTypingAnimation();
      else setCurrentSentenceIndex(0);
    }, [currentSentenceIndex]);
  
    useEffect(() => {
      const cursorInterval = setInterval(() => {
        setShowCursor(prevState => !prevState);
      }, 500);
      return () => {
        clearInterval(cursorInterval);
      };
    }, []);
  
    const startTypingAnimation = () => {
      const currentSentence = sentences[currentSentenceIndex];
      let index = 0;
  
      const typingInterval = setInterval(() => {
        setAnimatedText(prevState => prevState + currentSentence[index]);
        index++;
  
        if (index === currentSentence.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCurrentSentenceIndex(prevState => prevState + 1);
            setAnimatedText('');
          }, delay);
        }
      }, speed);
    };
  
  
    return (
      <View style={style}>
        <Text style={styles.text}>{animatedText}</Text>
        {showCursor && <Text style={styles.cursor}>|</Text>}
      </View>
    );
  };
  




  return (
    <>
      <SafeAreaView>
        <ScrollView
          style={{ flexGrow: 1 }}
          scrollEnabled={true}
          nestedScrollEnabled={true}>
          {user && user.data &&
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.logosection}>
                  <Image style={styles.logo} source={{ uri: user.data.leader.profile_photo_url }} />
                  <Text style={styles.appname}>{user.data.name}</Text>
                </View>
                <TouchableOpacity style={styles.logoutbtn}
                  onPress={async () => {
                    await signOut();
                  }}><Text style={styles.logouttext}>Logout</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('SettingScreen') }}>
                  <Icon style={styles.icon} color="black" name="bars" type="font-awesome" />
                </TouchableOpacity>
              </View>
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
                          navigation.navigate('HomeRoute', {
                            screen: 'AlbumList',
                          });
                        }}
                        style={styles.eventposter}>
                        <Image
                          source={{ uri: item.event.coverImages[0] }}
                          style={styles.eventposterimg}
                          resizeMode="cover"
                        />
                        <View
                          style={styles.leaderimageview}>
                          {user.data.leader_images.map((e, i) => (
                            <Image
                              source={{ uri: e }}
                              key={i}
                              style={styles.leadertopimg}
                            />
                          ))}
                        </View>
                        {user.data.user_type == 'USER' && (
                          <Image
                            source={{ uri: user.data.leader.profile_photo_url }}
                            style={styles.leaderimgtopview}
                          />
                        )}
                        <Image
                          source={{ uri: user.data.profile_photo_url }}
                          style={styles.userimgtopview}
                        />
                        <View
                          style={styles.eventtitleview}>
                          <Text>{item.event.title}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                  />
                )}
              </View>

              <View style={styles.animation}>
                <AnimatedTypewriterText
                  sentences={[
                    'There is no event today',
                    'Please try again after a moment.',
                    'Enjoy your day!',
                  ]}
                  delay={1000}
                  speed={70}
                  style={styles.textContainer}
                />
              </View>





              <View
                style={styles.downloadtextview}>
                <Text style={styles.downloadtext}>Downloaded Events</Text>
              </View>
              <View
                style={styles.downloadedimageview}>
                {downloadedEvents &&
                  downloadedEvents.eventsWithText &&
                  downloadedEvents.eventsWithText.length > 0 &&
                  downloadedEvents.eventsWithText.map((e, i) => {
                    if (i > 3) return;
                    return (
                      <View key={i} style={{ padding: 10 }}>
                        <View>
                          <TouchableOpacity onPress={() => {
                            navigation.navigate('ImageViewScreen', {
                              name: 'ImageViewScreen',
                              data: e,
                            });
                          }}>
                            < Image
                              source={{ uri: e[0].uri }}
                              style={styles.downloadedimg}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
              </View>
              <View style={{ marginTop: 10 }}>
                <Button
                  onPress={() => navigation.navigate('DownloadScreen')}
                  title="Go To Downloads">
                </Button>
              </View>
            </View>
          }
        </ScrollView>
      </SafeAreaView >
    </>
  );
}
export default HomeScreen;
