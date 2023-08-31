import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        height: height + 400,
        top: 0,
    },
    spinner: {
        width: 70,
        height: 70,
    },
    regbtntext: {
        color: '#fff',
        fontSize: 18,
    },
    phone_check: {
        flex: 1,
        paddingHorizontal: 12,
    },
    icon: {
        color: '#333',
        size: 20,
    },
    signupheading: {
        fontSize: 24,
        top: 10,
        fontWeight: 900,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        top: 10,
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
    main: {
        flex: 1,
        padding: 30,
    },
    inputFileds: {
        top: 40,
    },
    inputView: {
        width: '100%',
        height: 44,
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
    inputViewPicker: {
        width: '100%',
        height: 30,
    },
    selectButton: {
        paddingHorizontal: 5,
        paddingVertical: 8,
        fontSize: 18,
        width: '100%',
        borderColor: '#FF8989',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFECEC',
        height: 40,
        borderWidth: 1.8,
        borderRadius: 19,
        marginBottom: 15,
    },
    regbtn: {
        paddingHorizontal: 4,
        paddingVertical: 8,
        width: '50%',
        borderColor: '#30A2FF',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#30A2FF',
        height: 44,
        alignSelf: 'center',
        top: 20,
        borderWidth: 1.8,
        borderRadius: 19,
        marginBottom: 15,
    },
    loginLinkText: {
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
        color: 'blue',
        textDecorationLine: 'underline',
    },
    validationText: {
        color: 'red',
    },
    firstscr: {
        top: height / 2 - 200,
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
    imageprev: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(145, 200, 228,0.7)',
        zIndex: 1000,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    closeButton: {
        marginTop: 10,
        padding: 8,
        borderRadius: 5,
        width: 90,
        textAlign: 'center',
        backgroundColor: '#6528F7',
    },
    closeButtonText: {
        color: 'white',
        padding: 3,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    imageprevprofile: {
        position: 'relative', // Make the container relative for positioning
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 200,
        height: 200,
        borderRadius: 19,

        bottom: 2,
        alignSelf: 'center',
        zIndex: 1000,
    },
    imageprofile: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    closeButtonprofile: {
        position: 'absolute',
        top: 1,
        right: 1,
        paddingVertical: 0,
        paddingHorizontal: 11,
        borderRadius: 50,
        backgroundColor: '#071952',
    },
    closeButtonTextprofile: {
        color: 'white',
        fontSize: 34,
        fontWeight: 'bold',
    }, suggestionList: {
        maxHeight: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginTop: 5,
        backgroundColor: 'white', // Customize background color
    },
    suggestionItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',

    },
    suggestionText: {
        fontSize: 16,
        color: 'black', // Customize text color
    },
})