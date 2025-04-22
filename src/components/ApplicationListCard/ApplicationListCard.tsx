import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, fontSize } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';
import { getCustomTimeAgo } from '../../config/constants/constants';

interface ApplicationListCardProps {
    name: string;
    startDate: string;
    endDate: string;
    amount: number;
    rating: number;
    currency?: string;
    status?: 'approved' | 'pending' | 'rejected';
    onPress?: () => void;
    profileImg?: any
}

const ApplicationListCard: React.FC<ApplicationListCardProps> = ({
    name,
    startDate,
    endDate,
    amount,
    rating,
    currency = 'ALL',
    status,
    onPress,
    profileImg
}) => {
    const startDuration = getCustomTimeAgo(startDate)
    const endDuration = getCustomTimeAgo(endDate)
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.contentContainer}>
                <View style={styles.imgNameContainer}>
                    <View style={styles.imgContainer}>
                        <Image
                            source={{uri: profileImg}}
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                        />
                    </View>
                    <View style={{ marginLeft: 8 }}>
                        <View style={styles.headingContainer}>
                            <Text style={[reuseableTextStyles.title, { fontSize: fontSize[16] }]}>{name}</Text>
                            <SVGIcons.badgeCheckIcon width={16} height={16} />
                        </View>
                        <View style={styles.headingContainer}>
                            <SVGIcons.calenderIcon width={16} height={16} />
                            <Text style={reuseableTextStyles.subTitle}>{startDuration} - {endDuration}</Text>
                        </View>
                        <View style={styles.headingContainer}>
                            <SVGIcons.moneyIcon width={16} height={16} />
                            <Text style={reuseableTextStyles.subTitle}>{amount} {currency}</Text>
                        </View>
                        <View style={styles.headingContainer}>
                            <SVGIcons.yellowStarIcon width={16} height={16} />
                            <Text style={reuseableTextStyles.subTitle}>{rating}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <SVGIcons.rightArrow />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: 8,
        backgroundColor: COLORS.white,
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.grey,
    },
    imgNameContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
});

export default ApplicationListCard;