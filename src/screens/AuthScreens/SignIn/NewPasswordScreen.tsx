import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, Animated, Dimensions } from 'react-native';
import CustomTextInput from '../../../components/InputField/InputBox';
import CustomButton from '../../../components/Buttons/CustomButton';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import { SVGIcons } from '../../../config/constants/svg';
import AuthOverlay from '../../../components/AuthOverlay/AuthOverlay';
import { COLORS, FONTS } from '../../../config/themes/theme';
import { Formik } from 'formik';
import ErrorText from '../../../components/ErrorText';

const { width } = Dimensions.get('window');

const NewPasswordScreen: React.FC<UserNavigationRootProps<"NewPassword">> = (props) => {
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
    const onSubmit = async (value: any) => {
        console.log("valuessss", value)
        let payload = {
            email: value.email,
            isEmail: true,
            password: value.password
        }
        navigation.navigate("SuccessMessage")
    }
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values)
            }}
        // validationSchema={ }

        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
                    <AuthOverlay color={COLORS.authBgColor} />
                    <Animated.View style={[styles.content, { transform: [{ translateX: contentAnim }] }]}>
                        <Text style={styles.title}>Set Your New Password</Text>
                        <Text style={styles.subTitle}>Use at least 8 characters with letters, numbers, and symbols.</Text>
                        <CustomTextInput
                            placeholder={"Email or phone number"}
                            placeholderTextColor={COLORS.white}
                            value={values?.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur("email")}
                        />
                        {errors?.email && touched?.email &&
                            <ErrorText
                                error={errors.email}
                            />
                        }
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
                        <CustomButton
                            title={"Confirm"}
                            onPress={handleSubmit}
                            style={styles.button}
                        />
                    </Animated.View>
                </Animated.View>

            )}
        </Formik>
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

export default NewPasswordScreen;