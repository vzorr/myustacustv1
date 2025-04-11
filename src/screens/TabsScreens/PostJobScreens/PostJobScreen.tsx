import { FlatList, LayoutAnimation, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View } from 'react-native'
import React, { useState } from 'react'
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

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface MaterialItem {
    id: string;
    name: string;
}

const PostJobScreen: React.FC<UserNavigationRootProps<"PostJobScreen">> = (props) => {
    const { route, navigation } = props
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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

    // Budget data
    const budgetData = {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        prices: [15, 20, 25, 20, 30],
        averagePrice: 20
    };

    const [region, setRegion] = useState<Region>({
        latitude: 42.0693,
        longitude: 19.5126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

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

    const renderScreenContent = () => (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Heading
                    headingText='PAYMENT METHOD'
                    style={{ fontSize: fontSize[16] }}
                />
                <View style={styles.radioMainContainer}>
                    <View style={styles.radioContainer}>
                        <TouchableOpacity>
                            <SVGIcons.radioUnSelected />
                        </TouchableOpacity>
                        <Text style={reuseableTextStyles.subTitle}>Card</Text>
                    </View>
                    <View style={styles.radioContainer}>
                        <TouchableOpacity>
                            <SVGIcons.radioSelected />
                        </TouchableOpacity>
                        <Text style={reuseableTextStyles.subTitle}>Cash</Text>
                    </View>
                </View>
                <Heading
                    headingText='JOB DETAILS'
                    style={{ fontSize: fontSize[16] }}
                />
                <View style={{ gap: 8 }}>
                    <MultilineCustomInput
                        placeholder="Write a job title..."
                        value={projectTitle}
                        onChangeText={setProjectTitle}
                        maxLength={80}
                        containerStyle={accountScreensStyles.inputFieldContainer}
                        inputStyle={accountScreensStyles.inputField}
                        characterCount={80 - projectTitle.length}
                    />
                    <MultilineCustomInput
                        placeholder="Provide a detailed job description..."
                        value={projectDescription}
                        onChangeText={setProjectDescription}
                        maxLength={600}
                        multiline
                        numberOfLines={4}
                        containerStyle={accountScreensStyles.inputFieldContainer}
                        inputStyle={accountScreensStyles.inputField}
                        characterCount={600 - projectDescription.length}
                    />
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
                    />
                    <CustomDropDown
                        data={areaType}
                        placeholder="Area Type"
                        selectedItems={selectedCategories}
                        onSelectionChange={setSelectedCategories}
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
                                        value={newMaterial}
                                        onChangeText={setNewMaterial}
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
                        iconName="plusIcon"
                    />
                )}

                <Heading
                    headingText='IMAGES'
                    style={{ fontSize: fontSize[16] }}
                />
                <CustomSelector
                    title='Upload Image'
                    iconName='uploadIcon'
                />

                {/* START DATE with Calendar */}
                <Heading
                    headingText='START DATE'
                    style={{ fontSize: fontSize[16] }}
                />
                <TouchableOpacity onPress={() => {
                    setShowStartCalendar(!showStartCalendar);
                    setShowEndCalendar(false);
                }}>
                    <CustomSelector
                        title={startDate ? formatDate(startDate) : "Select Start Date"}
                        iconName={showStartCalendar ? 'ArrowUp' : 'ArrowDown'}
                    />
                </TouchableOpacity>
                {showStartCalendar && (
                    <View style={styles.calendarContainer}>
                        <Calendar
                            current={startDate || new Date().toISOString().split('T')[0]}
                            minDate={new Date().toISOString().split('T')[0]}
                            onDayPress={(day) => {
                                setStartDate(day.dateString);
                                setShowStartCalendar(false);
                            }}
                            markedDates={{
                                [startDate]: { selected: true, selectedColor: COLORS.Yellow }
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
                                textDayHeaderFontSize: fontSize[12]
                            }}
                        />
                    </View>
                )}

                {/* END DATE with Calendar */}
                <Heading
                    headingText='END DATE'
                    style={{ fontSize: fontSize[16] }}
                />
                <TouchableOpacity onPress={() => {
                    setShowEndCalendar(!showEndCalendar);
                    setShowStartCalendar(false);
                }}>
                    <CustomSelector
                        title={endDate ? formatDate(endDate) : "Select End Date"}
                        iconName={showEndCalendar ? 'ArrowUp' : 'ArrowDown'}
                    />
                </TouchableOpacity>
                {showEndCalendar && (
                    <View style={styles.calendarContainer}>
                        <Calendar
                            current={endDate || startDate || new Date().toISOString().split('T')[0]}
                            minDate={startDate || new Date().toISOString().split('T')[0]}
                            onDayPress={(day) => {
                                setEndDate(day.dateString);
                                setShowEndCalendar(false);
                            }}
                            markedDates={{
                                [endDate]: { selected: true, selectedColor: COLORS.Yellow },
                                ...(startDate && {
                                    [startDate]: { selected: true, selectedColor: COLORS.Yellow }
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
                                textDayHeaderFontSize: fontSize[12]
                            }}
                        />
                    </View>
                )}

                <Heading
                    headingText='LOCATION'
                    style={{ fontSize: fontSize[16] }}
                />
                <View style={{ gap: 8 }}>
                    <CustomDropDown
                        data={areaType}
                        placeholder="Select Location"
                        selectedItems={selectedCategories}
                        onSelectionChange={setSelectedCategories}
                        boxStyles={accountScreensStyles.dropdownBox}
                        isMultiSelect={false}
                        isSearch={false}
                        zIndex={1000}
                        isAddLocation={true}
                        handleAddLocation={handleAddNewLocation}
                    />
                    <View>
                        <TextInput
                            style={[styles.input, { minHeight: 100 }]}
                            placeholder={"Location Description..."}
                            multiline={true}
                            placeholderTextColor={COLORS.Navy}
                            textAlignVertical={'top'}
                            textAlign="left"
                        />
                    </View>
                </View>
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
                <Heading
                    headingText='BUDGET (OPTIONAL)'
                    style={{ fontSize: fontSize[16] }}
                />
                <View style={{ gap: 8 }}>
                    <CustomDropDown
                        data={areaType}
                        placeholder="Currency"
                        selectedItems={selectedCategories}
                        onSelectionChange={setSelectedCategories}
                        boxStyles={accountScreensStyles.dropdownBox}
                        isMultiSelect={false}
                        isSearch={false}
                        zIndex={1000}
                    />
                    <View>
                        <CustomTextInput
                            placeholder="Area size m²"
                            placeholderTextColor={COLORS.Navy}
                            containerStyle={accountScreensStyles.inputFieldContainer}
                            inputStyle={accountScreensStyles.inputField}
                            value={areaSize.toString()}
                            onChangeText={(text) => setAreaSize(Number(text))}
                            keyboardType="numeric"
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
                    onConfirm={handlePreview}
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
                isProfile={true}
                userName={'Igli Faslija'}
                userLocation={'Tirana, AL'}
                imageUrl=''
            />
            <FlatList
                data={screenData}
                keyExtractor={item => item.id}
                renderItem={() => renderScreenContent()}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 100
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
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});

export default PostJobScreen;