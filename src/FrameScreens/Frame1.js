import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../utils/styles/frame1style'
const Frame1 = () => {

  const viewShotRef = useRef(null);
  const user = useSelector((state) => state.user);
  const event = useSelector((state) => state.activeEvent);
  const dispatch = useDispatch();

  return (
    <View>
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
    </View>
  );
};

export default Frame1;
