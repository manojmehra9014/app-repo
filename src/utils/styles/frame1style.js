import { StyleSheet, Dimensions } from 'react-native';

const { screenWidth, height } = Dimensions.get('screen');

export default styles = StyleSheet.create({
    userimage: {
        width: screenWidth / 3,
        height: screenWidth / 3,
        zIndex: 0,
    },
    username: {
        fontSize: screenWidth / 23,
        fontWeight: 700
    },
    userprofileinfo: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventtextcontainer: {
        backgroundColor: '#DCD6F7',
        width: '95%',
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 9,

    },
    eventtext: {
        textAlign: "center",
        fontSize: 13,
        fontStyle: "italic",
    },
    imagecomponent: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 1,
        width: '100%',
    },
    imagecomponent2: {
        position: 'absolute',
        flexDirection: 'row',
        gap: 3,
        padding: 10,
    },
    aboveleaderimg: {
        width: screenWidth / 10,
        height: screenWidth / 10,
        zIndex: 10,
        borderRadius: 50,
    },
})