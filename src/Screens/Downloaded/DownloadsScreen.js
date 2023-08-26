import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalizedEvents, getTodaysEvent } from '../../actions/event';
import { getTodaysDate } from '../../utils/getTodaysDate';
const { width, height } = Dimensions.get('screen');
import { Icon } from 'react-native-elements';
import styles from '../../utils/styles/Downloadstyle';
function DownloadScreen({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const events = useSelector((state) => state.todaysEvent);
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
        <StatusBar backgroundColor="#EDEDF1" barStyle={'dark-content'} />
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
