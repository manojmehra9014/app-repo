import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../utils/styles/Alleventstyle';

function EventCard({ item, navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleEventPress = () => {
    dispatch({
      type: 'SET_CURRENT_ACTIVE_EVENT',
      payload: item,
    });
    navigation.navigate('HomeRoute', {
      screen: 'AlbumList',
    });
  };

  return (
    <View style={styles.fullimg}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.mainImage}
        onPress={handleEventPress}>
        {/* Cover Image */}
        <Image
          source={{ uri: item.event.coverImages[0] }}
          style={styles.mainimgbg}
          resizeMode="cover"
        />

        {/* Leader Images */}
        <View style={{ position: 'absolute', flexDirection: 'row', left: '20%' }}>
          {user.data.leader_images.map((e, i) => (
            <Image
              source={{ uri: e }}
              key={i}
              style={styles.leaderimg}
            />
          ))}
        </View>

        {/* Main Leader Image */}
        {user.data.user_type == 'USER' && (
          <Image
            source={{ uri: user.data.leader.profile_photo_url }}
            style={styles.mainleaderimg}
          />
        )}

        {/* User Image */}
        <Image
          source={{ uri: user.data.profile_photo_url }}
          style={styles.userimg}
        />

        {/* Event Title */}
        <View style={styles.imgtitle}>
          <Text>{item.event.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default EventCard;