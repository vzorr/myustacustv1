import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, Animated, Dimensions, Alert } from 'react-native';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import AuthOverlay from '../../../components/AuthOverlay/AuthOverlay';
import { COLORS, FONTS } from '../../../config/themes/theme';
import CustomButton from '../../../components/Buttons/CustomButton';
import { SVGIcons } from '../../../config/constants/svg';
const { width } = Dimensions.get('window');
interface successProps {

}

const SuccessMessageScreen: React.FC<UserNavigationRootProps<"SuccessMessageScreen">> = (props) => {
    const { navigation, route } = props;
    const screenOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(1)).current;
    const logoPositionY = useRef(new Animated.Value(0)).current;
    const contentAnim = useRef(new Animated.Value(width)).current;
    const handleContinue = () => {
        navigation.navigate("Tabs",{screen:"Home"});
    };

    useEffect(() => {
        Animated.parallel([
            Animated.timing(screenOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            // Animated.timing(logoScale, {
            //     toValue: 0.7,
            //     duration: 1200,
            //     useNativeDriver: true,
            // }),
            // Animated.timing(logoPositionY, {
            //     toValue: -30,
            //     duration: 1200,
            //     useNativeDriver: true,
            // }),
            Animated.timing(contentAnim, {
                toValue: 0,
                duration: 1000,
                delay: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
            <AuthOverlay color={COLORS.white} />
            <Animated.View style={[styles.content, { transform: [{ translateX: contentAnim }] }]}>
                <SVGIcons.SuccessIcon />
                <Text style={styles.title}>Success!</Text>
                <Text style={styles.subTitle}>Your job details have just been posted.</Text>
                <CustomButton
                    title={"Conitnue"}
                    onPress={handleContinue}
                    style={styles.button}
                />
            </Animated.View>
        </Animated.View>
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
        color: COLORS.Navy,
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: FONTS.interSemiBold,
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: COLORS.GreyedOut,
        width: "90%",
        textAlign: 'center',
        fontFamily: FONTS.interRegular,
        fontStyle: "normal",
        marginBottom: 10
    },
    button: {
        // backgroundColor: COLORS.primary,
    },
});

export default SuccessMessageScreen;