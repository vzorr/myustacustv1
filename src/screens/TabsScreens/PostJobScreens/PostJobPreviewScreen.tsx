import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, UIManager, View } from 'react-native'
import React, { useRef, useState, useMemo, useCallback } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { client } from '../../../apiManager/Client'
// import RNFS from 'react-native-fs';
import { postJobValue } from '../../../config/constants/constants'
import { setPostJobReducer } from '../../../stores/reducer/PostJobReducer'
import VisibleLoader from '../../../components/Loader/VisibleLoader'
import Toast from 'react-native-simple-toast';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal'

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PostJobPreviewScreen: React.FC<UserNavigationRootProps<"PostJobPreview">> = (props) => {
    const { route, navigation } = props
    const { token }: any = useSelector((state: any) => state?.accessToken)
    const { userData }: any = useSelector((state: any) => state?.userInfo)

    const [discardChangesModel, setDiscardChangesModal] = useState(false);
    const { metaData }: any = useSelector((state: any) => state?.metaData)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { postJob }: any = useSelector((state: any) => state?.postJob)
    const previewValue = useMemo(() => postJob, [postJob]);

    const mapRef = useRef<MapView>(null);

    // Use the location from postJob if available, otherwise use default location
    const initialRegion = useMemo(() => ({
        latitude: previewValue?.location?.latitude || 42.0693,
        longitude: previewValue?.location?.longitude || 19.5126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    }), [previewValue?.location]);

    const handleDiscard = useCallback(() => {
        setDiscardChangesModal(true)
    }, [navigation]);
    const handleConfirmCancel = () => {
        dispatch(setPostJobReducer({}))
        navigation.navigate('Tabs')
    }
    const handlePostJob = useCallback(async () => {
        console.log("token", token)
        try {
            if (!userData?.token && !token) {
                navigation.navigate('SignIn')
                return
            }

            // Enhanced validation with specific error messages
            const validationErrors = [];

            if (!previewValue?.title) validationErrors.push('Job title');
            if (!previewValue?.description) validationErrors.push('Job description');
            if (!previewValue?.paymentMethod) validationErrors.push('Payment method');
            if (!previewValue?.areaSize) validationErrors.push('Area size');
            if (!previewValue?.startDate) validationErrors.push('Start date');
            if (!previewValue?.endDate) validationErrors.push('End date');
            if (!previewValue?.location || !previewValue?.location?.address) validationErrors.push('Location');
            if (!previewValue?.images || previewValue.images.length === 0) validationErrors.push('Images');
            if (!previewValue?.category) validationErrors.push('Category');
            if (!previewValue?.materials) validationErrors.push('Materials');

            if (validationErrors.length > 0) {
                Toast.show(`Missing required fields: ${validationErrors.join(', ')}`, Toast.LONG);
                return;
            }

            setIsLoading(true)
            let payload = await postJobValue(previewValue, metaData?.categories)
            console.log('Payload to send:', JSON.stringify(payload, null, 2));

            try {
                const response = await client(token ? token : userData?.token).post("jobs", payload);
                console.log('Success Response:', response.data);
                setIsLoading(false)
                dispatch(setPostJobReducer({}))
                navigation.replace("SuccessMessageScreen")
            } catch (apiError: any) {
                setIsLoading(false)
                console.log('API Error Response:', apiError.response?.data);
                console.log('API Error Status:', apiError.response?.status);
                console.log('API Error Headers:', apiError.response?.headers);

                // Show validation error details if available
                if (apiError.response?.data?.errors) {
                    const errorDetails = Object.entries(apiError.response.data.errors)
                        .map(([field, errors]: [string, any]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
                        .join('; ');
                    Toast.show(`Validation errors: ${errorDetails}`, Toast.LONG);
                } else {
                    const errorMessage = apiError.response?.data?.message || 'Error posting job. Please try again.';
                    Toast.show(errorMessage, Toast.LONG);
                }
            }
        } catch (error: any) {
            setIsLoading(false)
            console.log('Error preparing payload:', error);
            const errorMessage = error.message || 'Error preparing job data. Please try again.';
            Toast.show(errorMessage, Toast.LONG);
        }
    }, [token, userData, previewValue, metaData, navigation, dispatch]);

    const handleEditJobPost = useCallback(() => {
        navigation.navigate('Tabs', {
            screen: 'PostJobScreen',
            params: {
                EditPostJob: "EditPostJob"
            },
        });
    }, [navigation]);
    console.log("previewValue imagesssssssssssssssssssssss", previewValue?.images)

    const renderScreenContent = useCallback(() => (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={{ paddingHorizontal: 20, gap: 10 }}>
                    {/* <AccountHeader
                    title='PAYMENT METHOD'
                    subTitle={`By ${previewValue?.paymentMethod}`}
                    titleStyle={{ fontSize: fontSize[16] }}
                    containerStyle={{ gap: 2 }}
                /> */}
                    <AccountHeader
                        title='Category'
                        subTitle={previewValue?.category}
                        titleStyle={{ fontSize: fontSize[16] }}
                        containerStyle={{ gap: 2, marginTop: -1 }}
                    />
                    <AccountHeader
                        title='JOB DESCRIPTION'
                        subTitle={previewValue?.description}
                        titleStyle={{ fontSize: fontSize[16] }}
                        containerStyle={{ gap: 2, marginTop: -1 }}
                    />
                    <LineSeparator />
                    <AccountHeader
                        title='AREA SIZE'
                        subTitle={`${previewValue?.areaSize} m²`}
                        titleStyle={{ fontSize: fontSize[16] }}
                        containerStyle={{ marginTop: -3, gap: 2 }}
                    />
                    <AccountHeader
                        title='MATERIALS'
                        subTitle={previewValue?.materials}
                        titleStyle={{ fontSize: fontSize[16] }}
                        containerStyle={{ gap: 2, marginTop: -1 }}
                    />
                    <LineSeparator />
                    <Heading
                        headingText='IMAGES'
                        style={{ fontSize: fontSize[16] }}
                        containerStyle={{ gap: 2 }}
                    />
                </View>
                <HorizontalImageList
                    images={previewValue?.images}
                />
                <View style={{ paddingHorizontal: 20, gap: 10 }}>

                    <AccountHeader
                        title='START DATE'
                        subTitle={previewValue?.startDate}
                        titleStyle={{ fontSize: fontSize[16] }}
                        containerStyle={{ gap: 2 }}
                    />
                    <AccountHeader
                        title='END DATE'
                        subTitle={previewValue?.endDate}
                        titleStyle={{ fontSize: fontSize[16] }}
                        containerStyle={{ gap: 2, marginTop: -1 }}
                    />
                    <LineSeparator />
                    <AccountHeader
                        title='LOCATION'
                        subTitle={previewValue?.location?.address}
                        titleStyle={{ fontSize: fontSize[16] }}
                        containerStyle={{ marginTop: -3, gap: 2 }}
                    />
                    <AccountHeader
                        title='LOCATION DESCRIPTION'
                        subTitle={previewValue?.locationDescp}
                        titleStyle={{ fontSize: fontSize[16] }}
                        containerStyle={{ gap: 2, marginTop: -1 }}
                    />
                    <View style={styles.mapContainer}>
                        <MapView
                            ref={mapRef}
                            provider={PROVIDER_GOOGLE}
                            style={styles.mapView}
                            initialRegion={initialRegion}
                            scrollEnabled={true}
                            zoomEnabled={true}
                            pitchEnabled={true}
                            rotateEnabled={true}
                            shouldRasterizeIOS={true}
                            showsUserLocation={true}
                            cacheEnabled={true}
                        >
                            <Marker coordinate={initialRegion} />
                        </MapView>
                    </View>
                    <AccountHeader
                        title='BUDGET'
                        subTitle={previewValue?.budget}
                        titleStyle={{ fontSize: fontSize[16] }}
                        containerStyle={{ gap: 2 }}
                    />
                    <ConfirmationButtons
                        cancelText='Discard'
                        onCancel={handleDiscard}
                        confirmText='Post Job'
                        onConfirm={handlePostJob}
                        confirmContainerStyle={{ backgroundColor: COLORS.Yellow }}
                    />
                </View>
            </View>
        </SafeAreaView>
    ), [previewValue, initialRegion, handleDiscard, handlePostJob]);

    const screenData = useMemo(() => [{ id: '1' }], []);

    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <StatusBar backgroundColor={COLORS.Navy} barStyle="light-content" />
            <AppHeader
                onMenuPress={() => { }}
                onNotificationPress={() => { }}
                showNotificationBadge={true}
                badgeCount={5}
                isProfile={false}
                isOnPreview={true}
                jobTitle='Tile installations'
                jobProviderName={`${userData?.firstName || ''} ${userData?.lastName || ''}`}
                time='2 minutes ago'
                handleEditJobPost={handleEditJobPost}
            />
            <FlatList
                data={screenData}
                keyExtractor={item => item.id}
                renderItem={() => renderScreenContent()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                maxToRenderPerBatch={1}
                windowSize={1}
                removeClippedSubviews={true}
            />
            {isLoading &&
                <VisibleLoader />
            }
            <ConfirmationModal
                visible={discardChangesModel}
                onCancel={() => setDiscardChangesModal(false)}
                Confirm={handleConfirmCancel}
                title="Discard Job"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // paddingHorizontal: 20,
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
});

export default PostJobPreviewScreen;