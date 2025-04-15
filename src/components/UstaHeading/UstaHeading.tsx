import React from 'react';
import { Text, View, TextStyle, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';
import { SVGIcons } from '../../config/constants/svg';

interface HeadingProps {
    onPress: () => void;
    title: string;
    style?: TextStyle;
    containerStyle?: ViewStyle;
}

const UstaHeading: React.FC<HeadingProps> = ({ onPress, title, style, containerStyle }) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            <Text style={[reuseableTextStyles.title, style]}>
                {title}
            </Text>
            <SVGIcons.rightArrow />
        </TouchableOpacity>
    );
};

export default UstaHeading;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
