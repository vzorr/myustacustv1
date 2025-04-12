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
import VisibleLoader from '../../../components/Loader/VisibleLoader';
import { client1 } from '../../../apiManager/Client';
import Toast from 'react-native-simple-toast';
const { width } = Dimensions.get('window');

const NewPasswordScreen: React.FC<UserNavigationRootProps<"NewPassword">> = (props) => {
    const { navigation } = props;
    const screenOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(1)).current;
    const logoPositionY = useRef(new Animated.Value(0)).current;
    const contentAnim = useRef(new Animated.Value(width)).current;
    const [isLoading, setIsLoading] = useState(false)
    const verInfo = props.route.params?.emailorPhoneNo
    const code = props.route.params?.code
    console.log("verInfo", verInfo)

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
        console.log("values", value)
        let payload = {
            email: verInfo ? verInfo : "",
            code: code,
            newPassword: value.password,
            role: 'customer'
        }

        try {
            console.log("payload", payload)
            setIsLoading(true)
            const response = await client1().post(`auth/reset-password`, payload);
            console.log("responseeeexxxxxxxxe", response?.data)
            navigation.replace("SuccessMessage", { screenType: "ResetPassword" })

            setIsLoading(false)
            return
        } catch (error: any) {
            console.log("errror", error)
            if (error.response && error.response.data && error.response.data.message) {
                Toast.show(error.response.data.message, Toast.LONG);
            } else {
                Toast.show("Failed to reset password. Please try again.", Toast.LONG);
            }
            setIsLoading(false)
        }
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
                        confirmPassword: "",
                        password: '',
                    }}
                    onSubmit={(values, { resetForm }) => {
                        onSubmit(values)
                    }}
                    validationSchema={ChangePasswordSchema}
                    enableReinitialize={true}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
                            <AuthOverlay color={COLORS.authBgColor} />
                            <Animated.View style={[styles.content, { transform: [{ translateX: contentAnim }] }]}>
                                <Text style={styles.title}>Set Your New Password</Text>
                                <Text style={styles.subTitle}>Use at least 8 characters with letters, numbers, and symbols.</Text>

                                <CustomTextInput
                                    placeholder="Enter password"
                                    placeholderTextColor={COLORS.white}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur("password")}
                                    value={values?.password}
                                    isPassword={true}
                                    containerStyle={{ marginTop: 8, marginBottom: 2 }}
                                />
                                {errors?.password && touched?.password &&
                                    <ErrorText
                                        error={errors.password}
                                    />
                                }
                                <CustomTextInput
                                    placeholder="Confirm Password"
                                    placeholderTextColor={COLORS.white}
                                    isPassword={true}
                                    value={values?.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur("confirmPassword")}
                                    containerStyle={{ marginTop: 4, marginBottom: 2 }}
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
            {isLoading &&
                <VisibleLoader />
            }
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

export default NewPasswordScreen;