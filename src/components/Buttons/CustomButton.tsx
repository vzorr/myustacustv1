import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress, style, textStyle }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 44,
        margin: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FFC800',
    },
    buttonText: {
        // fontFamily: 'Inter', 
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 14,
        color: '#00203F',
    },
});

export default CustomButton;