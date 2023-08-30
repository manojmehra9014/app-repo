import React from 'react';
import { SafeAreaView, FlatList, Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';

const AlbumList = ({ navigation }) => {

    const events = useSelector((state) => state.activeEvent);
    const dispatch = useDispatch();
    
    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();
    
    const currentActiveEvent = useSelector((state) => state.activeEvent);
    console.log(currentActiveEvent);
    const addImageToCurrentActiveEvent = (imageUrl) => {
        console.log(currentActiveEvent);
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
        </SafeAreaView>
    );
};

export default AlbumList;


const styles = StyleSheet.create({
    statusbar: {
        height: 50,
    },
    topview: {
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    toptext: {
        fontSize: 22,
    },
    image: {
        width: 150,
        height: 150,
        margin: 10,
        borderRadius: 10,
    },
    gallery: {
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    backbar: {
        width: '100%',
        color: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderBottomColor: 'white',
        borderBottomWidth: 0.3,
        paddingBottom: 10,
    },
    btnicon: {
        marginRight: 5,
    },
    date: {
        fontSize: 16,
    },
    backbtn: {
        borderRadius: 40,
        borderWidth: 0.6,
        borderColor: 'black',
        paddingHorizontal: 9,
        paddingVertical: 6,
    },
});