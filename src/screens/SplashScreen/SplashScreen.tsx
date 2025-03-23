import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing, ImageBackground, StyleSheet, Text, Dimensions } from 'react-native';
import CustomButton from '../../components/Buttons/CustomButton';
import { imagesPath } from '../../config/constants/imagesPath';

const { height } = Dimensions.get('window'); // Get screen height

const SplashToAuthScreen: React.FC = () => {
    const [showButtons, setShowButtons] = useState(false);
    const logoPosition = useRef(new Animated.Value(0)).current;
    const buttonsOpacity = useRef(new Animated.Value(0)).current;
    const backgroundPosition = useRef(new Animated.Value(0)).current;

    // Step 1: "My Usta" stays in the center for a short delay
    useEffect(() => {
        const delayTimer = setTimeout(() => {
            // Step 2: Animate "My Usta" to the top and adjust the background image
            Animated.parallel([
                Animated.timing(logoPosition, {
                    toValue: 1,
                    duration: 1000, // Animation duration
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(backgroundPosition, {
                    toValue: 1,
                    duration: 1000, // Animation duration
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonsOpacity, {
                    toValue: 1,
                    duration: 1000, // Fade-in duration for buttons
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Step 3: Set state to show buttons (optional, for conditional rendering)
                setShowButtons(true);
            });
        }, 1000); // Delay before animation starts (1 second)

        return () => clearTimeout(delayTimer); // Cleanup timer
    }, []);

    const translateY = logoPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -300], // Move "My Usta" to the top
    });

    const backgroundTranslateY = backgroundPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -height * 0.25], // Move background image to the center
    });

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <Animated.View
                style={{
                    transform: [{ translateY: backgroundTranslateY }],
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center', // Center vertically
                    alignItems: 'center', // Center horizontally
                }}
            >
                <ImageBackground
                    source={imagesPath.splash_bg_image}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
            </Animated.View>

            {/* Overlay covering the entire screen */}
            <View style={styles.overlay} />

            {/* "My Usta" Text */}
            <Animated.View style={{ transform: [{ translateY }] }}>
                <Text style={styles.logoText}>My Usta</Text>
            </Animated.View>

            {/* Buttons at the bottom with fade-in animation */}
            <Animated.View style={[styles.bottomContainer, { opacity: buttonsOpacity }]}>
                <CustomButton
                    title="Post a Job Now"
                    onPress={() => console.log('Post a Job Now')}
                    style={styles.primaryButton}
                />
                <CustomButton
                    title="Sign-In"
                    onPress={() => console.log('Sign-In')}
                    style={styles.secondaryButton}
                />
                <CustomButton
                    title="Sign-Up"
                    onPress={() => console.log('Sign-Up')}
                    style={styles.secondaryButton}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(35, 35, 35, 0.7)', // Semi-transparent overlay
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Adjust text color as needed
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 50, // Adjust this value to position the buttons
        width: '100%',
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    secondaryButton: {
        backgroundColor: '#6C757D',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
});

export default SplashToAuthScreen;