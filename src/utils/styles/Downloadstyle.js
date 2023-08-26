import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export default styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: "white",
      },
      mainImage: {
        backgroundColor: 'skyblue',
        elevation: 10,
        background: 'white',
        width: width - 70,
        height: width - 70,
        borderRadius: 9,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
      },
      mainimgbg: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 9,
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
        fontSize: 16,
        color: "#0C356A",
        margin: 10,
      },
    
      fullimg: {
        alignItems: "center",
        margin: 20,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
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
      eventtext: {
        textAlign: "center",
        fontSize: 14,
        color: "#4D3C77",
        margin: 5,
      },
      backbar: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 0.3,
        paddingBottom: 10,
        marginTop: 25,
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
        borderColor: 'blue',
        paddingHorizontal: 9,
        paddingVertical: 6,
      },
      btnview: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        margin:20,
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
      }
})