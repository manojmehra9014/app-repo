import { StyleSheet, Dimensions } from 'react-native';
export default styles = StyleSheet.create({
    container: {
        marginTop: 20,
      },
      mainImage: {
        backgroundColor: 'skyblue',
        marginLeft: 10,
        elevation: 10,
        background: 'white',
        width: 315,
        height: 280,
        borderRadius: 14,
        shadowColor: 'rgba(0, 0, 0, 0.15)',
      },
      mainimgbg: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 14,
        overflow: 'hidden',
      },
      leaderimg: {
        width: 40,
        height: 40,
        margin: 10,
        borderRadius: 50,
      },
      mainleaderimg: {
        width: 100,
        height: 100,
        bottom: 3,
        left: 3,
        position: 'absolute',
      },
      userimg: {
        width: 100,
        height: 100,
        bottom: 3,
        right: 3,
        position: 'absolute',
      },
      imgtitle: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        alignContent: 'center',
        bottom: 0,
      },
    
      fullimg: {
        alignItems: "center",
        margin: 20,
      },

})