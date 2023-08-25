import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalizedEvents, getTodaysEvent } from '../../actions/event';
import { getTodaysDate } from '../../utils/getTodaysDate';
const { width, height } = Dimensions.get('screen');
import { Icon } from 'react-native-elements';

function DownloadScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const events = useSelector((state) => state.todaysEvent);

  console.log(events)
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
  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.backbar}>
          <TouchableOpacity style={styles.backbtn} onPress={() => navigation.navigate('HomeScreen')}>
            <Icon
              name="arrow-left"
              type="font-awesome"
              color="black"
              size={20}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View>
          {events && user && events.length > 0 && (
            <FlatList
              style={{ marginTop: 20 }}
              data={events}
              horizontal={false}
              renderItem={({ item }) => (
                <View style={styles.fullimg}>
                  <View style={styles.header}>
                    <Image style={styles.profileimg} source={{ uri: user.data.profile_photo_url }} />
                    <Text style={styles.username}>{user.data.name}</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.mainImage}>
                    <Image
                      source={{ uri: item.event.coverImage }}
                      style={styles.mainimgbg}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        left: '20%',
                      }}>
                      {user.data.leader_images.map((e, i) => (
                        <Image
                          source={{ uri: e }}
                          key={i}
                          style={styles.leaderimg}
                        />
                      ))}
                    </View>
                    {user.data.user_type == 'USER' && (
                      <Image
                        source={{ uri: user.data.leader.profile_photo_url }}
                        style={styles.mainleaderimg}
                      />
                    )}

                    <Image
                      source={{ uri: user.data.profile_photo_url }}
                      style={styles.userimg}
                    />

                  </TouchableOpacity>
                  <Text style={styles.imgtitle}>{item.event.title}</Text>
                  <Text style={styles.eventtext}>{item.event.text}</Text>
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
              )}
            />
          )}

        </View>
      </View>

    </SafeAreaView>
  );
}

export default DownloadScreen;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "white",
  },
  mainImage: {
    backgroundColor: 'skyblue',
    elevation: 10,
    background: 'white',
    width: width - 70,
    height: width - 70,
    borderRadius: 9,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  mainimgbg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 9,
    overflow: 'hidden',
  },
  leaderimg: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 50,
  },
  mainleaderimg: {
    width: 100,
    height: 100,
    bottom: 3,
    left: 3,
    position: 'absolute',
  },
  userimg: {
    width: 100,
    height: 100,
    bottom: 3,
    right: 3,
    position: 'absolute',
  },
  imgtitle: {
    flexDirection: 'row',
    fontSize: 16,
    color: "#0C356A",
    margin: 10,
  },

  fullimg: {
    alignItems: "center",
    margin: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
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
  eventtext: {
    textAlign: "center",
    fontSize: 14,
    color: "#4D3C77",
    margin: 5,
  },
  backbar: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
    marginTop: 25,
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
    borderColor: 'blue',
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  btnview: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    margin:20,
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

  downloadbtntextshare: {
    marginLeft: 5,
  },
  sharebtn: {
    backgroundColor: '#279EFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginHorizontal: 10,
    flexDirection: "row",
  }
})