import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

function EventScreen() {
  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <Text>Event Screen</Text>
      </View>
    </SafeAreaView>
  );
}

export default EventScreen;
