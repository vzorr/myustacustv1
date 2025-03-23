import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import splashScreenStyles from '../../styles/splashScreenStyles';

const OrDivider: React.FC = () => {
    return (
        <View style={splashScreenStyles.lineContainer}>
            <View style={splashScreenStyles.line} />
            <Text style={splashScreenStyles.orText}>Or</Text>
            <View style={splashScreenStyles.line} />
        </View>
    );
};
export default OrDivider;