import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import accountScreensStyles from '../../../styles/accountScreensStyles';
import { SVGIcons } from '../../../config/constants/svg';
import { COLORS, SIZES } from '../../../config/themes/theme';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import CustomSelector from '../../../components/Selector/CustomSelector';
import AccountHeader from '../../../components/AccountHeader/AccountHeader';
import CustomDropDown from '../../../components/DropDown/CustomDropDown';
import CustomButton from '../../../components/Buttons/CustomButton';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { ClientFormData } from '../../../apiManager/Client';
const NotificationPreferences: React.FC<UserNavigationRootProps<"NotificationPreferences">> = (props) => {
    const { route, navigation } = props
    const isTermsAndConditionsAccepted = route?.params?.isTermsAndConditionsAccepted
    const [selectedNotiiType, setSelectedNotiType] = useState<string[]>([]);
    const [notificationViaEmail, setNotificationViaEmail] = useState(false);
    const [notificationViaSMS, setNotificationViaSMS] = useState(false);
    const [notificationViaApp, setNotificationViaApp] = useState(false);

    const { accountCreation }: any = useSelector((state: any) => state?.accountCreation)
    const notiiType = [
        { key: '1', value: 'App' },
        { key: '2', value: 'Email' },
        { key: '3', value: 'SMS' },
    ];

    const handleTermAndCondition = () => {
        navigation.navigate("TermsAndConditions")
    }

    const handleBack = () => {
        navigation.goBack()
    }
    const handleCompleteSetup = async () => {
        if (isTermsAndConditionsAccepted) {
            const formData = new FormData();
            formData.append('fName', accountCreation.fName);
            formData.append('lName', accountCreation.lName);
            formData.append('phoneNumber', accountCreation.phoneNumber);
            formData.append('password', accountCreation.password);
            formData.append('confirmPassword', accountCreation.confirmPassword);
            formData.append('profileImg', {
                uri: accountCreation.profileImg.path,
                type: `image/${accountCreation.profileImg.type}`,
                name: `profile.${accountCreation.profileImg.type}`,
            });
            formData.append('location', JSON.stringify(accountCreation.location));
            formData.append('category', JSON.stringify(accountCreation.category));

            formData.append('notificationViaEmail', notificationViaEmail);
            formData.append('notificationViaSMS', notificationViaSMS);
            formData.append('notificationViaApp', notificationViaApp);
            formData.append('termsAndConditions', isTermsAndConditionsAccepted);

            try {
                const response = await ClientFormData().post(
                    `account/creation`, formData
                );

                console.log('Response:', response.data);
            } catch (error: any) {
                console.error('Error:', error.response?.data || error.message);
            }
            navigation.navigate("SuccessMessage", { screenType: "NotificationPreferences" })
            return
        }
    }
    const getValue = (value: string) => {
        if (value === "App") {
            setNotificationViaApp(!notificationViaApp)
            return
        } else if (value === "Email") {
            setNotificationViaEmail(!notificationViaEmail)
            return
        } else {
            setNotificationViaSMS(!notificationViaSMS)
        }
    }

    const sendFormData = async () => {

    };

    return (
        <SafeAreaView style={accountScreensStyles.container}>
            <View style={{ gap: 24 }}>
                <AccountHeader
                    title="Notifications"
                    subTitle="Set how you’d like to stay updated and finalize your account setup."
                />
                <View style={{ gap: 8 }}>
                    <CustomDropDown
                        data={notiiType}
                        placeholder="Notification Preferences"
                        selectedItems={selectedNotiiType}
                        onSelectionChange={setSelectedNotiType}
                        boxStyles={accountScreensStyles.dropdownBox}
                        getValue={getValue}
                        isMultiSelect
                        isSearch={false}
                        zIndex={1000}
                    />
                    <CustomSelector
                        onPress={handleTermAndCondition}
                        title="Terms & Conditions"
                        iconName="rightArrow"
                    />
                </View>
            </View>

            <View style={{ gap: 16 }}>
                <View style={accountScreensStyles.leftRightButtonContainer}>
                    <TouchableOpacity onPress={handleBack}>
                        <SVGIcons.filledLeftButton />
                    </TouchableOpacity>
                    <CustomButton
                        title='Complete Setup'
                        onPress={handleCompleteSetup}
                        style={{
                            width: SIZES.width * 0.42,
                            backgroundColor: !isTermsAndConditionsAccepted ? COLORS.Gray : COLORS.Yellow,
                            borderWidth: !isTermsAndConditionsAccepted ? 1 : 0,
                            borderColor: !isTermsAndConditionsAccepted ? COLORS.inputBorder : "",
                        }}
                        textStyle={{ color: !isTermsAndConditionsAccepted ? COLORS.Black : "", }}
                    />
                </View>

                <View style={accountScreensStyles.StatusBarContainer}>
                    <ProgressBar backgroundColor={COLORS.Yellow} />
                    <ProgressBar backgroundColor={COLORS.Yellow} />
                    <ProgressBar backgroundColor={COLORS.Yellow} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NotificationPreferences;