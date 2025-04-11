import { FlatList, LayoutAnimation, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View, KeyboardAvoidingView, Alert, Modal } from 'react-native'
import React, { useState, useRef } from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import AppHeader from '../../../components/AppHeader/AppHeader'
import Heading from '../../../components/Heading/Heading'
import { SVGIcons } from '../../../config/constants/svg'
import { reuseableTextStyles } from '../../../styles/reuseableTextStyles'
import { COLORS, FONTS, fontSize } from '../../../config/themes/theme'
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
    const [selectedCategories, setSelectedCategories] = useState<string[]>(postJob?.category || [] );
    const [selectedArea, setSelectedArea] = useState<string[]>(postJob?.areaType || []);
    const [selectLocation, setSelectLocation] = useState<string[]>(postJob?.locationDescp || []);
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
    const [materials, setMaterials] = useState<MaterialItem[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [materialToDelete, setMaterialToDelete] = useState<string | null>(null);
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const [areaSize, setAreaSize] = useState(35);
    const [budget, setBudget] = useState("Budget Lek...");
    const [images, setImages] = useState<ImageItem[]>([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | null>(null);

    const dispatch = useDispatch()
    const [region, setRegion] = useState<Region>({
        latitude: 42.0693,
        longitude: 19.5126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const [isLoading, setIsLoading] = useState(false)
    const mapRef = useRef<MapView>(null);

    // Budget data
    const budgetData = {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        prices: [15, 20, 25, 20, 30],
        averagePrice: 20
    };



    const categories = [
        { key: '1', value: 'Plumber' },
        { key: '2', value: 'Electrician' },
        { key: '3', value: 'Woodworker' },
        { key: '4', value: 'Mason' },
        { key: '5', value: 'Tiler' },
        { key: '6', value: 'Decorator' },
    ];

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

    const handleConfirmAdd = () => {
        if (newMaterial.trim()) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setMaterials([...materials, { id: Date.now().toString(), name: newMaterial }]);
            setNewMaterial("");
            setShowMaterialInput(false);
        }
    };

    const handleDeleteMaterial = (id: string) => {
        setMaterialToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (materialToDelete) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setMaterials(materials.filter(item => item.id !== materialToDelete));
            setShowDeleteModal(false);
            setMaterialToDelete(null);
        }
    };

    const handleAddNewLocation = () => {
        navigation.navigate("LocationScreen")
    }

    const handlePreview = () => {
        navigation.navigate("PostJobPreview")
    }

    const handleCancel = () => {
        // navigation.navigate("PostJobPreview")
    }

    // Image picker functions
    // const pickImageFromGallery = () => {
    //     ImagePicker.openPicker({
    //         width: 300,
    //         height: 300,
    //         cropping: true,
    //         compressImageQuality: 0.8,
    //         multiple: true,
    //         maxFiles: 5,
    //     })
    //         .then((selectedImages: ImagePickerResult | ImagePickerResult[]) => {
    //             const newImages = Array.isArray(selectedImages)
    //                 ? selectedImages.map(img => ({
    //                     id: Date.now().toString() + Math.random().toString(),
    //                     path: img.path
    //                 }))
    //                 : [{ id: Date.now().toString(), path: selectedImages.path }];

    //             setImages([...images, ...newImages]);
    //             setShowImageModal(false);
    //         })
    //         .catch((error) => {
    //             if (error.code !== 'E_PICKER_CANCELLED') {
    //                 Alert.alert('Error', 'Failed to pick image from gallery');
    //             }
    //         });
    // };

    // const takePhotoWithCamera = () => {
    //     ImagePicker.openCamera({
    //         width: 300,
    //         height: 300,
    //         cropping: true,
    //         compressImageQuality: 0.8,
    //     })
    //         .then((image: ImagePickerResult) => {
    //             setImages([...images, { id: Date.now().toString(), path: image.path }]);
    //             setShowImageModal(false);
    //         })
    //         .catch((error) => {
    //             if (error.code !== 'E_PICKER_CANCELLED') {
    //                 Alert.alert('Error', 'Failed to take photo');
    //             }
    //         });
    // };

    const handleImageUpload = () => {
        setShowImageModal(true);
    };

    // Payment method toggle
    // const togglePaymentMethod = (method: 'card' | 'cash') => {
    //     if (paymentMethod === method) {
    //         setPaymentMethod(null);
    //     } else {
    //         setPaymentMethod(method);
    //     }
    // };
    const onSubmit = async (values: any) => {
        let updateValue = {
            ...values,
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
        }
        dispatch(setPostJobReducer(updateValue))
        navigation.navigate("PostJobPreview")
        return true

    }
    console.log("selectedArea", selectedArea)
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
                    // setImages([...images, ...newImages]);
                    setShowImageModal(false);
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
                    setFieldValue("images", [...image, ...values?.images]);
                    setShowImageModal(false);
                })
                .catch((error) => {
                    if (error.code !== 'E_PICKER_CANCELLED') {
                        Alert.alert('Error', 'Failed to take photo');
                    }
                });
        };

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
                        <Heading
                            headingText='PAYMENT METHOD'
                            style={{ fontSize: fontSize[16] }}
                        />
                        <View style={styles.radioMainContainer}>
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
                        }
                        <Heading
                            headingText='JOB DETAILS'
                            style={{ fontSize: fontSize[16] }}
                        />
                        <View style={{ gap: 8 }}>
                            <MultilineCustomInput
                                placeholder="Write a job title..."
                                maxLength={80}
                                containerStyle={accountScreensStyles.inputFieldContainer}
                                inputStyle={accountScreensStyles.inputField}
                                characterCount={80 - values?.title.length}
                                value={values?.title}
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur("title")}
                            />
                            {errors?.title && touched?.title &&
                                <ErrorText
                                    error={errors.title}
                                />
                            }
                            <MultilineCustomInput
                                placeholder="Provide a detailed job description..."
                                maxLength={600}
                                multiline
                                numberOfLines={4}
                                containerStyle={accountScreensStyles.inputFieldContainer}
                                inputStyle={accountScreensStyles.inputField}
                                characterCount={600 - values?.description.length}
                                value={values?.description}
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
                                isMultiSelect
                                isSearch={false}
                                zIndex={1000}
                            />
                        </View>
                        <Heading
                            headingText='PROJECT SPECIFICATIONS'
                            style={{ fontSize: fontSize[16] }}
                        />
                        <View style={{ gap: 8 }}>
                            <CustomTextInput
                                placeholder="Area size m²"
                                placeholderTextColor={COLORS.Navy}
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
                        </View>

                        {/* Materials Section */}
                        {showAddForm ? (
                            <View style={styles.addExperienceContainer}>
                                <View style={styles.addTitleContainer}>
                                    <Text style={[reuseableTextStyles.title, { fontSize: fontSize[14] }]}>Materials</Text>
                                    <TouchableOpacity onPress={handleCancelMaterial}>
                                        <SVGIcons.crossIcon />
                                    </TouchableOpacity>
                                </View>

                                {/* Show input and buttons only when adding new material */}
                                {showMaterialInput && (
                                    <>
                                        <View style={{ gap: 8 }}>
                                            <CustomTextInput
                                                placeholder='e.g Wood'
                                                placeholderTextColor={COLORS.Navy}
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
                                {errors?.materials && touched?.materials &&
                                    <ErrorText
                                        error={errors.materials}
                                    />
                                }
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
                                iconName="plusIcon"
                            />
                        )}

                        <Heading
                            headingText='IMAGES'
                            style={{ fontSize: fontSize[16] }}
                        />
                        <CustomSelector
                            title={images.length > 0 ? `${images.length} Images Selected` : 'Upload Image'}
                            iconName='uploadIcon'
                            onPress={handleImageUpload}
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
                                        [values?.startDate]: { selected: true, selectedColor: COLORS.Yellow }
                                    }}
                                    theme={{
                                        calendarBackground: COLORS.white,
                                        textSectionTitleColor: COLORS.Black,
                                        selectedDayBackgroundColor: COLORS.Yellow,
                                        selectedDayTextColor: COLORS.white,
                                        todayTextColor: COLORS.Yellow,
                                        dayTextColor: COLORS.Black,
                                        textDisabledColor: COLORS.grey,
                                        arrowColor: COLORS.Yellow,
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
                                        [values?.endDate]: { selected: true, selectedColor: COLORS.Yellow },
                                        ...(values?.startDate && {
                                            [values?.startDate]: { selected: true, selectedColor: COLORS.Yellow }
                                        })
                                    }}
                                    theme={{
                                        calendarBackground: COLORS.white,
                                        textSectionTitleColor: COLORS.Black,
                                        selectedDayBackgroundColor: COLORS.Yellow,
                                        selectedDayTextColor: COLORS.white,
                                        todayTextColor: COLORS.Yellow,
                                        dayTextColor: COLORS.Black,
                                        textDisabledColor: COLORS.grey,
                                        arrowColor: COLORS.Yellow,
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
                                data={areaType}
                                placeholder="Select Location"
                                selectedItems={selectLocation}
                                onSelectionChange={setSelectLocation}
                                boxStyles={accountScreensStyles.dropdownBox}
                                isMultiSelect={false}
                                isSearch={false}
                                zIndex={1000}
                                isAddLocation={true}
                                handleAddLocation={handleAddNewLocation}
                            />
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
                        <View style={{ gap: 8 }}>
                            <Text style={reuseableTextStyles.subTitle}>Place the marker in the exact location</Text>
                            <View style={styles.mapContainer}>
                                <MapView
                                    // ref={mapRef}
                                    provider={PROVIDER_GOOGLE}
                                    style={styles.mapView}
                                    region={region}
                                // onRegionChangeComplete={}
                                // scrollEnabled={true}
                                // zoomEnabled={true}
                                // pitchEnabled={true}
                                // rotateEnabled={true}
                                >
                                    <Marker coordinate={region} />
                                </MapView>
                            </View>
                        </View>
                        <Heading
                            headingText='BUDGET (OPTIONAL)'
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
                </SafeAreaView>
                <Modal
                    visible={showImageModal}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setShowImageModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Upload Image</Text>
                            <TouchableOpacity style={styles.modalOption} onPress={takePhotoWithCamera}>
                                <Text style={styles.modalOptionText}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOption} onPress={pickImageFromGallery}>
                                <Text style={styles.modalOptionText}>Choose from Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalCancel}
                                onPress={() => setShowImageModal(false)}
                            >
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
                images: postJob?.images ? postJob?.images : "",
                locationDescp: postJob?.location?.address ? postJob?.location?.address : "",
                budgetDesc: postJob?.budget ? postJob?.budget : 0
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
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
                    <AppHeader
                        onMenuPress={() => { }}
                        onNotificationPress={() => { }}
                        showNotificationBadge={true}
                        badgeCount={5}
                        isProfile={true}
                        userName={'Igli Faslija'}
                        userLocation={'Tirana, AL'}
                        imageUrl=''
                    />
                    <FlatList
                        data={screenData}
                        keyExtractor={item => item.id}
                        renderItem={() => <RenderScreenContent
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            handleSubmit={handleSubmit}
                            values={values}
                            errors={errors}
                            touched={touched}
                            setFieldValue={setFieldValue}
                        />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                    <ConfirmationModal
                        visible={showDeleteModal}
                        onCancel={() => setShowDeleteModal(false)}
                        Confirm={handleConfirmDelete}
                    />
                    <BudgetSuggestionModal
                        visible={showBudgetModal}
                        onClose={() => setShowBudgetModal(false)}
                        areaSize={areaSize}
                        budgetData={budgetData}
                    />

                    {/* Image Upload Modal */}

                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
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
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        padding: 10,
        elevation: 4,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalTitle: {
        fontSize: fontSize[16],
        fontFamily: FONTS.interBold,
        color: COLORS.Black,
        marginBottom: 15,
        textAlign: 'center',
    },
    modalOption: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder,
    },
    modalOptionText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        color: COLORS.Black,
        textAlign: 'center',
    },
    modalCancel: {
        marginTop: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.Yellow,
        borderRadius: 8,
    },
    modalCancelText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interBold,
        color: COLORS.white,
        textAlign: 'center',
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