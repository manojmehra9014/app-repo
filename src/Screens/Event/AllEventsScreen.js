import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

function AllEventsScreen() {
  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <Text>All Events Screen</Text>
      </View>
    </SafeAreaView>
  );
}

export default AllEventsScreen;
