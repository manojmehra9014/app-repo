import React, { useEffect, useRef } from 'react';
import {
    Image,
    SafeAreaView,
    Text,
    View,
    FlatList,
    ScrollView,
    Platform,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Clipboard,
    Animated,
} from 'react-native';
import * as Share from 'expo-sharing';
import styles from '../../utils/styles/ImageViewstyle';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { Linking } from 'react-native';
import ViewShot from 'react-native-view-shot';

const { width, height } = Dimensions.get('screen');

function ImageViewScreen({ route }) {
    const { data } = route.params;
    const navigation = useNavigation();
    const viewShotRef = useRef(null);


    const handleCopyText = async (text) => {
        try {
            await Clipboard.setString(text);
            console.log('Text copied to clipboard:', text);
        } catch (error) {
            console.error('Error copying text:', error);
        }
    };
    const colorAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(colorAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: false,
                }),
                Animated.timing(colorAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [colorAnim]);

    const backgroundColor = colorAnim.interpolate({
        inputRange: [0,1,2],
        outputRange: ['#FFEADD', '#CAEDFF','#FFEADD'],
    });
    const shareImage = async () => {
        try {
            const uri = await viewShotRef.current.capture();
            console.log(uri);
            if (await Share.isAvailableAsync()) {
                await Share.shareAsync(uri, {
                    mimeType: 'image/jpeg',
                    dialogTitle: 'Share this image',
                    UTI: 'image/jpeg',
                });

            } else {
                alert('Sharing is not available on this platform');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <ScrollView>


                <View style={{ marginTop: 50 }}>
                    <View style={styles.backbar}>
                        <TouchableOpacity style={styles.backbtn} onPress={() => { navigation.navigate('HomeScreen') }}>
                            <Icon
                                name="arrow-left"
                                type="font-awesome"
                                color="blue"
                                size={20}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card} >
                        <ViewShot
                            ref={viewShotRef}
                            options={{ format: 'png', quality: 1, height: 1000, width: 1000, }}>
                            <Image
                                style={styles.cardimg}
                                source={{ uri: data[0].uri }}
                            />
                        </ViewShot>
                        <View style={styles.textview}>
                            <Animated.View style={{ ...styles.textbox, backgroundColor }}>
                                <Text style={styles.cardText}>{data[1]}</Text>
                            </Animated.View>
                        </View>
                        <View style={styles.btnview}>
                            <TouchableOpacity style={styles.downloadbtn} onPress={() => handleCopyText(data[1])}>
                                <Icon style={styles.btnicon} color='white' size={20} name="copy" type="font-awesome" />
                                <Text style={styles.downloadbtntext}>Copy Text</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.sharebtn} onPress={() => shareImage()} >
                                <Icon style={styles.shareicon} color="white" name="share" size={17} type="font-awesome" />
                                <Text style={styles.downloadbtntextshare}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default ImageViewScreen;

