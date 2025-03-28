import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, Alert } from 'react-native';
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

const ForgotPasswordScreen: React.FC<UserNavigationRootProps<"ForgotPassword">> = (props) => {
    const { navigation } = props;
    const screenOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(1)).current;
    const logoPositionY = useRef(new Animated.Value(0)).current;
    const contentAnim = useRef(new Animated.Value(width)).current;
    const [isLoading, setIsLoading] = useState(false)
    const type = props.route.params?.type

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

    const onSubmit = async (value: any) => {
        if (!value?.emailOrPhone?.includes('@')) {

            console.log("valuessss", value)
            navigation.navigate("OtpVerfication", { type: type })
        } else {
            try {
                await auth().sendPasswordResetEmail(value.emailOrPhone);
                Toast.show('Please check your email and follow the instructions to reset your password.', Toast.SHORT);
                navigation.navigate('Home')
                return true
            } catch (error: any) {
                console.error(error);
                switch (error.code) {
                    case 'auth/invalid-email':
                        Toast.show("Please enter a valid email address.", Toast.SHORT);
                        break;
                    case 'auth/user-not-found':
                        Toast.show('No user found with this email.', Toast.SHORT);
                        break;
                    default:
                        Toast.show(error.message, Toast.SHORT);
                }
            }
        }
    }
    return (
        <>
            <Formik
                initialValues={{
                    emailOrPhone: '',
                }}
                onSubmit={async (values: any, { resetForm }) => {
                    setIsLoading(true)
                    let res = await onSubmit(values)
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
                            <Text style={styles.title}>Forgot password?</Text>
                            <Text style={styles.subTitle}>Enter your email below to receive a code to reset your password.</Text>
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
                                title={"Send Code"}
                                onPress={handleSubmit}
                                style={styles.signInButton}
                            />
                        </Animated.View>
                    </Animated.View>

                )}
            </Formik>
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
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.white,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: FONTS.interSemiBold,
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: COLORS.white,
        width: "90%",
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: FONTS.interRegular,
        fontStyle: "normal"
    },
    signInButton: {
        // backgroundColor: COLORS.primary,
        marginTop: 10
    },
});

export default ForgotPasswordScreen;