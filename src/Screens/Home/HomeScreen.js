import { Auth } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getTodaysEvent } from '../../actions/event';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';

const bgImage = 'https://d61uti3sxgkhy.cloudfront.net/diwali.jpeg';
const userImage = 'https://d61uti3sxgkhy.cloudfront.net/rahul.png';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  function logout() {
    dispatch({
      type: 'LOGGED_OUT',
      payload: null,
    });
  }
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await getTodaysEvent();
        dispatch({
          type: '',
          payload: res.data,
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchdata();
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem('user-key');
    logout();
  };
  return (
    <View>
      <StatusBar backgroundColor="#EDEDF1" barStyle={'dark-content'} />
      <SafeAreaView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <ScrollView
          view={{ height: '100%' }}
          style={{
            marginTop: 10,
            paddingBottom: 30,
            width: '100%',
          }}
          showsVerticalScrollIndicator={false}> */}
          <Text>HomeScreen</Text>
          <ScrollView
            style={{
              flexDirection: 'column',
              padding: 20,
              paddingLeft: 12,
              paddingTop: 5,
              flexGrow: 1,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                backgroundColor: 'red',
              }}>
              <View
                style={{
                  width: '80%',
                  height: 200,
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                    overflow: 'hidden',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: bgImage }}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                    }}
                  />
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                      bottom: 40,
                    }}>
                    <Image
                      source={{ uri: userImage }}
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        height: 75,
                        width: 75,
                        zIndex: 3,
                      }}
                    />
                    <Image
                      source={{ uri: userImage }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        height: 75,
                        width: 75,
                        zIndex: 3,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 30,
                        position: 'relative',
                      }}>
                      हेमन्त
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 30,
                        position: 'relative',
                      }}>
                      हेमन्त जोशी
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ marginLeft: 20 }}></View>
              <View
                style={{
                  width: '80%',
                  height: 200,
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={{ uri: bgImage }}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                    }}
                  />
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                      bottom: 40,
                    }}>
                    <Image
                      source={{ uri: userImage }}
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        height: 75,
                        width: 75,
                        zIndex: 3,
                      }}
                    />
                    <Image
                      source={{ uri: userImage }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        height: 75,
                        width: 75,
                        zIndex: 3,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 30,
                        position: 'relative',
                      }}>
                      हेमन्त
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 30,
                        position: 'relative',
                      }}>
                      हेमन्त जोशी
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '80%',
                  height: 200,
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                    overflow: 'hidden',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: bgImage }}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                    }}
                  />
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                      bottom: 40,
                    }}>
                    <Image
                      source={{ uri: userImage }}
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        height: 75,
                        width: 75,
                        zIndex: 3,
                      }}
                    />
                    <Image
                      source={{ uri: userImage }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        height: 75,
                        width: 75,
                        zIndex: 3,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 30,
                        position: 'relative',
                      }}>
                      हेमन्त
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 30,
                        position: 'relative',
                      }}>
                      हेमन्त जोशी
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          {/* </ScrollView> */}
          <TouchableOpacity
            onPress={async () => {
              navigation.navigate('EventScreen');
            }}>
            <Text>Event Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => await signOut()}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default HomeScreen;
