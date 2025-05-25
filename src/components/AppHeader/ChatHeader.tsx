import { View, TouchableOpacity, Text, ViewStyle, TextStyle, Platform, StyleSheet, StatusBar, Image } from 'react-native'
import React from 'react'
import { SVGIcons } from '../../config/constants/svg'
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme'
import { reuseableTextStyles } from '../../styles/reuseableTextStyles'
import { useNavigation } from '@react-navigation/native'

type HeaderProps = {
    // handleBack?: () => void
    handleChatMenu?: () => void
    handleJobTitle?: () => void
    headerContainer?: ViewStyle;
    userName?: string;
    status?: string;
    jobTitle?: string;
}

const ChatHeader = ({
    headerContainer,
    userName,
    status,
    jobTitle,
    handleJobTitle,
    // handleBack,
    handleChatMenu
}: HeaderProps) => {
    const navigation = useNavigation<any>()
    const handleBack = () => {
        navigation.goBack()
    }

    return (
        <View style={[styles.header, headerContainer]}>
            <StatusBar backgroundColor={COLORS.Navy} barStyle="light-content" />
            <View style={styles.menuContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <SVGIcons.BackArrow width={32} height={32} />
                </TouchableOpacity>

                <View style={styles.logoContainer} >
                    <Text style={reuseableTextStyles.chatHeaderTitle}>{userName}</Text>
                    <Text style={reuseableTextStyles.chatStatus}>{status}</Text>
                </View>

                <TouchableOpacity style={styles.menuCircle} onPress={handleChatMenu}>
                    <SVGIcons.chatMenuDots />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.jobTitleContainer} onPress={handleJobTitle}>
                <SVGIcons.yellowBreifCase />
                <Text style={[reuseableTextStyles.chatHeaderTitle, { fontSize: fontSize[12] }]}>{jobTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChatHeader
const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.Navy,
        padding: 20,
        gap: 20,
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
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    jobTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: COLORS.Navy200,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8
    },
    logoContainer: {
        alignItems: 'center',
    },
    notificationButton: {
        padding: 8,
        position: 'relative',
    },
    menuCircle: {
        backgroundColor: COLORS.Yellow,
        borderRadius: 16,
        width: 32,
        height: 32,
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
        gap: 4,
        flexShrink: 1,
    },
    locationText: {
        flexShrink: 1,
        maxWidth: SIZES.width * 0.5,
    },
})
