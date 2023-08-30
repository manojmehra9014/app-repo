import React from 'react';
import { SafeAreaView, FlatList, Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../utils/styles/AlbumListstyle';
const AlbumList = ({ navigation }) => {

    const events = useSelector((state) => state.activeEvent);
    const dispatch = useDispatch();
    
    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();
    
    const currentActiveEvent = useSelector((state) => state.activeEvent);
    // console.log(currentActiveEvent);
    const addImageToCurrentActiveEvent = (imageUrl) => {
        // console.log(currentActiveEvent);
        const currentCoverImages = currentActiveEvent.event.coverImages;
        const updatedCoverImages = imageUrl;
        
        dispatch({
            type: 'SET_CURRENT_ACTIVE_EVENT',
            payload: {
                ...currentActiveEvent,
                updatedCover: updatedCoverImages,
            }
        });
        navigation.navigate('HomeRoute', {
            screen: 'EventScreen',
          });
    };

    const renderImageItem = ({ item }) => (
        <TouchableOpacity onPress={() => addImageToCurrentActiveEvent(item)}>
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
    );

    return (

        <SafeAreaView>
            <ScrollView>
            <View>
                <View style={styles.statusbar}></View>
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
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
                <View style={styles.topview}>
                    <Text style={styles.toptext}>Select Your Event Image </Text>
                </View>
                <View style={styles.gallery}>
                    <FlatList
                        data={events.event.coverImages}
                        renderItem={renderImageItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                    />


                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AlbumList;