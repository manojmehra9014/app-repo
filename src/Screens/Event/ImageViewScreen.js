import React, { useEffect } from 'react';
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
} from 'react-native';
import styles from '../../utils/styles/ImageViewstyle';
import { useNavigation } from '@react-navigation/native';

import { Icon } from 'react-native-elements';
const { width, height } = Dimensions.get('screen');
function ImageViewScreen({ route }) {
    const { data } = route.params;
    console.log(data);
    const navigation = useNavigation();

    const handleCopyText = async (text) => {
        try {
            await Clipboard.setString(text);
            console.log('Text copied to clipboard:', text);
        } catch (error) {
            console.error('Error copying text:', error);
        }
    };
    return (
        <>
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
                <View style={styles.card}>
                    <Image
                        style={styles.cardimg}
                        source={{ uri: data[0].uri }}
                    />
                    <Text style={styles.cardText}>{data[1]}</Text>
                    <View style={styles.btnview}>
                        <TouchableOpacity style={styles.downloadbtn} onPress={() => handleCopyText(data[1])}>
                            <Icon style={styles.btnicon} color='white' size={20} name="copy" type="font-awesome" />
                            <Text style={styles.downloadbtntext}>Copy Text</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sharebtn} onPress={async () => await onShare()}>
                            <Icon style={styles.shareicon} color="black" name="share" size={20} type="font-awesome" />
                            <Text style={styles.downloadbtntextshare}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}

export default ImageViewScreen;

