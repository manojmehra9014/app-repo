// import React from 'react';
// import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Share from 'react-native-share';
// import { captureRef } from 'react-native-view-shot';

// const ShareButton = ({ contentToShare, imageToShare, viewShotRef }) => {
//   const handleShare = async () => {
//     try {
//       let options = {
//         message: contentToShare,
//       };

//       if (imageToShare) {
//         const imageUri = await captureRef(viewShotRef, {
//           format: 'png',
//           quality: 1,
//         });

//         options = {
//           ...options,
//           title: 'Share Image',
//           url: `data:image/png;base64,${imageUri}`,
//         };
//       }

//       await Share.open(options);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <TouchableOpacity onPress={handleShare} style={styles.button}>
//       <View style={styles.buttonContent}>
//         <Icon name="share" size={20} color="white" />
//         <Text style={styles.buttonText}>Share</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#279EFF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 24,
//     marginHorizontal: 10,
//     flexDirection: 'row',
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonText: {
//     marginLeft: 5,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default ShareButton;
