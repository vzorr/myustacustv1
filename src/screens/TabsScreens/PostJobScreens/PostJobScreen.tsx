import { FlatList, LayoutAnimation, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View, KeyboardAvoidingView, Alert, Modal, StatusBar, Image, ScrollView } from 'react-native'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import AppHeader from '../../../components/AppHeader/AppHeader'
import Heading from '../../../components/Heading/Heading'
import { SVGIcons } from '../../../config/constants/svg'
import { reuseableTextStyles } from '../../../styles/reuseableTextStyles'
import { COLORS, FONTS, fontSize, SIZES } from '../../../config/themes/theme'
import MultilineCustomInput from '../../../components/InputField/MultiLineInput'
import accountScreensStyles from '../../../styles/accountScreensStyles'
import CustomDropDown from '../../../components/DropDown/CustomDropDown'
import CustomTextInput from '../../../components/InputField/InputBox'
import CustomSelector from '../../../components/Selector/CustomSelector'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { locationScreenStyles } from '../../../styles/locationScreenStyles'
import ConfirmationButtons from '../../../components/Buttons/ConfirmationButtons'
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal'
import { BudgetSuggestionModal } from '../../../components/BudgetGraph/BudgetGraphModal'
import { Calendar } from 'react-native-calendars'
import ImagePicker from 'react-native-image-crop-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik'
import { jobPostValidationSchema } from '../../../config/constants/errorMessage'
import ErrorText from '../../../components/ErrorText'
import { setPostJobReducer } from '../../../stores/reducer/PostJobReducer'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-simple-toast'
import VisibleLoader from '../../../components/Loader/VisibleLoader'
import CustomImagePicker from '../../../components/ImagePicker/ImagePicker'

// Define the ImagePicker result type
interface ImagePickerResult {
    path: string;
    width: number;
    height: number;
    size: number;
    mime: string;
    [key: string]: any;
}

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface MaterialItem {
    id: string;
    name: string;
}

interface ImageItem {
    id: string;
    path: string;
}

