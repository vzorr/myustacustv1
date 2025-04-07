import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import accountScreensStyles from '../../../styles/accountScreensStyles';
import { SVGIcons } from '../../../config/constants/svg';
import { COLORS } from '../../../config/themes/theme';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import CustomSelector from '../../../components/Selector/CustomSelector';
import AccountHeader from '../../../components/AccountHeader/AccountHeader';
import CustomDropDown from '../../../components/DropDown/CustomDropDown';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';

const LocationsAndPreferences: React.FC<UserNavigationRootProps<"LocationsAndPreferences">> = (props) => {
    const { route, navigation } = props
    const selectedLocation = route?.params?.selectedLocation
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [locationToDelete, setLocationToDelete] = useState<string | null>(null);
    useEffect(() => {
        if (selectedLocation) {
            setSelectedLocations(prev => [...prev, selectedLocation]);
        }
    }, [selectedLocation]);

    const categories = [
        { key: '1', value: 'Mobiles' },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers' },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
        { key: '8', value: 'Computers' },
        { key: '9', value: 'Vegetables' },
        { key: '10', value: 'Diary Products' },
        { key: '11', value: 'Drinks' },
        { key: '12', value: 'Computers' },
        { key: '13', value: 'Vegetables' },
        { key: '14', value: 'Diary Products' },
        { key: '15', value: 'Drinks' },
        { key: '16', value: 'Vegetables' },
        { key: '17', value: 'Diary Products' },
        { key: '18', value: 'Drinks' },
        { key: '19', value: 'Computers' },
        { key: '20', value: 'Vegetables' },
        { key: '21', value: 'Diary Products' },
        { key: '22', value: 'Drinks' },
    ];

    console.log("selectedItems", selectedCategories)
    const handleAddLocation = () => {
        navigation.navigate("LocationScreen")
    }
    const handleDeleteLocation = (loc: string) => {
        setSelectedLocations(prev => prev.filter(item => item !== loc));
    };
    const handleConfirm = () => {
        if (locationToDelete) {
            handleDeleteLocation(locationToDelete);
            setLocationToDelete(null);
        }
        setShowDeleteModal(false);
    }
    const handleBack = () => {
        navigation.goBack()
    }
    const handleForward = () => {
        if (selectedLocation) {
            navigation.navigate("NotificationPreferences")
            return
        }
        Alert.alert("First select the category")
    }

    return (
        <SafeAreaView style={accountScreensStyles.container}>
            <View style={{ gap: 24 }}>
                <AccountHeader
                    title="Locations & Preferences"
                    subTitle="Tell us where you’re located and what types of services you’re interested in."
                />
                <View style={{ gap: 8 }}>
                    {selectedLocations.map((location, index) => (
                        <CustomSelector
                            key={index}
                            onPress={() => {
                                setLocationToDelete(location);
                                setShowDeleteModal(true);
                            }}
                            title={location}
                            iconName="deleteIcon"
                        />
                    ))}
                    <CustomSelector
                        onPress={handleAddLocation}
                        title="Add Location"
                        iconName="plusIcon"
                    />
                    <CustomDropDown
                        data={categories}
                        placeholder="Categories"
                        selectedItems={selectedCategories}
                        onSelectionChange={setSelectedCategories}
                        boxStyles={accountScreensStyles.dropdownBox}
                    />
                </View>
            </View>

            <View style={{ gap: 16 }}>
                <View style={accountScreensStyles.leftRightButtonContainer}>
                    <TouchableOpacity onPress={handleBack}>
                        <SVGIcons.filledLeftButton />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleForward}>
                        {selectedLocation ?
                            <SVGIcons.filledRightButton /> :
                            <SVGIcons.unFilledRightButton />
                        }
                    </TouchableOpacity>
                </View>

                <View style={accountScreensStyles.StatusBarContainer}>
                    <ProgressBar backgroundColor={COLORS.Yellow} />
                    <ProgressBar backgroundColor={COLORS.Yellow} />
                    <ProgressBar backgroundColor={COLORS.statusBarColor} />
                </View>
            </View>
            <ConfirmationModal
                visible={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                Confirm={handleConfirm}
            />

        </SafeAreaView>
    );
};

export default LocationsAndPreferences;