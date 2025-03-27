import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
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

const { width } = Dimensions.get('window');

const SignInScreen: React.FC<UserNavigationRootProps<"SignIn">> = (props) => {
    const { navigation } = props;
    const isSignIn = props.route.params?.isLogin
    const screenOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(1)).current;
    const logoPositionY = useRef(new Animated.Value(0)).current;
    const contentAnim = useRef(new Animated.Value(width)).current;
    const [isLogin, setIsLogin] = useState(isSignIn)

    const handleScreen = () => {
<<<<<<< HEAD
        console.log("isLogin", isLogin)
=======
>>>>>>> b965f97f5b292d5a15d63222f22fe369ffb4310d
        setIsLogin(!isLogin)
    }
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
    const onSubmit = async (value: any) => {
        console.log("valuessss", value)
        let payload = {
            emailOrPhone: value.emailOrPhone,
            isEmail: true,
            password: value.password

        }
    }
    const handleForgotPassword = () => {
        navigation.navigate("ForgotPassword")
    }
    return (
        <Formik
            initialValues={{
                emailOrPhone: '',
                password: ''
            }}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values)
            }}
            validationSchema={isLogin ? logInSchema : SigUpSchema}

        >
<<<<<<< HEAD
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
                    <AuthOverlay color={COLORS.authBgColor} />
                    <Animated.View style={[styles.logoContainer, { transform: logoTransform }]}>
                        <SVGIcons.MyUstaLogo />
                    </Animated.View>
                    <Animated.View style={[styles.content, { transform: [{ translateX: contentAnim }] }]}>
                        <Text style={styles.title}>{isLogin ? "Sign in to your account." : "Create your account."}</Text>
                        <CustomTextInput
                            placeholder={isLogin ? "Email" : "Email or phone number"}
                            placeholderTextColor={COLORS.white}
                            value={values?.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur("email")}
                        />
                        {errors?.email && touched?.email &&
                            <ErrorText
                                error={errors.email}
=======
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched , resetForm}) => {
                 useEffect(() => {
                    resetForm();
                }, [isLogin]);
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
                                value={values?.emailOrPhone}
                                onChangeText={handleChange('emailOrPhone')}
                                onBlur={handleBlur("emailOrPhone")}
>>>>>>> b965f97f5b292d5a15d63222f22fe369ffb4310d
                            />
                            {errors?.emailOrPhone && touched?.emailOrPhone &&
                                <ErrorText
                                    error={errors.emailOrPhone}
                                />
                            }
                            {isLogin &&
                                <>
                                    <CustomTextInput
                                        placeholder="Enter password"
                                        placeholderTextColor={COLORS.white}
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur("password")}
                                        value={values?.password}
                                    />
<<<<<<< HEAD
                                }
                                <Text
                                    onPress={handleForgotPassword}
                                    style={styles.forgotPassword}>Forgot Password?</Text>
                            </>
                        }
                        <CustomButton
                            title={isLogin ? "Sign In" : "Create Account"}
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
                            title="Sign in with Apple"
                            style={styles.socialButton}
                            textStyle={styles.socialButtonText}
                        />

                        <TouchableOpacity
                            onPress={handleScreen}
                            style={styles.signUpContainer}>
                            <Text style={styles.signUpText}>{isLogin ? "No account?" : "Already have an account?"}</Text>
                            <Text
                                style={styles.signUpLink}
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </Text>
                        </TouchableOpacity>
=======
                                    {errors?.password && touched?.password &&
                                        <ErrorText
                                            error={errors.password}
                                        />
                                    }
                                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                                </>
                            }
                            <CustomButton
                                title={isLogin ? "Sign In" : "Sign Up"}
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
                                title="Sign in with Apple"
                                style={styles.socialButton}
                                textStyle={styles.socialButtonText}
                            />

                            <TouchableOpacity style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>{isLogin ? 'No account?' : 'Already have an account?'}</Text>
                                <Text
                                    style={styles.signUpLink}
                                    onPress={handleScreen}
                                >
                                   {isLogin ? "Sign Up " : 'Sign In'}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
>>>>>>> b965f97f5b292d5a15d63222f22fe369ffb4310d
                    </Animated.View>
                )
            }}
        </Formik>
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