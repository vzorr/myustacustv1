import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';
import { COLORS, fontSize } from '../../config/themes/theme';
interface porfolioProps {
    imageUrl: string;
    workText: string;
    workTypeTxt: string;
    handleCardPress: () => void;
}

const UstaPortfolioListCard: React.FC<porfolioProps> = ({
    imageUrl,
    workText,
    workTypeTxt,
    handleCardPress
}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={handleCardPress}>
            <View style={styles.imgContainer}>
                <Image
                    // source={{ uri: imageUrl }}
                    source={require('../../assets/images/office.jpg')}
                    style={{
                        width: 136,
                        height: 102,
                        borderRadius: 8,
                    }}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={[reuseableTextStyles.subTitle, styles.subtitle]}>{workText}</Text>
                <Text style={[reuseableTextStyles.subTitle, styles.subtitle]}>{workTypeTxt}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default UstaPortfolioListCard;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        gap: 4,
    },
    imgContainer: {
        width: "42.5%",
        height: 102,
        borderRadius: 8,
    },
    textContainer: {
        justifyContent: 'center',
    },
    subtitle: {
        fontSize: fontSize[12],
        color: COLORS.Navy
    }
})