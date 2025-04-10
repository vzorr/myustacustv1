import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { SVGIcons } from '../../config/constants/svg';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';

interface BackHeaderProps {
    title: string;
    onPress: () => void;
}
const BackHeader: React.FC<BackHeaderProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <SVGIcons.leftArrow />
            <Text style={reuseableTextStyles.subTitle}>{title}</Text>
        </TouchableOpacity>
    );
};
export default BackHeader;