import React, { useEffect } from 'react';
import {
    Image,
    SafeAreaView,
    Text,
    View,
    FlatList,
    ScrollView,
    Platform,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Clipboard,
} from 'react-native';

import { Icon } from 'react-native-elements';
const { width, height } = Dimensions.get('screen');
function ImageViewScreen({ route }) {
    const { data } = route.params;
    console.log(data);

    const handleCopyText = async (text) => {
        try {
            await Clipboard.setString(text);
            console.log('Text copied to clipboard:', text);
        } catch (error) {
            console.error('Error copying text:', error);
        }
    };
    return (
        <>
            <View style={{ marginTop: 50 }}>
                <View style={styles.backbar}>
                    <TouchableOpacity style={styles.backbtn} onPress={() => navigation.navigate('HomeScreen')}>
                        <Icon
                            name="arrow-left"
                            type="font-awesome"
                            color="blue"
                            size={20}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <Image
                        style={styles.cardimg}
                        source={{ uri: data[0].uri }}
                    />
                    <Text style={styles.cardText}>{data[1]}</Text>
                    <View style={styles.btnview}>
                        <TouchableOpacity style={styles.downloadbtn} onPress={() => handleCopyText(data[1])}>
                            <Icon style={styles.btnicon} color='white' size={20} name="copy" type="font-awesome" />
                            <Text style={styles.downloadbtntext}>Copy Text</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sharebtn} onPress={async () => await onShare()}>
                            <Icon style={styles.shareicon} color="black" name="share" size={20} type="font-awesome" />
                            <Text style={styles.downloadbtntextshare}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}

export default ImageViewScreen;

const styles = StyleSheet.create({
    card: {
        // justifyContent: "center",
        textAlign: "center",
        paddingHorizontal: 5,
        paddingBottom: 30,
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
        marginTop: 50,
    },
    cardimg: {
        width: width - 50,
        height: width - 50,
        alignSelf: "center",
        margin: 10,
    },
    cardText: {
        textAlign: "center",
        marginHorizontal: 15,
        marginVertical: 10,
        fontSize: 12,

    },
    downloaditemnum: {
        textAlign: "center",
    },
    header: {
        flex: 1,
        height: 50,
        margin: 5,
        width: '100%',
        flexDirection: 'row',
        borderBottomColor: "gray",
        borderBottomWidth: 1,
    },
    profileimg: {
        height: 40,
        borderRadius: 50,
        borderColor: "black",
        borderWidth: 0.5,
        backgroundColor: "white",
        width: 40,
        justifyContent: "center",
        alignSelf: "center",
    },
    username: {
        justifyContent: "center",
        alignSelf: "center",
        marginLeft: 10,
        fontSize: 16,
    },
    btnview: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
    },
    downloadbtn: {
        backgroundColor: '#279EFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 24,
        marginHorizontal: 10,
        flexDirection: "row",
    },
    downloadbtntext: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },

    downloadbtntextshare: {
        marginLeft: 5,
    },
    sharebtn: {
        backgroundColor: '#279EFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 24,
        marginHorizontal: 10,
        flexDirection: "row",
    },
    backbar: {
        width: '100%',
        flexDirection: "row",
        marginTop:20,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderBottomColor: 'blue',
        borderBottomWidth: 0.3,
        paddingBottom: 10,
      },
      btnicon: {
        marginRight: 5,
      },
      backbtn: {
        borderRadius: 40,
        borderWidth: 0.6,
        borderColor: 'blue',
        paddingHorizontal: 9,
        paddingVertical: 6,
      },
})