import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, Animated, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import CustomTextInput from '../../../components/InputField/InputBox';
import CustomButton from '../../../components/Buttons/CustomButton';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import { SVGIcons } from '../../../config/constants/svg';
import AuthOverlay from '../../../components/AuthOverlay/AuthOverlay';
import { COLORS, FONTS } from '../../../config/themes/theme';
import { Formik } from 'formik';
import ErrorText from '../../../components/ErrorText';
import { ChangePasswordSchema, logInSchema } from '../../../config/constants/errorMessage';

const { width } = Dimensions.get('window');

const ChangePasswordScreen: React.FC<UserNavigationRootProps<"ChangePassword">> = (props) => {
    const { navigation } = props;
    const screenOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(1)).current;
    const logoPositionY = useRef(new Animated.Value(0)).current;
    const contentAnim = useRef(new Animated.Value(width)).current;
    const verInfo = props.route.params?.emailorPhoneNo


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
        let payload = {
            email: value.password,
            isEmail: true,
            password: value.confirmPassword
        }
        navigation.navigate("SuccessMessage")
    }
    return (
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
                        password: "",
                        confirmPassword: '',
                    }}
                    onSubmit={(values, { resetForm }) => {
                        onSubmit(values)
                    }}
                    validationSchema={ChangePasswordSchema}
                //    enableReinitialize={true}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
                            <AuthOverlay color={COLORS.authBgColor} />
                            <Animated.View style={[styles.content, { transform: [{ translateX: contentAnim }] }]}>
                                <Text style={styles.title}>Reset your Password</Text>
                                <Text style={styles.subTitle}>Use at least 8 characters with letters, numbers, and symbols.</Text>
                                <CustomTextInput
                                    placeholder="Enter password"
                                    placeholderTextColor={COLORS.white}
                                    secureTextEntry
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur("password")}
                                    value={values?.password}
                                />
                                {errors?.password && touched?.password &&
                                    <ErrorText
                                        error={errors.password}
                                    />
                                }
                                <CustomTextInput
                                    placeholder="Enter Confirm Password"
                                    placeholderTextColor={COLORS.white}
                                    secureTextEntry
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur("confirmPassword")}
                                    value={values?.confirmPassword}
                                />
                                {errors?.confirmPassword && touched?.confirmPassword &&
                                    <ErrorText
                                        error={errors.confirmPassword}
                                    />
                                }
                                <CustomButton
                                    title={"Confirm"}
                                    onPress={handleSubmit}
                                    style={styles.button}
                                />
                            </Animated.View>
                        </Animated.View>

                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        padding: 20,
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
        textAlign: 'center',
        fontFamily: FONTS.interRegular,
        fontStyle: "normal"
    },
    button: {
        // backgroundColor: COLORS.primary,
    },
});

export default ChangePasswordScreen;