import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';

interface ProfessionCardProps {
    title: string;
    count: number;
    icon: React.ReactNode;
    color?: string;
    onPress?: () => void;
    suffixText?: string;
    showArrow?: boolean;
    cardStyle?: ViewStyle;
    titleStyle?: TextStyle;
    countStyle?: TextStyle;
}

const ProfessionCard = ({
    title,
    count,
    icon,
    color = COLORS.skyBlue,
    onPress,
    suffixText = 's',
    showArrow = true,
    cardStyle,
    titleStyle,
    countStyle,
}: ProfessionCardProps) => {
    return (
        <TouchableOpacity
            style={[styles.professionCard, { backgroundColor: color }, cardStyle]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.professionInfo}>
                <Text style={[styles.professionTitle, titleStyle]}>{title}</Text>
                <View style={styles.professionCountContainer}>
                    <Text style={[styles.professionCount, countStyle]}>
                        {count} {title}{suffixText}
                    </Text>
                    {showArrow && (
                        <SVGIcons.rightArrow stroke={COLORS.white} width={16} height={16} />
                    )}
                </View>
            </View>
            <View style={styles.professionImageContainer}>
                {icon}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    professionCard: {
        backgroundColor: COLORS.skyBlue,
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        height: 130,
    },
    professionInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    professionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 16,
    },
    professionCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    professionCount: {
        fontSize: 14,
        color: COLORS.white,
        marginRight: 8,
    },
    professionImageContainer: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    professionImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    dryWalImage: {
        width: 130,
        height: 130,
        resizeMode: 'contain',
        marginTop: -35,
    },
});

export default ProfessionCard;
