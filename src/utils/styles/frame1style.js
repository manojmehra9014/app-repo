import { StyleSheet, Dimensions } from 'react-native';
const { screenWidth, height } = Dimensions.get('screen');
export default fstyles = StyleSheet.create({
    htext:{
        fontSize:20,
        color:'black',
    },
    
    frame1userimage: {
        width: screenWidth / 3,
        height: screenWidth / 3,
        zIndex: 0,
    },
    frame1username: {
        fontSize: screenWidth / 23,
        fontWeight: 700,
    },
    frame1userprofileinfo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagecomponent: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 1,
        width: '100%',
    },
    frame1leaderimage:{
        width: screenWidth / 3,
        height: screenWidth / 3,
        zIndex: 0,
    }


})