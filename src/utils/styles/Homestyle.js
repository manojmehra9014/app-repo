import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    marginTop: 40,
    width: '100%',
    height: height,
  },
  appname: {
    color: "white",
    fontSize: 24,
    marginLeft: 10,
    alignSelf: "center",
  },
  header: {
    marginTop: 15,
    color: "white",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",

  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  logoutbtn: {
    width: 60,
    height: 35,
    marginRight: 10,
    borderRadius: 50,
    paddingHorizontal: 4,
    paddingVertical: 5,
    backgroundColor: "blue",
    color: "white",
  },
  logosection: {
    flexDirection: "row",
  },
  logouttext: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
  },


})