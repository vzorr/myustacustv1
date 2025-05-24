import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, fontSize, SIZES } from '../../config/themes/theme'
import { SVGIcons } from '../../config/constants/svg'
import { reuseableTextStyles } from '../../styles/reuseableTextStyles'
import ConfirmationButtons from '../Buttons/ConfirmationButtons'

const UstaProfileCard = (props: any) => {
    const { handleProfile, handleInvite, profileImage, ustaName, profession, rating, distance } = props
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.cardHeader} />
                <View style={styles.imgContainer}>
                    <Image source={require("../../assets/images/office.jpg")} style={styles.imgStyle} />
                </View>
                <View style={styles.TextContainer}>
                    <View style={styles.nameContainer}>
                        <Text
                            style={[reuseableTextStyles.title, { fontSize: fontSize[16], color: COLORS.Navy, flexShrink: 1 }]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {ustaName}
                        </Text>
                        <SVGIcons.badgeCheckIcon />
                    </View>
                    <View>
                        <Text style={[reuseableTextStyles.subTitle, { fontSize: fontSize[12], color: COLORS.Navy200 }]}>{profession}</Text>
                    </View>
                    <View style={styles.ratingAndLocationContainer}>
                        <View style={styles.ratingContainer}>
                            <SVGIcons.yellowStarIcon width={16} height={16} />
                            <Text style={[reuseableTextStyles.subTitle, { fontSize: fontSize[12], color: COLORS.Navy }]}>{rating}</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <SVGIcons.locationIcon width={16} height={16} />
                            <Text style={[reuseableTextStyles.subTitle, { fontSize: fontSize[12], color: COLORS.Navy }]}>{distance} km away</Text>
                        </View>
                    </View>
                    <ConfirmationButtons
                        cancelText='Profile'
                        onCancel={handleProfile}
                        confirmText='Invite'
                        onConfirm={handleInvite}
                        confirmContainerStyle={{ backgroundColor: COLORS.Yellow }}
                        containerStyle={{ marginTop: 8, marginBottom: 12 }}
                    />
                </View>
            </View>
        </View>
    )
}

export default UstaProfileCard

const styles = StyleSheet.create({
    container: {
        width: SIZES.wp(50),
        backgroundColor: COLORS.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardHeader: {
        width: SIZES.wp(50),
        height: SIZES.hp(6.5),
        backgroundColor: COLORS.Navy,
        borderRadius: 8
    },
    imgContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.grey,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -35,
    },
    imgStyle: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    TextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%',
        gap: 4,
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