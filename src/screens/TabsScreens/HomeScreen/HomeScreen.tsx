import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import { COLORS, FONTS, fontSize, SIZES } from '../../../config/themes/theme'
import { SVGIcons } from '../../../config/constants/svg'
import AppHeader from '../../../components/AppHeader/AppHeader'
import UstaHeading from '../../../components/UstaHeading/UstaHeading'
import ProfessionCard from '../../../components/HomeComponents/ProfessionCard'
import CategoryItem from '../../../components/HomeComponents/CategoryItem'
import Heading from '../../../components/Heading/Heading'
import { IMostVisitedProfession, IExploreProfession, ITopCategory, mostVisitedProfessionsData, exploreProfessionsData, topCategoriesData } from '../../../utils/mockData'

const HomeScreen: React.FC<UserNavigationRootProps<"Home">> = (props) => {
    const { route, navigation } = props
    const ViewPostedJobs = () => {
        navigation.navigate("JobsStatusScreens")
    }

    const renderScreenContent = () => (
        <View style={styles.sectionContainer}>
            <Heading
                headingText='Most Visited Professions'
                style={{ fontSize: fontSize[20] }}
                containerStyle={{ marginBottom: 10 }} />
            {mostVisitedProfessionsData.map((item: IMostVisitedProfession) => (
                <ProfessionCard
                    key={item.id}
                    title={item.title}
                    count={item.count}
                    icon={<Image source={item.image} style={item.imageStyle === 'drywall' ? styles.dryWalImage : styles.professionImage} />}
                    suffixText={item.suffixText}
                />
            ))}

            <Heading
                headingText='Explore All Professions'
                style={{ fontSize: fontSize[20] }}
                containerStyle={{ marginBottom: 10, marginTop: 10 }} />
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                }}>
                {exploreProfessionsData.map((item: IExploreProfession) => (
                    <View style={{
                        paddingHorizontal: 2,
                        paddingVertical: 4,
                    }}
                        key={item.id}
                    >
                        <CategoryItem
                            iconName={item.iconName as keyof typeof SVGIcons}
                            label={item.label}
                        />
                    </View>
                ))}
            </View>
        </View>
    )
    const screenData = [{ id: '1' }];

    const renderTopCategoryItem = ({ item }: { item: ITopCategory }) => (
        <CategoryItem
            iconName={item.iconName as keyof typeof SVGIcons}
            label={item.label}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.Navy} barStyle="light-content" />
            <AppHeader
                onMenuPress={() => { }}
                showNotificationBadge={true}
                badgeCount={0}
                isProfile={false}
            />
            <UstaHeading
                title="My Jobs"
                onPress={ViewPostedJobs}
                containerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
                style={{ fontSize: fontSize[16] }}
            />
            {/* Categories */}
            <View>
                <FlatList
                    horizontal
                    data={topCategoriesData}
                    renderItem={renderTopCategoryItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                />
            </View>
            <FlatList
                data={screenData}
                keyExtractor={item => item.id}
                renderItem={() => renderScreenContent()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
            />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
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
        paddingBottom: 80,
        paddingHorizontal: 20,
    },
    categoriesContainer: {
        padding: 12,
        gap: 8,
    },
    sectionContainer: {
        paddingBottom: 80,
        paddingHorizontal: 20,
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