import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DownloadScreen() {
  const downloadedEvents = useSelector((state) => state.downloadedEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      console.log('Running in Downloads screen');
      const album = await MediaLibrary.getAlbumAsync('app');

      const assets = await MediaLibrary.getAssetsAsync({
        first: 6,
        album,
        mediaType: 'photo',
      });
      console.log(assets.endCursor);
      eventsWithText = [];
      for (let asset of assets.assets) {
        const text = await AsyncStorage.getItem(asset.filename);
        eventsWithText.push([asset, text]);
      }
      dispatch({
        type: 'SET_DOWNLOADED_EVENTS',
        payload: {
          lastFetched: {
            endCursor: assets.endCursor,
            hasNextPage: assets.hasNextPage,
          },
          eventsWithText,
        },
      });
    };

    const loadNext = async () => {
      const album = await MediaLibrary.getAlbumAsync('app');

      const assets = await MediaLibrary.getAssetsAsync({
        after: downloadedEvents.lastFetched.endCursor,
        album,
        mediaType: 'photo',
      });
      eventsWithText = [];
      for (let i = 0; i < downloadedEvents.eventsWithText.length; i++) {
        eventsWithText.push(downloadedEvents.eventsWithText[i]);
      }
      for (let asset of assets.assets) {
        const text = await AsyncStorage.getItem(asset.filename);
        eventsWithText.push([asset, text]);
      }
      console.log(eventsWithText);
      dispatch({
        type: 'SET_DOWNLOADED_EVENTS',
        payload: {
          lastFetched: {
            endCursor: assets.endCursor,
            hasNextPage: assets.hasNextPage,
          },
          eventsWithText,
        },
      });
    };
    try {
      if (!downloadedEvents) {
        loadData();
      } else {
        loadNext();
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <StatusBar translucent={false} />
      <View>
        <Text>Download Screen</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        {downloadedEvents && downloadedEvents.eventsWithText && (
          <FlatList
            style={{ marginTop: 20 }}
            data={downloadedEvents.eventsWithText}
            horizontal={false}
            // keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              console.log(item[0].uri);
              return (
                <Image
                  source={{ uri: item[0].uri }}
                  style={{ width: 200, height: 200 }}
                />
              );
            }}
          />
        )}
      </View>
    </>
  );
}

export default DownloadScreen;
