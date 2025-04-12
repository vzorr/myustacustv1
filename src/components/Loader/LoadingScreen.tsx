import { StyleSheet, View, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import AuthOverlay from '../AuthOverlay/AuthOverlay';
import { COLORS } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';

const LoadingScreen = () => {
    // Create animated value for scaling
    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Create pulse animation
        Animated.loop(
            Animated.sequence([
                // Scale up
                Animated.timing(scaleValue, {
                    toValue: 1.3, // Scale to 130% of original size
                    duration: 800,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                // Scale back down
                Animated.timing(scaleValue, {
                    toValue: 1, // Return to original size
                    duration: 800,
                    easing: Easing.linear,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <AuthOverlay color={COLORS.authBgColor} />
            <Animated.View style={{
                transform: [{ scale: scaleValue }]
            }}>
                <SVGIcons.MyUstaLogo />
            </Animated.View>
        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});