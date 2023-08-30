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
  regbtn:{
    marginTop:100,
    backgroundColor:"blue",
    padding:10,
    justifyContent:"center",
    borderRadius:29,
    alignItems:"center",

  },
  loginBtnText:{
    textAlign:"center",
    fontWeight:"600",
    color:"white",
    fontSize:16,
  },
  signupbtn:{
    backgroundColor:"white",
    padding:10,
    justifyContent:"center",
    borderRadius:29,
    alignItems:"center",
  },
  signupbtntext:{
    textAlign:"center",
    fontWeight:"600",
    color:"blue",
    fontSize:16,
  }


})