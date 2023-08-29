import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width - 30;

export default styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        height: '100%',
        backgroundColor: 'white',
    },
    containerview: {
        width: screenWidth,
        height: screenWidth,
        elevation: 10,
    },
    bigCircle: {
        width: Dimensions.get('window').height * 0.8,
        height: Dimensions.get('window').height * 0.5,
        backgroundColor: '#19A7CE',
        borderRadius: 1000,
        position: 'absolute',
        right: Dimensions.get('window').width * 0.25,
        top: -150,
    },
    smallCircle: {
        width: Dimensions.get('window').height * 0.4,
        height: Dimensions.get('window').height * 0.4,
        backgroundColor: '#FF6666',
        borderRadius: 1000,
        position: 'absolute',
        bottom: Dimensions.get('window').width * -0.4,
        right: Dimensions.get('window').width * -0.3,
    },
    eventheadingetxt: {
        fontSize: 25,
        fontWeight: '800',
        color: '#2D4356',
        textAlign: 'center',
    },
    eventheadingetxtview: {
        width: screenWidth,
        alignItems: 'center'
    },
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
    maindownloadimg: {
        width: screenWidth,
        height: screenWidth,
        borderRadius: 10,
    },
    downloadbtn: {
        backgroundColor: '#279EFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 24,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    downloadbtntext: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    downloadbtnview: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        paddingHorizontal: 20,
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
        borderColor: 'white',
        paddingHorizontal: 9,
        paddingVertical: 6,
    },
    sharebtn: {
        paddingVertical: 9,
        marginLeft: 12,
        paddingHorizontal: 12,
        backgroundColor: "white",
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",

    },
    iconsharetext: {
        color: "gray",
        marginHorizontal: 4,
    }

})