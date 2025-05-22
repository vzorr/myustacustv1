import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, fontSize, SIZES } from '../../config/themes/theme'
import { SVGIcons } from '../../config/constants/svg'
import { reuseableTextStyles } from '../../styles/reuseableTextStyles'

const UstaProfileHorizentalCard = (props: any) => {
    const { ustaName, rating, distance, onPress } = props
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.contentContainer}>
                <View style={styles.imgAndContentContainer}>
                    <View style={styles.imgContainer}>
                        <Image source={require("../../assets/images/office.jpg")} style={styles.imgStyle} />
                    </View>
                    <View style={styles.TextContainer}>
                        <View style={styles.nameContainer}>
                            <Text
                                style={[reuseableTextStyles.title, { fontSize: fontSize[14], color: COLORS.Navy, flexShrink: 1 }]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {ustaName}
                            </Text>
                            <SVGIcons.badgeCheckIcon />
                        </View>
                        <View style={styles.ratingAndLocationContainer}>
                            <View style={styles.ratingContainer}>
                                <SVGIcons.yellowStarIcon width={16} height={16} />
                                <Text style={[reuseableTextStyles.subTitle, { fontSize: fontSize[14], color: COLORS.Navy }]}>{rating}</Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                <SVGIcons.locationIcon width={16} height={16} />
                                <Text style={[reuseableTextStyles.subTitle, { fontSize: fontSize[14], color: COLORS.Navy }]}>{distance} km away</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <SVGIcons.rightArrow />
            </View>
        </TouchableOpacity>
    )
}

export default UstaProfileHorizentalCard

const styles = StyleSheet.create({
    container: {
        // width: SIZES.wp(50),
        backgroundColor: COLORS.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    imgAndContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.grey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    TextContainer: {
        justifyContent: 'center',
        paddingStart: 8,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        maxWidth: SIZES.wp(60),
    },
    ratingAndLocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    }
})