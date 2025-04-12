import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, StatusBar } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import { COLORS, FONTS, SIZES } from '../../../config/themes/theme'
import { SVGIcons } from '../../../config/constants/svg'
import AppHeader from '../../../components/AppHeader/AppHeader'

const CategoryItem = ({ iconName, label }: { iconName: React.ReactNode, label: string }) => {
    return (
        <TouchableOpacity style={styles.categoryItem}>
            <View>
                {iconName}
            </View>
            <Text style={styles.categoryLabel}>{label}</Text>
        </TouchableOpacity>
    )
}

const ProfessionCard = ({
    title,
    count,
    icon,
}: {
    title: string,
    count: number,
    icon: React.ReactNode,
    color?: string
}) => {
    return (
        <TouchableOpacity style={[styles.professionCard]}>
            <View style={styles.professionInfo}>
                <Text style={styles.professionTitle}>{title}</Text>
                <View style={styles.professionCountContainer}>
                    <Text style={styles.professionCount}>{count} {title}s</Text>
                    <SVGIcons.rightArrow stroke={COLORS.white} width={16} height={16} />
                </View>
            </View>
            <View style={styles.professionImageContainer}>
                {icon}
            </View>
        </TouchableOpacity>
    )
}

const HomeScreen: React.FC<UserNavigationRootProps<"Home">> = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.Navy} barStyle="light-content" />
            <AppHeader
                onMenuPress={() => { }}
                onNotificationPress={() => { }}
                showNotificationBadge={true}
                badgeCount={5}
                isProfile={false}
            />
            <View>
                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    <CategoryItem
                        iconName={<SVGIcons.plusIcon stroke={COLORS.Navy} />}
                        label="Plumbing"
                    />
                    <CategoryItem
                        iconName={<SVGIcons.searchIcon stroke={COLORS.Navy} />}
                        label="Electrical"
                    />
                    <CategoryItem
                        iconName={<SVGIcons.HomeIcon stroke={COLORS.Navy} />}
                        label="Carpenter"
                    />
                    {/* Add more categories as needed */}
                </ScrollView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}
                >

                    {/* Most Visited Professions */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Most Visited Professions</Text>

                        <ProfessionCard
                            title="Plumber"
                            count={0}
                            icon={<Image source={require('../../../assets/images/MostVisitedProfessions/Plumber.png')} style={styles.professionImage} />}
                        />

                        <ProfessionCard
                            title="Dry Wall"
                            count={0}
                            icon={<Image source={require('../../../assets/images/MostVisitedProfessions/Drywall.png')} style={styles.dryWalImage} />}
                            color={COLORS.Navy}
                        />

                        <ProfessionCard
                            title="Electrician"
                            count={0}
                            icon={<Image source={require('../../../assets/images/MostVisitedProfessions/Electrician.png')} style={styles.professionImage} />}
                            color={COLORS.Navy}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        backgroundColor: COLORS.Navy,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 12,
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16,
        minHeight: 100
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
    notificationBadgeText: {
        color: COLORS.Navy,
        fontSize: 10,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 80, // Add padding for bottom tab
        paddingHorizontal: 20,
        // paddingVertical: 16
    },
    categoriesContainer: {
        padding: 16,
        gap: 8,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES.wp(35),
        height: SIZES.hp(6),
        borderWidth: 1,
        borderRadius: 36,
        borderColor: COLORS.inputBorder,
        gap: 8
    },
    categoryLabel: {
        fontSize: 12,
        color: COLORS.Navy,
        textAlign: 'center',
    },
    sectionContainer: {
        marginBottom: 16,
        paddingHorizontal: 3.9
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.Navy,
        marginBottom: 16,
    },
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
        marginTop: -35
    },
})