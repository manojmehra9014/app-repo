import React from 'react';
import { SafeAreaView, FlatList, Image, Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const AlbumList = () => {

    const events = useSelector((state) => state.activeEvent);
    const dispatch = useDispatch();

    // console.log(events.event.coverImages);

    const renderImageItem = ({ item }) => (
        <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
    );

    return (
        <SafeAreaView>
            <View>
                <View style={styles.statusbar}></View>
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
        height: 40,
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
    gallery:{
        marginTop:15,
        justifyContent:"center",
        alignItems:"center",
    },
    
});