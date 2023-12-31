import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    height: height,
    backgroundColor: '#e3e1e1',
  },
  appname: {
    color: 'black',
    fontSize: 24,
    marginLeft: 10,
    alignSelf: 'center',
  },
  header: {
    marginTop: 1,
    color: 'white',
    flexDirection: 'row',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'white',
    borderBottomWidth: 1,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  logoutbtn: {
    width: 60,
    height: 35,
    borderRadius: 50,
    position: 'absolute',
    right: 50,
    top: 15,
    paddingHorizontal: 4,
    paddingVertical: 5,
    backgroundColor: 'blue',
    color: 'white',
  },
  icon: {
    marginHorizontal: 5,
    padding: 3,
  },
  logosection: {
    flexDirection: 'row',
  },
  logouttext: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  downloadtext: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  eventposter: {
    backgroundColor: 'yellow',
    marginLeft: 10,
    elevation: 10,
    background: 'white',
    width: 315,
    height: 280,
    borderRadius: 14,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
  },
  eventposterimg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 14,
    overflow: 'hidden',
  },
  leaderimageview: {
    position: 'absolute',
    flexDirection: 'row',
    left: '30%',
  },
  leadertopimg: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 50,
  },
  leaderimgtopview: {
    width: 100,
    height: 100,
    bottom: 3,
    left: 3,
    position: 'absolute',
  },
  userimgtopview: {
    width: 100,
    height: 100,
    bottom: 3,
    right: 3,
    position: 'absolute',
  },
  eventtitleview: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignContent: 'center',
    bottom: 0,
  },
  downloadtextview: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadedimageview: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadedimg: {
    height: 120,
    width: 120,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: 'blue',
    fontWeight: '600',
    marginBottom: 10,
  },
  cursor: {
    fontSize: 18,
    marginBottom: 10,
    opacity: 0.6,
    position: 'absolute',
    right: -5,
  },
  animation: {
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
  },
  textanimation: {},
});
