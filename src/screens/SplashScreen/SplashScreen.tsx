import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing, ImageBackground, Text, Dimensions } from 'react-native';
import CustomButton from '../../components/Buttons/CustomButton';
import { imagesPath } from '../../config/constants/imagesPath';
import splashScreenStyles from '../../styles/splashScreenStyles';
import OrDivider from '../../components/OrDivider/OrDivider';
import { SVGIcons } from '../../config/constants/svg';


const { height } = Dimensions.get('window');

const SplashToAuthScreen: React.FC = () => {
    const [showButtons, setShowButtons] = useState(false);
    const logoPosition = useRef(new Animated.Value(0)).current;
    const buttonsOpacity = useRef(new Animated.Value(0)).current;
    const backgroundPosition = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(logoPosition, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(backgroundPosition, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonsOpacity, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setShowButtons(true);
            });
        }, 1000);

        return () => clearTimeout(delayTimer);
    }, []);

    const translateY = logoPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -300],
    });

    const backgroundTranslateY = backgroundPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -height * 0.25],
    });

    return (
        <View style={splashScreenStyles.container}>
            <Animated.View
                style={{
                    transform: [{ translateY: backgroundTranslateY }],
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ImageBackground
                    source={imagesPath.splash_bg_image}
                    style={splashScreenStyles.backgroundImage}
                    resizeMode="cover"
                />
            </Animated.View>
            <View style={splashScreenStyles.overlay} />
            <Animated.View style={{ transform: [{ translateY }] }}>
                <SVGIcons.MyUstaLogo />
            </Animated.View>

            <Animated.View style={[splashScreenStyles.bottomContainer, { opacity: buttonsOpacity }]}>
                <CustomButton
                    title="Post a Job Now"
                    onPress={() => console.log('Post a Job Now')}
                />
                <OrDivider />
                <CustomButton
                    title="Sign-In"
                    onPress={() => console.log('Sign-In')}
                    style={splashScreenStyles.secondaryButton}
                />
                <CustomButton
                    title="Sign-Up"
                    onPress={() => console.log('Sign-Up')}
                    style={splashScreenStyles.secondaryButton}
                />
            </Animated.View>
        </View>
    );
};

export default SplashToAuthScreen;