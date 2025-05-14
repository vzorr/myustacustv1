import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import { COLORS, FONTS, fontSize, SIZES } from '../../../config/themes/theme'
import { SVGIcons } from '../../../config/constants/svg'
import AppHeader from '../../../components/AppHeader/AppHeader'
import UstaHeading from '../../../components/UstaHeading/UstaHeading'
import ProfessionCard from '../../../components/HomeComponents/ProfessionCard'
import CategoryItem from '../../../components/HomeComponents/CategoryItem'


const HomeScreen: React.FC<UserNavigationRootProps<"Home">> = (props) => {
    const { route, navigation } = props
    const ViewPostedJobs = () => {
        navigation.navigate("JobsStatusScreens")
    }

    // const renderItem = ({ item }: { item: typeof professionData[0] }) => (
    //     <View style={styles.sectionContainer}>
    //         <Text style={styles.sectionTitle}>Most Visited Professions</Text>
    //         <ProfessionCard
    //             title={item.title}
    //             count={item.count}
    //             icon={<Image source={item.image} style={styles.professionImage} />}
    //         />
    //     </View>
    // );

    const renderScreenContent = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Most Visited Professions</Text>
            <ProfessionCard
                title="Plumber"
                count={253}
                icon={<Image source={require('../../../assets/images/MostVisitedProfessions/Plumber.png')} style={styles.professionImage} />}
                suffixText=" Plumbers"
            />

            <ProfessionCard
                title="Dry Wall"
                count={518}
                icon={<Image source={require('../../../assets/images/MostVisitedProfessions/Drywall.png')} style={styles.dryWalImage} />}
                suffixText=" Installers"
            />

            <ProfessionCard
                title="Electrician"
                count={427}
                icon={<Image source={require('../../../assets/images/MostVisitedProfessions/Electrician.png')} style={styles.professionImage} />}
                suffixText=" Electricians"
            />
            <ProfessionCard
                title="Carpenter"
                count={315}
                icon={<Image source={require('../../../assets/images/MostVisitedProfessions/Electrician.png')} style={styles.professionImage} />}
                suffixText=" Carpenters"
            />
            <ProfessionCard
                title="Painter"
                count={183}
                icon={<Image source={require('../../../assets/images/MostVisitedProfessions/Electrician.png')} style={styles.professionImage} />}
                suffixText=" Painters"
            />
            <ProfessionCard
                title="HVAC"
                count={267}
                icon={<Image source={require('../../../assets/images/MostVisitedProfessions/Electrician.png')} style={styles.professionImage} />}
                suffixText=" Technicians"
            />
            <ProfessionCard
                title="Roofer"
                count={142}
                icon={<Image source={require('../../../assets/images/MostVisitedProfessions/Electrician.png')} style={styles.professionImage} />}
                suffixText=" Professionals"
            />
        </View>
    )
    const screenData = [{ id: '1' }];

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
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            >
                <CategoryItem
                    iconName="plusIcon"
                    label="Plumbing"
                />
                <CategoryItem
                    iconName="searchIcon"
                    label="Electrical"
                />
                <CategoryItem
                    iconName="searchIcon"
                    label="Carpenter"
                />
            </ScrollView>
            {/* <FlatList
                data={professionData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ flexGrow: 1 }}
            /> */}
            <FlatList
                data={screenData}
                keyExtractor={item => item.id}
                renderItem={() => renderScreenContent()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
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
        // paddingVertical: 20,
        gap: 8,
        marginBottom: 20
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