import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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
import Toast from 'react-native-simple-toast';
import VisibleLoader from '../../../components/Loader/VisibleLoader';

const { width } = Dimensions.get('window');

const SignUpScreen: React.FC<UserNavigationRootProps<"SignUp">> = (props) => {
    const { navigation } = props;
    const screenOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(2)).current;
    const logoPositionY = useRef(new Animated.Value(0)).current;
    const contentAnim = useRef(new Animated.Value(width)).current;
    const [isLoading, setIsLoading] = useState(false)

    const handleScreen = () => {
        navigation.navigate('SignIn')
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
        console.log("valuesssssssss", value, value?.emailOrPhone?.includes('@'));
        if (!value?.emailOrPhone?.includes('@')) {
            try {
                const phoneNo = `+92${value.emailOrPhone}`
                const confirmation = await auth().signInWithPhoneNumber(phoneNo);
                console.log(confirmation)
                // setVerificationId(confirmation.verificationId);
                Toast.show('otp sent your phone', Toast.SHORT);
                navigation.navigate("OtpVerfication", { verification: confirmation.verificationId, phoneOrEmail: value?.emailOrPhone })

            } catch (error) {
                console.error(error);
                Toast.show('Failed to send OTP. Please try again.', Toast.SHORT);
            }
        } else {
            try {
                const userCredential = await auth().createUserWithEmailAndPassword(value?.emailOrPhone, value.password);
                const user = userCredential.user;
                await user.sendEmailVerification();
                Alert.alert('Verification email sent! Please check your inbox.');
                auth().signOut();
                navigation.navigate('SignIn')
            } catch (error) {
                console.error(error);
            }
        };
        // navigation.navigate("OtpVerfication", { verification: value?.emailOrPhone  }) 


        console.log("valuessss", value)
        let payload = {
            email: value.emailOrPhone,
            isEmail: true,
            password: value.password

        }
    }
    const handleForgotPassword = () => {
        navigation.navigate("ForgotPassword")
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
                            password: '12345678'
                        }}
                        onSubmit={async (values: any, { resetForm }) => {
                            setIsLoading(true)
                            let res: any = await onSubmit(values)
                            setIsLoading(false)
                            if (res) {
                                resetForm({ values: "" })
                            }
                        }}
                        validationSchema={SigUpSchema}

                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
                                <AuthOverlay color={COLORS.UstaBlack} />
                                <Animated.View style={[styles.content, { transform: [{ translateX: contentAnim }] }]}>
                                    <Animated.View style={[styles.logoContainer, { transform: logoTransform }]}>
                                        <SVGIcons.MyUstaLogo />
                                    </Animated.View>
                                    <Text style={styles.title}>{"Create your account."}</Text>
                                    <CustomTextInput
                                        placeholder={"Email or phone number"}
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
                                    <CustomButton
                                        title={"Create Account"}
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
                                        <Text style={styles.signUpText}>{"Already have an account?"}</Text>
                                        <Text
                                            style={styles.signUpLink}
                                        >
                                            {"Sign In"}
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

export default SignUpScreen