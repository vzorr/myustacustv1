import { FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import Heading from '../../../components/Heading/Heading'
import { reuseableTextStyles } from '../../../styles/reuseableTextStyles'
import { COLORS, FONTS, fontSize, SIZES } from '../../../config/themes/theme'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { locationScreenStyles } from '../../../styles/locationScreenStyles'
import ConfirmationButtons from '../../../components/Buttons/ConfirmationButtons'
import AccountHeader from '../../../components/AccountHeader/AccountHeader'
import LineSeparator from '../../../components/LineSeparator/LineSeparator'
import HorizontalImageList from '../../../components/HorizentalImagesList/HorizentalImagesList'
import { SVGIcons } from '../../../config/constants/svg'
import JobDetailHeader from '../../../components/AppHeader/JobDetailHeader'
import StatusUpdate from '../../../components/HomeComponents/StatusUpdate'
import CustomButton from '../../../components/Buttons/CustomButton'
import { JOBS_STATUS_TABS } from '../../../config/constants/constants'
import UstaHeading from '../../../components/UstaHeading/UstaHeading'

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PostedJobDetailScreen: React.FC<UserNavigationRootProps<"PostedJobDetailScreen">> = (props) => {
    const { route, navigation } = props
    const { id, status, applicationsCount } = route?.params?.jobDetails || {};
    console.log("jobDetails", route?.params?.jobDetails)
    const mapRef = useRef<MapView>(null);
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
    const handleViewButton = () => {
        props.navigation.navigate("ApplicationsList")
        if (status === JOBS_STATUS_TABS.PENDING) {

        }
        else if (status === JOBS_STATUS_TABS.ONGOING) {
        }
        else {
        }
    }


    const renderScreenContent = () => (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Heading
                    headingText='JOB STATUS'
                    style={{ fontSize: fontSize[16] }}
                />
                {status === JOBS_STATUS_TABS.PENDING ?
                    <StatusUpdate
                        text={status}
                        textColor={COLORS.statusBtnBorderColor}
                        bgColor={COLORS.statusBtnBgColor}
                        borderColor={COLORS.statusBtnBorderColor}
                        isArrow={false}
                    />
                    : status === JOBS_STATUS_TABS.ONGOING ?
                        <StatusUpdate
                            text={status}
                            textColor={COLORS.ongoingStatusColor}
                            bgColor={COLORS.ongoingBgColor}
                            borderColor={COLORS.ongoingStatusColor}
                            isArrow={false}
                        />
                        :
                        <StatusUpdate
                            text={status}
                            textColor={COLORS.completedTxtColor}
                            bgColor={COLORS.completedBgColor}
                            borderColor={COLORS.completedTxtColor}
                            isArrow={false}
                        />
                }
                <LineSeparator />
                {(status === "ongoing" ?
                    <View>
                        <Heading
                            headingText='JOB PROGRESS'
                            style={{ fontSize: fontSize[16] }}
                        />
                        <CustomButton
                            title={"View Progress"}
                            onPress={handleViewButton}
                            style={{ width: SIZES.wp(45), marginStart: 0 }}
                        />
                    </View>
                    : status === JOBS_STATUS_TABS.PENDING && applicationsCount.length > 0 ?
                        <View>
                            <View>
                                <Text style={[reuseableTextStyles.title, { fontSize: fontSize[16] }]}>JOB APPLICATIONS({applicationsCount})</Text>
                            </View>
                            <CustomButton
                                title={"View my Applications"}
                                onPress={handleViewButton}
                                style={{ width: SIZES.wp(50), marginStart: 0 }}
                            />
                        </View>
                        :
                        <View>
                            <UstaHeading
                                title='JOB REVIEWS'
                                onPress={handleViewButton}
                                style={{ fontSize: fontSize[16] }}
                            />
                            <CustomButton
                                title={"Leave Review"}
                                onPress={handleViewButton}
                                style={{ width: SIZES.wp(45), marginStart: 0 }}
                            />
                        </View>
                )}
                <LineSeparator />
                <AccountHeader
                    title='Category'
                    subTitle={'Tiler'}
                    titleStyle={{ fontSize: fontSize[16], marginTop: -10 }}
                />
                <AccountHeader
                    title='JOB DESCRIPTION'
                    subTitle={'I need tile installation for my home in Myslym,Shyri,Tirana!'}
                    titleStyle={{ fontSize: fontSize[16], marginTop: -10 }}
                />
                <LineSeparator />
                <AccountHeader
                    title='AREA SIZE'
                    subTitle={'35 m²'}
                    titleStyle={{ fontSize: fontSize[16], marginTop: -10 }}
                />
                <AccountHeader
                    title='MATERIALS'
                    subTitle={'Tiles'}
                    titleStyle={{ fontSize: fontSize[16], marginTop: -10 }}
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
                />
                <AccountHeader
                    title='END DATE'
                    subTitle={'27 January 2025'}
                    titleStyle={{ fontSize: fontSize[16], marginTop: -10 }}
                />
                <LineSeparator />
                <AccountHeader
                    title='LOCATION'
                    subTitle={'Tirana,Albania'}
                    titleStyle={{ fontSize: fontSize[16], marginTop: -10 }}
                />
                <AccountHeader
                    title='LOCATION DESCRIPTION'
                    subTitle={'my Tirana,Albania near abc'}
                    titleStyle={{ fontSize: fontSize[16], marginTop: -10 }}
                />
                <View style={styles.mapContainer}>
                    <MapView
                        ref={mapRef}
                        provider={PROVIDER_GOOGLE}
                        style={styles.mapView}
                        region={region}
                        onRegionChangeComplete={setRegion}
                        scrollEnabled={true}
                        zoomEnabled={true}
                        pitchEnabled={true}
                        rotateEnabled={true}
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
            </View>
        </SafeAreaView>
    );

    const screenData = [{ id: '1' }];
    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <JobDetailHeader
                headingTitle='My Jobs'
                jobTitle='Tile installations'
                jobProviderName='Igli Faslija'
                time='2 minutes ago'
                isEdit={true}
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
        gap: 10
    },
    radioMainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    mapContainer: {
        height: 250,
        overflow: 'hidden',
        borderRadius: 12,
        marginBottom: 16,
    },
    mapView: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 12,
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
    cashContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -8
    },
});

export default PostedJobDetailScreen;