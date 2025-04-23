import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Heading from '../Heading/Heading';
import { COLORS, fontSize } from '../../config/themes/theme';
import { SVGIcons } from '../../config/constants/svg';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';
import SubHeading from '../Heading/SubHeading';

type Props = {
    title: string;
    rating: number;
    dateRange: string;
    description: string;
    amount: string;
};

const WorkHistoryCard: React.FC<Props> = ({ title, rating, dateRange, description, amount }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <SVGIcons.yellowStarIcon key={i} width={16} height={16} />
                ) : (
                    <SVGIcons.starOutlined key={i} width={16} height={16} stroke={COLORS.Yellow} />
                )
            );
        }
        return stars;
    };

    return (
        <View style={styles.container}>
            <Heading
                headingText={title}
                style={{ fontSize: fontSize[16] }}
                containerStyle={{ width: '100%' }}
            />
            <View style={styles.ratingMainContainer}>
                <View style={styles.ratingContainer}>
                    {renderStars()}
                    <Text style={[reuseableTextStyles.subTitle, styles.ratingText]}>
                        {rating.toFixed(1)}
                    </Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={reuseableTextStyles.subTitle}>{dateRange}</Text>
                </View>
            </View>
            <SubHeading subHeadingText={description} />
            <Heading headingText={amount} style={{ fontSize: fontSize[16] }} />
        </View>
    );
};

export default WorkHistoryCard;

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
    ratingMainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingEnd: 10,
        borderRightWidth: 1,
        borderRightColor: COLORS.inputBorder,
    },
    dateContainer: {
        paddingStart: 10,
    },
    ratingText: {
        marginLeft: 5,
    },
});