const PostJobScreen: React.FC<UserNavigationRootProps<"PostJobScreen">> = (props) => {
    const { postJob }: any = useSelector((state: any) => state?.postJob)
    const { route, navigation } = props
    const EditPostJob = route?.params?.EditPostJob
    const [selectedCategories, setSelectedCategories] = useState<string[]>(postJob?.category || []);
    const [selectedArea, setSelectedArea] = useState<string[]>(postJob?.areaType || []);
    const [selectLocation, setSelectLocation] = useState<any>(postJob?.location || []);
    const [selectedBudget, setSelectedBudget] = useState<string[]>(postJob?.budgetDesc || []);
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showMaterialInput, setShowMaterialInput] = useState<boolean>(false);
    const [newMaterial, setNewMaterial] = useState<string>("");
    const [categoryError, setCategoryError] = useState<string>("");
    const [areaError, setAreaError] = useState<string>("");
    const [locationError, setLocationError] = useState<string>("");
    const [budgetError, setBudgetError] = useState<string>("");
    const [discardChangesModel, setDiscardChangesModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [materials, setMaterials] = useState<MaterialItem[]>(
        postJob?.materials ?
            postJob.materials.split(',').map((mat: string, index: number) => ({
                id: `material-${index}-${Date.now()}`,
                name: mat.trim()
            })) :
            []
    );
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [materialToDelete, setMaterialToDelete] = useState<string | null>(null);
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const [areaSize, setAreaSize] = useState(35);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const { metaData }: any = useSelector((state: any) => state?.metaData)
    const { userData }: any = useSelector((state: any) => state?.userInfo)
    const { userProfile }: any = useSelector((state: any) => state?.userProfile)
    console.log("userProfile", userProfile)

    const dispatch = useDispatch()

    const [region, setRegion] = useState<Region>({
        latitude: postJob?.location[0]?.latitude ?  postJob?.location[0]?.latitude : 42.0693,
        longitude: postJob?.location[0]?.longitude ? postJob?.location[0]?.longitude:   19.5126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    // Use a memoized initialRegion to prevent unnecessary re-renders
    const initialRegion = React.useMemo(() => ({
        latitude: region.latitude,
        longitude: region?.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    }), [region]);

    const [isLoading, setIsLoading] = useState(false)
    const mapRef = useRef<MapView>(null);

    // Budget data
    const budgetData = {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        prices: [15, 20, 25, 20, 30],
        averagePrice: 20
    };

    const categories = metaData?.categories?.map((name: any, index: any) => ({
        key: name?.key,
        value: name.name
    }));
    const UKLocations = userProfile?.locations
    // [
    //     { key: '1', value: 'London' },
    //     { key: '2', value: 'Manchester' },
    //     { key: '3', value: 'Birmingham' },
    //     { key: '4', value: 'Liverpool' },
    //     { key: '5', value: 'Edinburgh' },
    //     { key: '6', value: 'Glasgow' },
    //     { key: '7', value: 'Bristol' },
    //     { key: '8', value: 'Leeds' },
    //     { key: '9', value: 'Cardiff' },
    //     { key: '10', value: 'Belfast' },
    // ]
    const areaType = [
        { key: '1', value: 'Room' },
        { key: '2', value: 'Bathroom' },
        { key: '3', value: 'comdor' },
        { key: '4', value: 'kitchen' },
        { key: '5', value: 'outdoor space' },
        { key: '6', value: 'Custom' },
    ];
    const currency = [
        { key: '1', value: 'Albanian Lek' },
        { key: '2', value: 'Euro' },
        { key: '3', value: 'USD' },
    ];

    // Format date for display
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Select Date';
        const date = new Date(dateString);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    const handleAddMaterials = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowAddForm(true);
        setShowMaterialInput(true);
    };

    const handleCancelMaterial = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowAddForm(false);
        setShowMaterialInput(false);
        setNewMaterial("");
    };

    const handleDeleteMaterial = useCallback((id: string) => {
        setMaterialToDelete(id);
        setShowDeleteModal(true);
    }, []);

    const handleConfirmDelete = useCallback(() => {
        if (materialToDelete) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setMaterials(prevMaterials => prevMaterials.filter(item => item.id !== materialToDelete));
            setShowDeleteModal(false);
            setMaterialToDelete(null);
        }
    }, [materialToDelete]);

    const handleAddNewLocation = () => {
        navigation.navigate("LocationScreen", { screenName: "postJob" })
    }

    const handleCancel = () => {
        setDiscardChangesModal(true)
    }
    const handleConfirmCancel = () => {
        dispatch(setPostJobReducer({}))
        navigation.navigate('Tabs')
    }

    const onSubmit = async (values: any) => {
        if (selectedCategories?.length === 0) {
            setCategoryError("please select category")
            return
        } else if (selectedArea?.length === 0) {
            setAreaError("please select Area type")
            return
        } else if (selectedBudget?.length === 0) {
            setBudgetError("please select Budget")
            return
        } else if (selectLocation?.length === 0) {
            setLocationError("please select location")
            return
        }
        const materialsString = materials.map(item => item.name).join(', ');
        let updateValue = {
            ...values,
            materials: materialsString,
            location: {
                address: values?.locationDescp,
                latitude: region.latitude,
                longitude: region.longitude
            },
            budget: values?.budgetDesc,
            locationDescp: selectLocation,
            budgetDesc: selectedBudget,
            areaType: selectedArea,
            category: selectedCategories,
            dateCreated: new Date().toISOString()
        }

        dispatch(setPostJobReducer(updateValue))
        navigation.navigate("PostJobPreview")
        setCategoryError('')
        setAreaError('')
        setLocationError('')
        setBudgetError('')
        return true
    }
    useEffect(() => {
        setCategoryError("")
        setBudgetError("")
        setAreaError("")
        setLocationError("")
    }, [selectedCategories, selectedArea, selectedBudget, selectLocation])
    // useEffect(() => {
    //     if (
    //         mapRef.current &&
    //         selectLocation.length > 0 &&
    //         selectLocation[0]?.latitude &&
    //         selectLocation[0]?.longitude
    //     ) {
    //         const lat = Number(selectLocation[0]?.latitude);
    //         const lng = Number(selectLocation[0]?.longitude);

    //         if (!isNaN(lat) && !isNaN(lng)) {
    //             mapRef.current.animateToRegion({
    //                 latitude: lat,
    //                 longitude: lng,
    //                 latitudeDelta: 0.05,
    //                 longitudeDelta: 0.05,
    //             }, 1000);
    //         } else {
    //             console.warn("Invalid lat/lng:", lat, lng);
    //         }
    //     }
    // }, [selectLocation]);
    const handleRegion = () => {
        try {
            // setRegion({
            //     latitude: selectLocation[0]?.latitude,
            //     longitude: selectLocation[0]?.longitude,
            //     latitudeDelta: 0.05,
            //     longitudeDelta: 0.05,
            // })
        } catch (error) {
            console.log("errrroooooo", error)

        }

    }
    const RenderScreenContent = (props: any) => {
        const { handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue } = props
        const pickImageFromGallery = () => {
            ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                compressImageQuality: 0.8,
                multiple: true,
                maxFiles: 5,
            })
                .then((selectedImages) => {
                    setFieldValue("images", [...selectedImages, ...values?.images]);
                })
                .catch((error) => {
                    if (error.code !== 'E_PICKER_CANCELLED') {
                        Alert.alert('Error', 'Failed to pick image from gallery');
                    }
                });
        };

        const takePhotoWithCamera = () => {
            ImagePicker.openCamera({
                width: 300,
                height: 300,
                cropping: true,
                compressImageQuality: 0.8,
            })
                .then((image: any) => {
                    const newImages = [image];
                    setFieldValue("images", [...newImages, ...values?.images]);
                })
                .catch((error) => {
                    console.log("errorroooo", error)
                    if (error.code !== 'E_PICKER_CANCELLED') {
                        Alert.alert('Error', 'Failed to take photo');
                    }
                });
        };
        const handleConfirmAdd = useCallback(() => {
            if (values?.materials.trim()) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setMaterials(prevMaterials => [...prevMaterials, { id: `material-${Date.now()}`, name: values?.materials.trim() }]);
                setNewMaterial("");
                setShowMaterialInput(false);
            }
        }, [values?.materials]);

        const handleImageUpload = () => {
            setShowImageModal(true);
        };
        const handleCancelModal = () => {
            setShowImageModal(false);
        };

        const handleSelectImage = (index: number) => {
            setSelectedIndex(index); // only update selected index manually
        };
        const handleMapReady = () => {
            if (selectLocation.length > 0 && mapRef.current) {
                mapRef.current.animateToRegion({
                    latitude: selectLocation[0]?.latitude,
                    longitude: selectLocation[0]?.latitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        };
        const handleDeleteImage = (indexToDelete: number) => {
            if (!Array.isArray(values.images)) return;

            const updatedImages = values.images?.filter((_: { path: string }, idx: number) => idx !== indexToDelete);
            setFieldValue('images', updatedImages);

            if (updatedImages.length > 0) {
                // If deleting first image, select the new first image (index 0)
                if (indexToDelete === 0) {
                    setSelectedIndex(0);
                }
                // If deleting last image, select the new last image
                else if (indexToDelete === values.images?.length - 1) {
                    setSelectedIndex(updatedImages.length - 1);
                }
                // If deleted image was before the selected image
                else if (indexToDelete < selectedIndex) {
                    setSelectedIndex((prev: number) => prev - 1);
                }
                // If deleted image was after selected image, selected index remains same
            } else {
                setSelectedIndex(null); // no images left
            }
        };
        const handleAddNewLocation = () => {
            const materialsString = materials.map(item => item.name).join(', ');
            let updateValue = {
                ...values,
                materials: materialsString,
                budget: values?.budgetDesc,
                locationDescp: selectLocation,
                budgetDesc: selectedBudget,
                areaType: selectedArea,
                category: selectedCategories,
                dateCreated: new Date().toISOString()
            }
    
            dispatch(setPostJobReducer(updateValue))
            navigation.navigate("LocationScreen", { screenName: "postJob" })
        }
        // const imagesCount = values?.images && Array.isArray(values.images) ? values.images.length : 0
        const imagesCount = Array.isArray(values?.images) ? values.images.length : 0;
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                enableAutomaticScroll={true}
                scrollEnabled={true}
                extraHeight={50}
                extraScrollHeight={50}
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.innerContainer}>
                        {/* <Heading
                            headingText='PAYMENT METHOD'
                            style={{ fontSize: fontSize[16] }}
                        /> */}
                        {/* <View style={styles.radioMainContainer}>
                            <View style={styles.radioContainer}>
                                <TouchableOpacity onPress={() => setFieldValue('paymentMethod', 'card')}>
                                    {values.paymentMethod === 'card' ? (
                                        <SVGIcons.radioSelected />
                                    ) : (
                                        <SVGIcons.radioUnSelected />
                                    )}
                                </TouchableOpacity>
                                <Text style={reuseableTextStyles.subTitle}>Card</Text>
                            </View>
                            <View style={styles.radioContainer}>
                                <TouchableOpacity onPress={() => setFieldValue('paymentMethod', 'cash')}>
                                    {values.paymentMethod === 'cash' ? (
                                        <SVGIcons.radioSelected />
                                    ) : (
                                        <SVGIcons.radioUnSelected />
                                    )}
                                </TouchableOpacity>
                                <Text style={reuseableTextStyles.subTitle}>Cash</Text>
                            </View>
                        </View>
                        {errors?.paymentMethod && touched?.paymentMethod &&
                            <ErrorText
                                error={errors.paymentMethod}
                            />
                        } */}
                        <View style={{ paddingHorizontal: 20, gap: 10 }}>
                            <Heading
                                headingText='JOB DETAILS'
                                style={{ fontSize: fontSize[16] }}
                            />
                            <View style={{ gap: 8 }}>
                                <TextInput
                                    style={[styles.input, { color: COLORS.Navy }]}
                                    placeholder="Write a job title..."
                                    placeholderTextColor={COLORS.Navy}
                                    cursorColor={COLORS.Navy}
                                    // multiline
                                    numberOfLines={1}
                                    value={values?.title}
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur("title")}
                                />
                                {errors?.title && touched?.title &&
                                    <ErrorText
                                        error={errors.title}
                                    />
                                }
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Provide a detailed job description..."
                                    placeholderTextColor={COLORS.Navy}
                                    cursorColor={COLORS.Navy}
                                    value={values?.description}
                                    multiline
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur("description")}
                                />
                                {errors?.description && touched?.description &&
                                    <ErrorText
                                        error={errors.description}
                                    />
                                }
                                <CustomDropDown
                                    data={categories}
                                    placeholder="Categories"
                                    selectedItems={selectedCategories}
                                    onSelectionChange={setSelectedCategories}
                                    boxStyles={accountScreensStyles.dropdownBox}
                                    isMultiSelect={true}
                                    isSearch={false}
                                    zIndex={1000}
                                />
                                {categoryError &&
                                    <ErrorText
                                        error={categoryError}
                                    />
                                }
                            </View>
                            <Heading
                                headingText='PROJECT SPECIFICATIONS'
                                style={{ fontSize: fontSize[16] }}
                            />
                            <View style={{ gap: 8 }}>
                                <CustomTextInput
                                    placeholder="Area size m²"
                                    placeholderTextColor={COLORS.Navy}
                                    cursorColor={COLORS.Navy}
                                    containerStyle={accountScreensStyles.inputFieldContainer}
                                    inputStyle={accountScreensStyles.inputField}
                                    value={values?.areaSize}
                                    onChangeText={handleChange('areaSize')}
                                    onBlur={handleBlur("areaSize")}
                                    keyboardType='numeric'
                                />
                                {errors?.areaSize && touched?.areaSize &&
                                    <ErrorText
                                        error={errors.areaSize}
                                    />
                                }
                                <CustomDropDown
                                    data={areaType}
                                    placeholder="Area Type"
                                    selectedItems={selectedArea}
                                    onSelectionChange={setSelectedArea}
                                    boxStyles={accountScreensStyles.dropdownBox}
                                    isMultiSelect={false}
                                    isSearch={false}
                                    zIndex={1000}
                                />
                                {console.log("areaError", areaError)}
                                {areaError &&
                                    <ErrorText
                                        error={areaError}
                                    />
                                }
                            </View>

                            {/* Materials Section */}
                            {showAddForm ? (
                                <View style={styles.addExperienceContainer}>
                                    <View style={styles.addTitleContainer}>
                                        <Text style={[reuseableTextStyles.title, { fontSize: fontSize[14] }]}>Materials</Text>
                                        <TouchableOpacity onPress={handleCancelMaterial}>
                                            <SVGIcons.stateOn />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Show input and buttons only when adding new material */}
                                    {showMaterialInput && (
                                        <>
                                            <View style={{ gap: 8 }}>
                                                <CustomTextInput
                                                    placeholder='e.g Wood'
                                                    placeholderTextColor={COLORS.Navy}
                                                    cursorColor={COLORS.Navy}
                                                    containerStyle={accountScreensStyles.inputFieldContainer}
                                                    inputStyle={accountScreensStyles.inputField}
                                                    value={values?.materials}
                                                    onChangeText={handleChange('materials')}
                                                    onBlur={handleBlur("materials")}
                                                />
                                            </View>

                                            <ConfirmationButtons
                                                cancelText='Cancel'
                                                onCancel={() => {
                                                    setNewMaterial("");
                                                    setShowMaterialInput(false);
                                                }}
                                                confirmText='Add'
                                                onConfirm={handleConfirmAdd}
                                                confirmContainerStyle={{ backgroundColor: COLORS.Yellow }}
                                                containerStyle={{ gap: 12 }}
                                            />
                                        </>
                                    )}
                                    {/* List of added materials */}
                                    {materials.map((material) => (
                                        <CustomSelector
                                            key={material.id}
                                            title={material.name}
                                            iconName="deleteIcon"
                                            onPress={() => handleDeleteMaterial(material.id)}
                                        />
                                    ))}
                                    {/* Show plus button when not adding new material */}
                                    {!showMaterialInput && (
                                        <CustomSelector
                                            onPress={() => setShowMaterialInput(true)}
                                            title="Add Material"
                                            iconName="plusIcon"
                                        />
                                    )}
                                </View>
                            ) : (
                                <CustomSelector
                                    onPress={handleAddMaterials}
                                    title="Material (Optional)"
                                    iconName="StateOff"
                                />
                            )}
                            {errors?.materials && touched?.materials &&
                                <ErrorText
                                    error={errors.materials}
                                />
                            }
                            <Heading
                                headingText='IMAGES'
                                style={{ fontSize: fontSize[16] }}
                            />
                        </View>
                        {EditPostJob === "EditPostJob" ? (
                            <View style={{ gap: 8 }}>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingHorizontal: 20,
                                        gap: 8,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            borderRadius: 8,
                                            borderWidth: 1,
                                            borderColor: COLORS.inputBorder,
                                            width: 64,
                                            height: 64,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={handleImageUpload}
                                    >
                                        <SVGIcons.plusIcon />
                                    </TouchableOpacity>

                                    {Array.isArray(values?.images) && values.images.map((item: { path: string }, index: number) => (
                                        <View key={index} style={{ position: 'relative' }}>
                                            <TouchableOpacity
                                                onPress={() => handleSelectImage(index)}
                                                style={{
                                                    borderRadius: 8,
                                                    width: 64,
                                                    height: 64,
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <Image
                                                    source={{ uri: item.path }}
                                                    style={{
                                                        width: 64,
                                                        height: 64,
                                                        borderRadius: 8,
                                                        // borderWidth: index === selectedIndex ? 1.5 : 0,
                                                        // borderColor: index === selectedIndex ? COLORS.Yellow : 'transparent',
                                                    }}
                                                    resizeMode="cover"
                                                />
                                            </TouchableOpacity>

                                            {/* Show cross icon on selected image */}
                                            {index === selectedIndex && (
                                                <View
                                                    style={{
                                                        ...StyleSheet.absoluteFillObject, // cover entire image
                                                        backgroundColor: 'rgba(0,0,0,0.4)', // transparent dark layer
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: 64,
                                                        height: 64,
                                                        borderRadius: 8,
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => handleDeleteImage(index)}
                                                        style={{
                                                            position: 'absolute',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            top: '30%',
                                                            left: '32%',
                                                            width: 24,
                                                            height: 24,
                                                            backgroundColor: COLORS.white,
                                                            borderRadius: 12,
                                                        }}
                                                    >
                                                        <SVGIcons.crossIcon />
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        ) : (
                            <View style={{ paddingHorizontal: 20, marginTop: -10 }}>
                                <CustomSelector
                                    title={imagesCount > 0 ? `${imagesCount} Images Selected` : 'Upload Image'}
                                    iconName="uploadIcon"
                                    onPress={handleImageUpload}
                                />
                            </View>
                        )}
                        <View style={{ paddingHorizontal: 20, gap: 10 }}>
                            <CustomImagePicker
                                onTakePhoto={takePhotoWithCamera}
                                onPickFromGallery={pickImageFromGallery}
                                handleCancel={handleCancelModal}
                                showImageModal={showImageModal}
                                setShowImageModal={setShowImageModal}
                            // imagesCount={values?.images && Array.isArray(values.images) ? values.images.length : 0}
                            />
                            {/* START DATE with Calendar */}
                            <Heading
                                headingText='START DATE'
                                style={{ fontSize: fontSize[16] }}
                            />
                            <CustomSelector
                                onPress={() => {
                                    setShowStartCalendar(!showStartCalendar);
                                    setShowEndCalendar(false);
                                }}
                                title={values?.startDate ? formatDate(values?.startDate) : "Select Start Date"}
                                iconName={showStartCalendar ? 'ArrowUp' : 'ArrowDown'}
                            />
                            {showStartCalendar && (
                                <View style={styles.calendarContainer}>
                                    <Calendar
                                        current={values?.startDate || new Date().toISOString().split('T')[0]}
                                        minDate={new Date().toISOString().split('T')[0]}
                                        onDayPress={(day) => {
                                            setFieldValue("startDate", day.dateString);
                                            setShowStartCalendar(false);
                                        }}
                                        markedDates={{
                                            [values?.startDate]: { selected: true, selectedColor: COLORS.Navy }
                                        }}
                                        theme={{
                                            calendarBackground: COLORS.white,
                                            textSectionTitleColor: COLORS.Navy,
                                            selectedDayBackgroundColor: COLORS.Black,
                                            selectedDayTextColor: COLORS.white,
                                            todayTextColor: COLORS.Navy,
                                            dayTextColor: COLORS.Navy,
                                            textDisabledColor: COLORS.grey,
                                            arrowColor: COLORS.Navy,
                                            monthTextColor: COLORS.Black,
                                            textDayFontFamily: FONTS.interRegular,
                                            textMonthFontFamily: FONTS.interBold,
                                            textDayHeaderFontFamily: FONTS.interRegular,
                                            textDayFontSize: fontSize[14],
                                            textMonthFontSize: fontSize[16],
                                            textDayHeaderFontSize: fontSize[12],
                                        }}
                                        style={styles.calendar}
                                        headerStyle={{
                                            backgroundColor: COLORS.white,
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                            paddingHorizontal: 10,
                                            paddingVertical: 5,
                                        }}
                                        renderHeader={(date) => (
                                            <View style={styles.calendarHeader}>
                                                <Text style={styles.calendarHeaderText}>
                                                    {date.toString('MMMM yyyy')}
                                                </Text>
                                            </View>
                                        )}
                                    />
                                </View>
                            )}
                            {errors?.startDate && touched?.startDate &&
                                <ErrorText
                                    error={errors.startDate}
                                />
                            }
                            {/* END DATE with Calendar */}
                            <Heading
                                headingText='END DATE'
                                style={{ fontSize: fontSize[16] }}
                            />
                            <CustomSelector
                                onPress={() => {
                                    setShowEndCalendar(!showEndCalendar);
                                    setShowStartCalendar(false);
                                }}
                                title={values.endDate ? formatDate(values?.endDate) : "Select End Date"}
                                iconName={showEndCalendar ? 'ArrowUp' : 'ArrowDown'}
                            />
                            {showEndCalendar && (
                                <View style={styles.calendarContainer}>
                                    <Calendar
                                        current={values.endDate || values?.startDate || new Date().toISOString().split('T')[0]}
                                        minDate={values?.startDate || new Date().toISOString().split('T')[0]}
                                        onDayPress={(day) => {
                                            setFieldValue("endDate", day.dateString);
                                            setShowEndCalendar(false);
                                        }}
                                        markedDates={{
                                            [values?.endDate]: { selected: true, selectedColor: COLORS.Navy },
                                            ...(values?.startDate && {
                                                [values?.startDate]: { selected: true, selectedColor: COLORS.Navy }
                                            })
                                        }}
                                        theme={{
                                            calendarBackground: COLORS.white,
                                            textSectionTitleColor: COLORS.Navy,
                                            selectedDayBackgroundColor: COLORS.Black,
                                            selectedDayTextColor: COLORS.white,
                                            todayTextColor: COLORS.Navy,
                                            dayTextColor: COLORS.Navy,
                                            textDisabledColor: COLORS.grey,
                                            arrowColor: COLORS.Navy,
                                            monthTextColor: COLORS.Black,
                                            textDayFontFamily: FONTS.interRegular,
                                            textMonthFontFamily: FONTS.interBold,
                                            textDayHeaderFontFamily: FONTS.interRegular,
                                            textDayFontSize: fontSize[14],
                                            textMonthFontSize: fontSize[16],
                                            textDayHeaderFontSize: fontSize[12],
                                        }}
                                        style={styles.calendar}
                                        headerStyle={{
                                            backgroundColor: COLORS.white,
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                            paddingHorizontal: 10,
                                            paddingVertical: 5,
                                        }}
                                        renderHeader={(date) => (
                                            <View style={styles.calendarHeader}>
                                                <Text style={styles.calendarHeaderText}>
                                                    {date.toString('MMMM yyyy')}
                                                </Text>
                                            </View>
                                        )}
                                    />
                                </View>
                            )}
                            {errors?.endDate && touched?.endDate &&
                                <ErrorText
                                    error={errors.endDate}
                                />
                            }
                            <Heading
                                headingText='LOCATION'
                                style={{ fontSize: fontSize[16] }}
                            />
                            <View style={{ gap: 8 }}>
                                <CustomDropDown
                                    data={UKLocations}
                                    placeholder="Select Location"
                                    selectedItems={selectLocation}
                                    onSelectionChange={setSelectLocation}
                                    boxStyles={accountScreensStyles.dropdownBox}
                                    isMultiSelect={false}
                                    isSearch={false}
                                    zIndex={1000}
                                    isAddLocation={true}
                                    handleAddLocation={handleAddNewLocation}
                                    handleRegion={handleRegion}
                                />
                                {console.log("locationError", locationError)}
                                {locationError &&
                                    <ErrorText
                                        error={locationError}
                                    />
                                }
                                <View>
                                    <TextInput
                                        style={[styles.input, { minHeight: 100, color: COLORS.Navy }]}
                                        placeholder={"Location Description..."}
                                        multiline={true}
                                        placeholderTextColor={COLORS.Navy}
                                        textAlignVertical={'top'}
                                        textAlign="left"
                                        value={values?.locationDescp}
                                        onChangeText={handleChange('locationDescp')}
                                        onBlur={handleBlur("locationDescp")}
                                    />
                                </View>
                                {errors?.locationDescp && touched?.locationDescp &&
                                    <ErrorText
                                        error={errors.locationDescp}
                                    />
                                }
                            </View>
                            <View>
                                <Text style={reuseableTextStyles.subTitle}>Place the marker in the exact location</Text>
                            </View>
                            <View style={styles.mapContainer}>
                                {region?.latitude && region?.longitude && !isNaN(region.latitude) && !isNaN(region.longitude) && (
                                    <MapView
                                        ref={mapRef}
                                        provider={PROVIDER_GOOGLE}
                                        style={styles.mapView}
                                        region={region}
                                        loadingEnabled
                                        zoomControlEnabled
                                        onMapReady={handleMapReady}
                                    >
                                        <Marker coordinate={region} />
                                    </MapView>
                                )}
                            </View>
                            <Heading
                                headingText='BUDGET'
                                style={{ fontSize: fontSize[16] }}
                            />
                            <View style={styles.budgetContainer}>
                                <CustomDropDown
                                    data={currency}
                                    placeholder="Currency"
                                    selectedItems={selectedBudget}
                                    onSelectionChange={setSelectedBudget}
                                    boxStyles={accountScreensStyles.dropdownBox}
                                    isMultiSelect={false}
                                    isSearch={false}
                                    zIndex={1000}
                                />
                                {budgetError &&
                                    <ErrorText
                                        error={budgetError}
                                    />
                                }
                                <View style={styles.budgetInputContainer}>
                                    <CustomTextInput
                                        placeholder="Budget Lek..."
                                        placeholderTextColor={COLORS.Navy}
                                        containerStyle={[accountScreensStyles.inputFieldContainer, styles.budgetInput]}
                                        inputStyle={accountScreensStyles.inputField}
                                        value={values?.budgetDesc}
                                        onChangeText={handleChange('budgetDesc')}
                                        onBlur={handleBlur("budgetDesc")}
                                        keyboardType='numeric'
                                    />
                                    <TouchableOpacity
                                        style={styles.NIPTContainer}
                                        onPress={() => setShowBudgetModal(true)}
                                    >
                                        <SVGIcons.infoNIPTIcon />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <ConfirmationButtons
                                cancelText='Cancel'
                                onCancel={handleCancel}
                                confirmText='Review Details'
                                onConfirm={handleSubmit}
                                // onConfirm={handlePreview}
                                confirmContainerStyle={{ backgroundColor: COLORS.Yellow }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        )
    }

    const screenData = [{ id: '1' }];
    // 2025-04-15
    return (
        <Formik
            initialValues={{
                title: postJob?.title ? postJob?.title : "",
                description: postJob?.description ? postJob?.description : "",
                paymentMethod: postJob?.paymentMethod ? postJob?.paymentMethod : "",
                category: postJob?.category ? postJob?.category : "",
                areaSize: postJob?.areaSize ? postJob?.areaSize : "",
                areaType: postJob?.areaType ? postJob?.areaType : "",
                startDate: postJob?.startDate ? postJob?.startDate : "",
                endDate: postJob?.endDate ? postJob?.endDate : "",
                materials: postJob?.materials ? postJob?.materials : "",
                location: postJob?.location?.address ? postJob?.location?.address : "",
                budget: postJob?.budget ? postJob?.budget : 0,
                // images: postJob?.images ? postJob?.images : "",
                images: postJob?.images ? (Array.isArray(postJob.images) ? postJob.images : [postJob.images]) : [],
                locationDescp: postJob?.location?.address ? postJob?.location?.address : "",
                budgetDesc: postJob?.budget ? postJob?.budget : 0,
                dateCreated: '',
            }}
            onSubmit={async (values: any, { resetForm }) => {
                setIsLoading(true)
                let res: any = await onSubmit(values)
                setIsLoading(false)
                if (res) {
                    resetForm({ values: "" })
                }
            }}
            validationSchema={jobPostValidationSchema}
            enableReinitialize={true}
        >
            {(formikProps) => (
                <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
                    <StatusBar backgroundColor={COLORS.Navy} barStyle="light-content" />
                    <AppHeader
                        onMenuPress={() => { }}
                        onNotificationPress={() => { }}
                        showNotificationBadge={true}
                        badgeCount={0}
                        isProfile={true}
                        userName={`${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`}
                        userLocation={`${userProfile?.locations[0]?.address}`}
                        imageUrl={userProfile?.profilePicture}
                    />
                    <FlatList
                        data={screenData}
                        keyExtractor={item => item.id}
                        renderItem={() => <RenderScreenContent {...formikProps} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        maxToRenderPerBatch={1}
                        windowSize={1}
                        removeClippedSubviews={true}
                    />
                    <ConfirmationModal
                        visible={showDeleteModal}
                        onCancel={() => setShowDeleteModal(false)}
                        Confirm={handleConfirmDelete}
                    />
                    <ConfirmationModal
                        visible={discardChangesModel}
                        onCancel={() => setDiscardChangesModal(false)}
                        Confirm={handleConfirmCancel}
                    />
                    <BudgetSuggestionModal
                        visible={showBudgetModal}
                        onClose={() => setShowBudgetModal(false)}
                        areaSize={areaSize}
                        budgetData={budgetData}
                    />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 150
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
    multilineInput: {
        height: 100,
        textAlign: 'left',
        textAlignVertical: 'top',
        color: COLORS.Navy
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
    calendarContainer: {
        marginTop: -10,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 16,
        overflow: 'hidden',
    },
    calendar: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        width: '100%',
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    calendarHeaderText: {
        fontSize: fontSize[16],
        fontFamily: FONTS.interBold,
        color: COLORS.Black,
        marginHorizontal: 10,
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
    budgetContainer: {
        gap: 8,
        marginBottom: 16,
    },
    budgetInputContainer: {
        position: 'relative',
    },
    budgetInput: {
        marginBottom: 0,
    },
});

export default PostJobScreen;