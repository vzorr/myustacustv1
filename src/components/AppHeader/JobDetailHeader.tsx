import { View, TouchableOpacity, Text, ViewStyle, TextStyle, Platform, StyleSheet, StatusBar, Image } from 'react-native'
import React from 'react'
import { SVGIcons } from '../../config/constants/svg'
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme'
import { reuseableTextStyles } from '../../styles/reuseableTextStyles'
import { useNavigation } from '@react-navigation/native'

type HeaderProps = {
    iconName?: keyof typeof SVGIcons;
    headerContainer?: ViewStyle;
    headingTitle?: string;
    jobTitle?: string;
    jobProviderName?: string;
    time?: string;
    handleEditJobPost?: () => void;
    isEdit?: boolean;
}

const JobDetailHeader = ({
    headerContainer,
    headingTitle = "Job Deatils",
    jobTitle,
    jobProviderName,
    time,
    handleEditJobPost,
    isEdit = false
}: HeaderProps) => {
    const navigation = useNavigation();
    const handleBackBtn = () => {
        navigation.goBack()
    }

    return (
        <View style={[styles.header, headerContainer]}>
            <StatusBar backgroundColor={COLORS.UstaBlack} barStyle="light-content" />
            <TouchableOpacity style={styles.backContainer} onPress={handleBackBtn}>
                <SVGIcons.BackArrow />
                <Text style={[reuseableTextStyles.subTitle, { color: COLORS.white, marginStart: 8 }]}>{headingTitle}</Text>
            </TouchableOpacity>
            <View style={{ gap: 4 }}>
                <View>
                    <Text style={[reuseableTextStyles.title, { fontSize: fontSize[16], color: COLORS.Yellow }]}>{jobTitle}</Text>
                </View>
                <View style={styles.nameContainer}>
                    <View style={{ gap: 2 }}>
                        <Text style={[reuseableTextStyles.subTitle, { fontSize: fontSize[14], color: COLORS.white, fontFamily: FONTS.interMedium }]}>From:{jobProviderName}</Text>
                        <Text style={[reuseableTextStyles.subTitle, { fontSize: fontSize[12], color: COLORS.grey }]}>{time}</Text>
                    </View>
                    {isEdit &&
                        <TouchableOpacity style={styles.editContainer} onPress={handleEditJobPost}>
                            <SVGIcons.editIcon />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

export default JobDetailHeader
const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.Navy,
        padding: 20,
        gap: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 20,
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16,
        minHeight: 100,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoContainer: {
        alignItems: 'center',
    },
    notificationButton: {
        padding: 8,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: COLORS.Yellow,
        borderRadius: 10,
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editContainer: {
        backgroundColor: COLORS.Yellow,
        borderRadius: 16,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationBadgeText: {
        color: COLORS.Navy,
        fontSize: 10,
        fontWeight: 'bold',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },
    profileSubContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    },
    profileImgContainer: {
        width: 48,
        height: 48,
        borderRadius: 48,
        backgroundColor: COLORS.white
    },
    img: {
        width: 48,
        height: 48,
        borderRadius: 48,
        resizeMode: 'contain'
    },
    userDataContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        gap: 4
    }
})
