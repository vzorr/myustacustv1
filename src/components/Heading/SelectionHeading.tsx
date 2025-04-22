import React, { useState } from 'react';
import { Text, View, TextStyle, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';
import { SVGIcons } from '../../config/constants/svg';

interface HeadingProps {
    headingText: string;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
    isSelected?: boolean;
    onPress?: () => void;
}

const SelectionHeading: React.FC<HeadingProps> = ({
    headingText,
    textStyle,
    containerStyle,
    isSelected = false,
    onPress
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity onPress={onPress}>
                {isSelected ? <SVGIcons.radioSelected /> : <SVGIcons.radioUnSelected />}
            </TouchableOpacity>
            <View style={{ width: "92%" }}>
                <Text style={[reuseableTextStyles.subTitle, textStyle]}>
                    {headingText}
                </Text>
            </View>
        </View>
    );
};

export default SelectionHeading;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
})