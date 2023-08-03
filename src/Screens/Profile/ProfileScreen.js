import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <Text>Profile Screen</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreateEventScreen');
        }}>
        <Text>Create Event</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SettingScreen');
        }}>
        <Text>Setting Screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ProfileScreen;
