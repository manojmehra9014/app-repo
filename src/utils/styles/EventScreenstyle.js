import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width - 30;
const { height } = Dimensions.get('screen');

export default styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20,
        height: height-50,
        backgroundColor: 'white',
    },
    containerview: {
        width: screenWidth,
        height: screenWidth,
        elevation: 10,
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
        paddingVertical: 9,
        paddingHorizontal: 15,
        borderRadius: 24,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    downloadbtntext: {
        color: "white",
        fontSize: 12,
        fontWeight: "600",
    },
    downloadbtnview: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor:"black",
        marginHorizontal:15,
    },
    backbar: {
        width: '100%',
        color: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderBottomColor: 'white',
        borderBottomWidth: 0.3,
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
    sharebtn: {
        paddingVertical: 7,
        marginLeft: 12,
        borderColor:"black",
        borderWidth:0.5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",

    },
    iconsharetext: {
        color: "gray",
        marginHorizontal: 4,
    },
    statusbar:{
        height:60,
        backgroundColor:"white",
    },
    layer:{
        width:'100%',
        height:60,
        flexDirection:"row",
        paddingVertical:5,
        paddingHorizontal:10,
        justifyContent:"center",
        backgroundColor:'gray'
    },
    layerchoose:{
        width:50,
        height:50,
        marginHorizontal:5,
        backgroundColor:"white",

    }

})