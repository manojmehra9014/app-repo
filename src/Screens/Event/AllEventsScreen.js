import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalizedEvents, getTodaysEvent } from '../../actions/event';
import { getTodaysDate } from '../../utils/getTodaysDate';

function AllEventsScreen() {
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
        
        <View>
          {events && user && events.length > 0 && (
            <FlatList
              style={{ marginTop: 20 }}
              data={events}
              horizontal={false}
              renderItem={({ item }) => (
                <View style={styles.fullimg}>

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
                  <View
                    style={styles.imgtitle}>
                    <Text>{item.event.title}</Text>
                  </View>
                </TouchableOpacity>
                </View>
              )}
            />
          )}

        </View>
      </View>

    </SafeAreaView>
  );
}

export default AllEventsScreen;
const styles = StyleSheet.create({
  container:{
    marginTop:20,
  },
  mainImage: {
    backgroundColor: 'skyblue',
    marginLeft: 10,
    elevation: 10,
    background: 'white',
    width: 315,
    height: 280,
    borderRadius: 14,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
  },
  mainimgbg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 14,
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
  imgtitle:{
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignContent: 'center',
    bottom: 0,
  },

  fullimg:{
    alignItems:"center",
    margin:20,
  },

})