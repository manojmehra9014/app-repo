import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    height: height + 200,
    top: 0,
    backgroundColor:'#CEE6F3'
  },
  loginText: {
    fontSize: 24,
    top: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontWeight:'700',
    fontSize: 18,
  },
  spinner: {
    width: 70,
    height: 70,
  },
  imageContainer: {
    alignItems: 'center',
    top: 30,
  },
  inpf: {
    flex: 1,
    paddingHorizontal: 12,
  },
  icon: {
    color: '#333',
    size: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  bgCircle1: {
    position: 'absolute',
    height: width * 2,
    width: width * 2,
    borderRadius: width,
    left: 0,
    top: 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  main: {
    padding: 30,
    height: height,
   
  },
  inputFileds: {
    top: 70,

  },

  inputView: {
    width: '100%',
    height: 44,
    top: 10,
    marginBottom: 8,
    backgroundColor: '#f1f3f6',
    borderColor: '#FFDDCC',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  regbtn: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: '90%',
    borderColor: '#11009E',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11009E',
    height: 44,
    left: 20,
    top: 100,
    bottom: 50,
    borderWidth: 1.8,
    borderRadius: 19,
    marginBottom: 75,
  },
  loginLinkText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'blue',
    marginTop: 50,
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: 'rgba(39, 40, 41,0.5)', // Semi-transparent white background
    zIndex: 1, // Place it above other content
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupbtn: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: '90%',
    borderColor: '#11009E',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    color:"#11009E",
    height: 44,
    left: 20,
    top: 45,
    bottom: 50,
    borderWidth: 1.8,
    borderRadius: 19,
    marginBottom: 75,
  },
  signupbtntext:{
    color:"#11009E",
    fontWeight:'700',
    fontSize: 18,
  }
})