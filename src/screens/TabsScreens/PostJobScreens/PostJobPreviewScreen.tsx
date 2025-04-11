import { FlatList, Platform, SafeAreaView, StyleSheet, Text, UIManager, View } from 'react-native'
import React, { useState } from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import AppHeader from '../../../components/AppHeader/AppHeader'
import Heading from '../../../components/Heading/Heading'
import { reuseableTextStyles } from '../../../styles/reuseableTextStyles'
import { COLORS, FONTS, fontSize } from '../../../config/themes/theme'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { locationScreenStyles } from '../../../styles/locationScreenStyles'
import ConfirmationButtons from '../../../components/Buttons/ConfirmationButtons'
import AccountHeader from '../../../components/AccountHeader/AccountHeader'
import LineSeparator from '../../../components/LineSeparator/LineSeparator'
import HorizontalImageList from '../../../components/HorizentalImagesList/HorizentalImagesList'

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PostJobPreviewScreen: React.FC<UserNavigationRootProps<"PostJobPreview">> = (props) => {
    const { route, navigation } = props
    const Images = [
        {
            id: 1,
            imagePath: require('../../../assets/images/MostVisitedProfessions/Plumber.png')
        },
        {
            id: 2,
            imagePath: require('../../../assets/images/MostVisitedProfessions/Drywall.png')
        },
        {
            id: 3,
            imagePath: require('../../../assets/images/MostVisitedProfessions/Electrician.png')
        }
    ]
    const [region, setRegion] = useState<Region>({
        latitude: 42.0693,
        longitude: 19.5126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });



    const handleDiscard = () => {
        // navigation.navigate("LocationScreen")
    }
    const handlePostJob = () => {
        navigation.navigate("SuccessMessage", { screenType: "PostJobPreview" })
    }
    const handleEditJobPost = () => {
        navigation.navigate('Tabs', {
            screen: 'PostJobScreen',
        });
    }


    const renderScreenContent = () => (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <AccountHeader
                    title='PAYMENT METHOD'
                    subTitle={'By Cash'}
                    titleStyle={{ fontSize: fontSize[16] }}
                    containerStyle={{ gap: 2 }}
                />
                <AccountHeader
                    title='Category'
                    subTitle={'Tiler'}
                    titleStyle={{ fontSize: fontSize[16] }}
                    containerStyle={{ gap: 2 }}
                />
                <AccountHeader
                    title='JOB DESCRIPTION'
                    subTitle={'I need tile installation for my home in Myslym,Shyri,Tirana!'}
                    titleStyle={{ fontSize: fontSize[16] }}
                    containerStyle={{ gap: 2 }}
                />
                <LineSeparator />
                <AccountHeader
                    title='AREA SIZE'
                    subTitle={'35 m²'}
                    titleStyle={{ fontSize: fontSize[16] }}
                    containerStyle={{ marginTop: -3, gap: 2 }}
                />
                <AccountHeader
                    title='MATERIALS'
                    subTitle={'Tiles'}
                    titleStyle={{ fontSize: fontSize[16] }}
                    containerStyle={{ gap: 2 }}
                />
                <LineSeparator />
                <Heading
                    headingText='IMAGES'
                    style={{ fontSize: fontSize[16] }}
                    containerStyle={{ gap: 2 }}
                />
                <HorizontalImageList
                    images={Images}
                />
                <AccountHeader
                    title='START DATE'
                    subTitle={'20 January 2025'}
                    titleStyle={{ fontSize: fontSize[16] }}
                    containerStyle={{ gap: 2 }}
                />
                <AccountHeader
                    title='END DATE'
                    subTitle={'27 January 2025'}
                    titleStyle={{ fontSize: fontSize[16] }}
                    containerStyle={{ gap: 2 }}
                />
                <LineSeparator />
                <AccountHeader
                    title='LOCATION'
                    subTitle={'Tirana,Albania'}
                    titleStyle={{ fontSize: fontSize[16] }}
                    containerStyle={{ marginTop: -3, gap: 2 }}
                />
                <AccountHeader
                    title='LOCATION DESCRIPTION'
                    subTitle={'my Tirana,Albania near abc'}
                    titleStyle={{ fontSize: fontSize[16] }}
                    containerStyle={{ gap: 2 }}
                />
                <View style={{ gap: 8, height: 400, borderRadius: 50 }}>
                    <Text style={reuseableTextStyles.subTitle}>Place the marker in the exact location</Text>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={locationScreenStyles.map}
                        region={region}
                        onRegionChangeComplete={setRegion}
                    >
                        <Marker coordinate={region} />
                    </MapView>
                </View>
                <AccountHeader
                    title='BUDGET'
                    subTitle={'60,000 All'}
                    titleStyle={{ fontSize: fontSize[16] }}
                    containerStyle={{ gap: 2 }}
                />
                <ConfirmationButtons
                    cancelText='Cancel'
                    onCancel={handleDiscard}
                    confirmText='Review Details'
                    onConfirm={handlePostJob}
                    confirmContainerStyle={{ backgroundColor: COLORS.Yellow }}
                />
            </View>
        </SafeAreaView>
    );

    const screenData = [{ id: '1' }];
    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <AppHeader
                onMenuPress={() => { }}
                onNotificationPress={() => { }}
                showNotificationBadge={true}
                badgeCount={5}
                isProfile={false}
                isOnPreview={true}
                jobTitle='Tile installations'
                jobProviderName='Igli Faslija'
                time='2 minutes ago'
                handleEditJobPost={handleEditJobPost}
            />
            <FlatList
                data={screenData}
                keyExtractor={item => item.id}
                renderItem={() => renderScreenContent()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 50
    },
    innerContainer: {
        gap: 16
    },
    radioMainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: 8,
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        color: COLORS.white,
        fontWeight: '400',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    NIPTContainer: {
        position: 'absolute',
        right: 12,
        top: 10
    },
    addExperienceContainer: {
        flex: 1,
        width: "100%",
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: 8,
        padding: 12,
        gap: 12,
    },
    addTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});

export default PostJobPreviewScreen;