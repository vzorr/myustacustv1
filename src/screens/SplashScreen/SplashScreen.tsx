import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import CustomButton from '../../components/Buttons/CustomButton';
import { imagesPath } from '../../config/constants/imagesPath';
import splashScreenStyles from '../../styles/splashScreenStyles';
import OrDivider from '../../components/OrDivider/OrDivider';
import { SVGIcons } from '../../config/constants/svg';
import { UserNavigationRootProps } from '../../types/stacksParams';

const { height } = Dimensions.get('window');

const SplashScreen: React.FC<UserNavigationRootProps<"Splash">> = (props) => {
    const { navigation } = props;
    const [showButtons, setShowButtons] = useState(false);
    const logoPosition = useRef(new Animated.Value(0)).current;
    const buttonsOpacity = useRef(new Animated.Value(0)).current;
    const backgroundHeight = useRef(new Animated.Value(height * 1.1)).current;

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(logoPosition, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(backgroundHeight, {
                    toValue: height,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: false,
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

    const handleSignIn = () => {
        navigation.navigate('SignIn', { isLogin: true });
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp', { isLogin: false });
    };
    const handlePostJob = () => {
        navigation.navigate('Tabs', {
            screen: 'PostJobScreen',
          });
    };

    return (
        <View style={[splashScreenStyles.container, { overflow: 'hidden' }]}>
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: backgroundHeight,
                    justifyContent: 'flex-end',
                }}
            >
                <ImageBackground
                    source={imagesPath.customer_splash_bg_image}
                    style={[splashScreenStyles.backgroundImage, { height: '100%' }]}
                    resizeMode="cover"
                />
            </Animated.View>

            <View style={splashScreenStyles.overlay} />

            <Animated.View style={{ transform: [{ translateY }] }}>
                <SVGIcons.MyUstaLogo width={160} height={54} />
            </Animated.View>

            <Animated.View style={[splashScreenStyles.bottomContainer, { opacity: buttonsOpacity }]}>
                <CustomButton
                    title="Post a Job Now"
                    onPress={handlePostJob}
                />
                <OrDivider />
                <CustomButton
                    title="Sign-In"
                    onPress={handleSignIn}
                    style={splashScreenStyles.secondaryButton}
                />
                <CustomButton
                    title="Sign-Up"
                    onPress={handleSignUp}
                    style={splashScreenStyles.secondaryButton}
                />
            </Animated.View>
        </View>
    );
};

export default SplashScreen;