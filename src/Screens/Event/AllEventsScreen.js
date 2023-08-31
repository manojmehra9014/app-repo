import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../utils/styles/Alleventstyle';
import EventCard from '../../component/EventCard';
function AllEventsScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const events = useSelector((state) => state.todaysEvent);
  return (
    <>
      <StatusBar backgroundColor="#EDEDF1" barStyle={'dark-content'} />
      <View style={styles.container}>
        <View>
          {events && user && events.length > 0 && (
            <FlatList
              data={events}
              horizontal={false}
              renderItem={({ item }) => (
                <EventCard item={item} navigation={navigation} />
              )}
            />
          )}
        </View>
      </View>
    </>
  );
}
export default AllEventsScreen;
