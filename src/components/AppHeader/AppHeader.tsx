import { View, TouchableOpacity, Text, ViewStyle, TextStyle, Platform, StyleSheet, StatusBar, Image } from 'react-native'
import React from 'react'
import { SVGIcons } from '../../config/constants/svg'
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme'
import { reuseableTextStyles } from '../../styles/reuseableTextStyles'
import { useNavigation } from '@react-navigation/native'

type HeaderProps = {
    onMenuPress?: () => void
    handleEditJobPost?: () => void
    iconName?: keyof typeof SVGIcons;
    imageUrl?: string
    userName?: string
    userLocation?: string
    showNotificationBadge?: boolean
    isProfile?: boolean
    badgeCount?: number
    logoWidth?: number
    logoHeight?: number
    headerContainer?: ViewStyle;
    textStyle?: TextStyle;
    isOnPreview?: boolean;
    jobTitle?: string;
    jobProviderName?: string;
    time?: string;
    isChat?: boolean;
}

const AppHeader = ({
    onMenuPress,
    showNotificationBadge = true,
    imageUrl,
    userName,
    userLocation,
    isProfile = true,
    badgeCount = 3,
    logoWidth = 80,
    logoHeight = 30,
    headerContainer,
    textStyle,
    isOnPreview,
    jobTitle,
    jobProviderName,
    time,
    isChat,
    handleEditJobPost
}: HeaderProps) => {
    const navigation = useNavigation<any>()
    const handleHomeLogo = () => {
        navigation.navigate("Home")
    }
    const onNotificationPress = () => {
        navigation.navigate('Notifications')
    }

    return (
        <View style={[styles.header, headerContainer]}>
            <StatusBar backgroundColor={COLORS.Navy} barStyle="light-content" />
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
                    <SVGIcons.menuIcon />
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoContainer} onPress={handleHomeLogo}>
                    <SVGIcons.MyUstaLogo width={logoWidth} height={logoHeight} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.notificationButton} onPress={onNotificationPress}>
                    <SVGIcons.bellIcon />
                    {showNotificationBadge && badgeCount > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={[styles.notificationBadgeText, textStyle]}>{badgeCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            {isProfile &&
                <View style={styles.profileContainer}>
                    <View style={styles.profileSubContainer}>
                        <View style={styles.profileImgContainer}>
                            <Image source={{ uri: imageUrl }} style={styles.img} />
                        </View>
                        <View style={{ gap: 4 }}>
                            <View>
                                <Text style={[reuseableTextStyles.subTitle, { color: COLORS.white }]}>{userName}</Text>
                            </View>
                            <View style={styles.userDataContainer}>
                                <SVGIcons.locationYellowIcon />
                                <Text
                                    style={[reuseableTextStyles.subTitle, styles.locationText, { color: COLORS.white }]}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {userLocation}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {isChat &&
                        <TouchableOpacity>
                            <SVGIcons.chatIcon />
                        </TouchableOpacity>
                    }
                </View>
            }
            {isOnPreview &&
                <View style={{ gap: 4 }}>
                    <View>
                        <Text style={[reuseableTextStyles.title, { fontSize: fontSize[16], color: COLORS.Yellow }]}>{jobTitle}</Text>
                    </View>
                    <View style={styles.menuContainer}>
                        <View style={{ gap: 2 }}>
                            <Text style={[reuseableTextStyles.subTitle, { fontSize: fontSize[14], color: COLORS.white, fontFamily: FONTS.interMedium }]}>From:{jobProviderName}</Text>
                            <Text style={[reuseableTextStyles.subTitle, { fontSize: fontSize[12], color: COLORS.grey }]}>{time}</Text>
                        </View>
                        <TouchableOpacity style={styles.editContainer} onPress={handleEditJobPost}>
                            <SVGIcons.editIcon />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

export default AppHeader
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
    menuButton: {
        padding: 8,
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
        gap: 4,
        flexShrink: 1,
    },
    locationText: {
        flexShrink: 1,
        maxWidth: SIZES.width * 0.5,
    },
})
