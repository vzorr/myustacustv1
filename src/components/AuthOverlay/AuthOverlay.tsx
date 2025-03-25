import { StyleSheet, View } from 'react-native';
import React from 'react';

interface AuthOverlayProps {
    color?: string;
}

const AuthOverlay: React.FC<AuthOverlayProps> = ({ color }) => {
    return <View style={[styles.backgroundLayer, { backgroundColor: color }]} />;
};

export default AuthOverlay;

const styles = StyleSheet.create({
    backgroundLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 32, 63, 1)',
    },
});