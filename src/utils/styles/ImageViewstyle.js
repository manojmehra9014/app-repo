import { StyleSheet, Dimensions } from 'react-native';

const { width ,height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
    card: {
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
        marginTop: 20,
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