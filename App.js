import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import store from './src/store';
import { Provider } from 'react-redux';
import RootRoute from './src/routes';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <RootRoute />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
