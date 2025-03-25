import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import CustomTextInput from '../../../components/InputField/InputBox';
import CustomButton from '../../../components/Buttons/CustomButton';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import { SVGIcons } from '../../../config/constants/svg';
import AuthOverlay from '../../../components/AuthOverlay/AuthOverlay';
import { COLORS, FONTS } from '../../../config/themes/theme';
import OrDivider from '../../../components/OrDivider/OrDivider';
import SocialLogin from '../../../components/SocialLogin/SocialLogin';

const { width } = Dimensions.get('window');

const SignInScreen: React.FC<UserNavigationRootProps<"SignIn">> = (props) => {
    const { navigation } = props;
    const screenOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(1)).current;
    const logoPositionY = useRef(new Animated.Value(0)).current;
    const contentAnim = useRef(new Animated.Value(width)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(screenOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(logoScale, {
                toValue: 0.7,
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.timing(logoPositionY, {
                toValue: -30,
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.timing(contentAnim, {
                toValue: 0,
                duration: 1000,
                delay: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const logoTransform = [
        { scale: logoScale },
        { translateY: logoPositionY }
    ];

    return (
        <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
            <AuthOverlay color={COLORS.authBgColor} />
            <Animated.View style={[styles.logoContainer, { transform: logoTransform }]}>
                <SVGIcons.MyUstaLogo />
            </Animated.View>
            <Animated.View style={[styles.content, { transform: [{ translateX: contentAnim }] }]}>
                <Text style={styles.title}>Sign in to your account</Text>
                <CustomTextInput
                    placeholder="Email"
                    placeholderTextColor={COLORS.white}
                />
                <CustomTextInput
                    placeholder="Enter password"
                    placeholderTextColor={COLORS.white}
                    secureTextEntry
                />
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                <CustomButton
                    title="Sign In"
                    onPress={() => { }}
                    style={styles.signInButton}
                />
                <OrDivider />
                <SocialLogin
                    title="Sign in with Google"
                    style={styles.socialButton}
                    textStyle={styles.socialButtonText}
                    loginType='google'
                />
                <SocialLogin
                    title="Sign in with Apple"
                    style={styles.socialButton}
                    textStyle={styles.socialButtonText}
                />

                <TouchableOpacity style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>No account? </Text>
                    <Text
                        style={styles.signUpLink}
                    // onPress={() => navigation.navigate('SignUp')}
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 20,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.white,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: FONTS.interSemiBold,
    },
    forgotPassword: {
        fontSize: 12,
        fontFamily: FONTS.interRegular,
        color: COLORS.white,
        textAlign: 'center',
        fontWeight: '400',
        textDecorationLine: 'underline',
        textDecorationColor: COLORS.white,
        marginVertical: 10,
    },
    signInButton: {
        // backgroundColor: COLORS.primary,
    },
    socialButton: {
        backgroundColor: '#fff',
        // padding: 15,
        // borderRadius: 8,
        // marginBottom: 15,
    },
    socialButtonText: {
        color: '#000',
        fontFamily: 'Inter',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUpText: {
        fontSize: 12,
        fontFamily: FONTS.interRegular,
        color: COLORS.white,
        fontWeight: '400',
    },
    signUpLink: {
        fontSize: 12,
        fontFamily: FONTS.interRegular,
        color: COLORS.Yellow,
        fontWeight: '400',
        textDecorationLine: 'underline',
        textDecorationColor: COLORS.Yellow,
    },
});

export default SignInScreen;