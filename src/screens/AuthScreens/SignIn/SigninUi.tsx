import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import CustomTextInput from '../../../components/InputField/InputBox';
import CustomButton from '../../../components/Buttons/CustomButton';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import { SVGIcons } from '../../../config/constants/svg';
import AuthOverlay from '../../../components/AuthOverlay/AuthOverlay';
import { COLORS, FONTS } from '../../../config/themes/theme';
import OrDivider from '../../../components/OrDivider/OrDivider';
import SocialLogin from '../../../components/SocialLogin/SocialLogin';
import { Formik } from 'formik';
import { logInSchema, SigUpSchema } from '../../../config/constants/errorMessage';
import ErrorText from '../../../components/ErrorText';
import auth from '@react-native-firebase/auth';
import { setUserInfo } from '../../../stores/reducer/userInfoReducer';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import VisibleLoader from '../../../components/Loader/VisibleLoader';

const { width } = Dimensions.get('window');

const SignInScreen: React.FC<UserNavigationRootProps<"SignIn">> = (props) => {
    const { navigation } = props;
    const screenOpacity = useRef(new Animated.Value(0)).current;
    const [isLoading, setIsLoading] = useState(false)
    const logoScale = useRef(new Animated.Value(2)).current;
    const logoPositionY = useRef(new Animated.Value(0)).current;
    const contentAnim = useRef(new Animated.Value(width)).current;
    const dispatch = useDispatch()

    const handleScreen = () => {
        navigation.navigate('SignUp')
    }
    useEffect(() => {
        Animated.parallel([
            Animated.timing(screenOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(logoScale, {
                toValue: 0.6,
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
    const onSubmit = async (value: any) => {
        if (!value?.emailOrPhone?.includes('@')) {
            try {
                const phoneNo = `+92${value.emailOrPhone}`
                const confirmation = await auth().signInWithPhoneNumber(phoneNo);
                Toast.show('OTP Sent, Check your phone for the verification code.', Toast.SHORT);
                navigation.navigate("OtpVerfication", { otpConfirmation: confirmation, type: "logIn" })
            } catch (error) {
                console.error('Error sending OTP:', error);
                Alert.alert('Error', 'Failed to send OTP. Please try again.');
            }
        } else {
            try {
                const response: any = await auth().signInWithEmailAndPassword(value.emailOrPhone, value.password);
                if (response?.user) {
                    const userInfo = response?.user?._user
                    const storedata: any = {
                        email: userInfo?.email,
                        userId: userInfo?.uid,
                        isLogin: true
                    }
                    dispatch(setUserInfo(storedata));
                }
                navigation.replace("Home")
                Toast.show('login successfully', Toast.SHORT);
                return true
            } catch (error) {
                Toast.show("User not found", Toast.SHORT);
                return false
            }
        }

    }
    const handleForgotPassword = () => {
        navigation.navigate("ForgotPassword", { type: 'forgetPassword' })
    }
    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Formik
                        initialValues={{
                            emailOrPhone: '',
                            password: ''
                        }}
                        onSubmit={async (values: any, { resetForm }) => {
                            setIsLoading(true)
                            let res = await onSubmit(values)
                            setIsLoading(false)
                            if (res) {
                                resetForm({ values: "" })
                            }
                        }}
                        validationSchema={logInSchema}

                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
                                <AuthOverlay color={COLORS.authBgColor} />
                                <Animated.View style={[styles.content, { transform: [{ translateX: contentAnim }] }]}>
                                    <Animated.View style={[styles.logoContainer, { transform: logoTransform }]}>
                                        <SVGIcons.MyUstaLogo />
                                    </Animated.View>
                                    <Text style={styles.title}>{"Sign in to your account."}</Text>
                                    <CustomTextInput
                                        placeholder={"Email"}
                                        placeholderTextColor={COLORS.white}
                                        value={values?.emailOrPhone}
                                        onChangeText={handleChange('emailOrPhone')}
                                        onBlur={handleBlur("emailOrPhone")}
                                    />
                                    {errors?.emailOrPhone && touched?.emailOrPhone &&
                                        <ErrorText
                                            error={errors.emailOrPhone}
                                        />
                                    }
                                    <CustomTextInput
                                        placeholder="Enter password"
                                        placeholderTextColor={COLORS.white}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur("password")}
                                        value={values?.password}
                                        isPassword={true}
                                    />
                                    {errors?.password && touched?.password &&
                                        <ErrorText
                                            error={errors.password}
                                        />
                                    }
                                    <Text
                                        onPress={handleForgotPassword}
                                        style={styles.forgotPassword}>Forgot Password?</Text>

                                    <CustomButton
                                        title={"Sign In"}
                                        onPress={handleSubmit}
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
                                        title="Sign in with Facebook"
                                        style={styles.socialButton}
                                        textStyle={styles.socialButtonText}
                                    />

                                    <TouchableOpacity
                                        onPress={handleScreen}
                                        style={styles.signUpContainer}>
                                        <Text style={styles.signUpText}>{"No account?"}</Text>
                                        <Text
                                            style={styles.signUpLink}
                                        >
                                            {"Sign Up"}
                                        </Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </Animated.View>

                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
            {isLoading &&
                <VisibleLoader />
            }
        </>
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
        marginStart: 5
    },
});

export default SignInScreen;