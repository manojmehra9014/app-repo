import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    marginTop: 30,
    width: '100%',
    height: height,
  },
  appname: {
    color: "black",
    fontSize: 24,
    marginLeft: 10,
    alignSelf: "center",
  },
  header: {
    marginTop: 20,
    color: "white",
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "white",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor:"white",
  },
  logoutbtn: {
    width: 60,
    height: 35,
    borderRadius: 50,
    position:'absolute',
    right:50,
    top:15,
    paddingHorizontal: 4,
    paddingVertical: 5,
    backgroundColor: "blue",
    color: "white",
  },
  icon:{
    marginHorizontal:5,
    padding:3,
  },
  logosection: {
    flexDirection: "row",
  },
  logouttext: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight:'600',
  },
  downloadtext: {
    color: "black",
    fontSize: 16,
  },
  h1: {
    fontSize: 28,
    fontWeight: "900",
    color: "black",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  h2: {
    fontSize: 20,
    color: "black",
    fontWeight: "700",
    marginHorizontal: 20,
    marginVertical: 5,
  }
})