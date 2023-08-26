import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Text, View, FlatList, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../utils/styles/Alleventstyle';
import EventCard from '../../component/EventCard'
function AllEventsScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const events = useSelector((state) => state.todaysEvent);
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#EDEDF1" barStyle={'dark-content'} />
      <View style={styles.container}>

        <View>
          {events && user && events.length > 0 && (
            <FlatList
              style={{ marginTop: 20 }}
              data={events}
              horizontal={false}
              renderItem={({ item }) => (
                <EventCard item={item} navigation={navigation} />
              )}
            />
          )}

        </View>
      </View>
    </SafeAreaView>
  );
}
export default AllEventsScreen;