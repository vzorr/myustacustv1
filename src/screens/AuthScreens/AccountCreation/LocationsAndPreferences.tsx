import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import ErrorText from '../../../components/ErrorText';
import { setAccountCreation } from '../../../stores/reducer/AccountCreationReducer';

const LocationsAndPreferences: React.FC<UserNavigationRootProps<"LocationsAndPreferences">> = (props) => {
    const { route, navigation } = props
    const selectedLocation = route?.params?.selectedLocation
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [locationToDelete, setLocationToDelete] = useState<string | null>(null);
    const [locationDelIndex, setLocationDelIndex] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<any>({ categoryErr: "", locationErr: '' });
    const dispatch = useDispatch()

    const { accountCreation } = useSelector((state: any) => state?.accountCreation)
    console.log("accountCreation", accountCreation)
    // useEffect(() => {
    //     if (selectedLocation) {
    //         setSelectedLocations(prev => [...prev, selectedLocation]);
    //     }
    // }, [selectedLocation]);

    const categories = [
        { key: '1', value: 'Plumber' },
        { key: '2', value: 'Electrcian' },
        { key: '3', value: 'Woodworker' },
        { key: '4', value: 'Mason' },
        { key: '5', value: 'Tiler' },
        { key: '6', value: 'Decorator' },
    ];

    const handleAddLocation = () => {
        navigation.navigate("LocationScreen")
    }
    const handleDeleteLocation = () => {
        setSelectedLocations(prev => prev.filter((item, index) => index !== locationDelIndex));
    };
    const handleConfirm = () => {
        if (accountCreation.location) {
            const updatedUserData = {
                ...accountCreation,
                location: accountCreation.location.filter((item: any, index: any) => index !== locationDelIndex)
            };
            dispatch(setAccountCreation(updatedUserData))
            setShowDeleteModal(false);
        }
    }
    const handleBack = () => {
        navigation.goBack()
    }
    const handleForward = () => {
        if (accountCreation.location?.length === 0) {
            setErrorMessage({ locationErr: "First select the location", categoryErr: "" })
            return
        } else if (selectedCategories?.length === 0) {
            setErrorMessage({ categoryErr: "First select the category", locationErr: '' })
            return
        } else {
            const updatedUserData = {
                ...accountCreation,
                category: selectedCategories
            };
            dispatch(setAccountCreation(updatedUserData))
            navigation.navigate("NotificationPreferences")

        }
    }

    return (
        <SafeAreaView style={accountScreensStyles.container}>
            <View style={{ gap: 24 }}
            >
                <AccountHeader
                    title="Locations & Preferences"
                    subTitle="Tell us where you’re located and what types of services you’re interested in."
                />
                <View style={{ gap: 8 }}>
                    {accountCreation.location?.map((location: any, index: any) => (
                        <CustomSelector
                            key={index}
                            onPress={() => {
                                setLocationDelIndex(index);
                                setShowDeleteModal(true);
                            }}
                            title={location?.address}
                            iconName="deleteIcon"
                        />
                    ))}
                    <CustomSelector
                        onPress={handleAddLocation}
                        title="Add Location"
                        iconName="plusIcon"
                    />
                    {errorMessage?.locationErr &&
                        <ErrorText
                            error={errorMessage?.locationErr}
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
                    {errorMessage?.categoryErr &&
                        <ErrorText
                            error={errorMessage?.categoryErr}
                        />
                    }
                </View>
            </View>

            <View style={{ gap: 16 }}>
                <View style={accountScreensStyles.leftRightButtonContainer}>
                    <TouchableOpacity onPress={handleBack}>
                        <SVGIcons.filledLeftButton />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleForward}>
                        {selectedLocation || selectedCategories ?
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